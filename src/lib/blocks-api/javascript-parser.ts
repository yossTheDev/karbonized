/**
 * JavaScript parser for HTML Block custom actions
 * Extracts setup code and action definitions from JavaScript content
 */

export interface JavaScriptAction {
	id: string;
	label: string;
	code: string;
}

export interface ParsedJavaScript {
	setupCode: string;
	actions: JavaScriptAction[];
}

export const parseJavaScript = (js: string): ParsedJavaScript => {
	const lines = js.split(/\r?\n/);
	const setupLines: string[] = [];
	const actions: JavaScriptAction[] = [];
	const actionMarkerRegex = /^\s*\/\/\s*@action:(.+?)\s*$/;

	let currentAction: JavaScriptAction | null = null;
	let actionIndex = 0;

	for (const line of lines) {
		const actionMatch = line.match(actionMarkerRegex);

		if (actionMatch) {
			if (currentAction) {
				currentAction.code = currentAction.code.trim();
				actions.push(currentAction);
			}

			const label = actionMatch[1].trim();
			currentAction = {
				id: `action_${actionIndex}_${
					label
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/(^-|-$)/g, '') || 'custom'
				}`,
				label,
				code: '',
			};
			actionIndex += 1;
			continue;
		}

		if (currentAction) {
			currentAction.code += `${line}\n`;
		} else {
			setupLines.push(line);
		}
	}

	if (currentAction) {
		currentAction.code = currentAction.code.trim();
		actions.push(currentAction);
	}

	return {
		setupCode: setupLines.join('\n').trim(),
		actions,
	};
};

export const generateActionRegistrations = (actions: JavaScriptAction[]): string => {
	return actions
		.map(
			(action) => `
console.log('Registering action: ${action.label} (ID: ${action.id})');
registerAction("${escapeJavaScriptString(action.id)}", () => {
	console.log('Executing action: ${action.label}');
${action.code}
});`,
		)
		.join('\n');
};

// Helper function to escape JavaScript strings
export const escapeJavaScriptString = (value: string): string =>
	JSON.stringify(value).slice(1, -1);

export const generateCompiledSource = (
	parsedJavaScript: ParsedJavaScript,
	actionRegistrations: string
): string => {
	return `
const htmlBlockAPI = window.htmlBlockAPI;
const registerAction = htmlBlockAPI.registerAction;
const document = htmlBlockAPI.document;
const globalDocument = htmlBlockAPI.globalDocument;
const root = htmlBlockAPI.root;
const host = htmlBlockAPI.host;
const shadowRoot = htmlBlockAPI.shadowRoot;
const safeQuerySelector = window.safeQuerySelector;

${parsedJavaScript.setupCode}

${actionRegistrations}
`;
};
