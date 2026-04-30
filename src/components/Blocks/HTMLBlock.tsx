import { IconCode, IconWorld } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Info, Play, RefreshCw } from 'lucide-react';

interface CSSVariable {
	name: string;
	type: 'color' | 'number' | 'boolean' | 'string';
	value: string | number | boolean;
	min?: number;
	max?: number;
	step?: number;
	description?: string;
	unit?: string; // CSS unit like 'px', 'em', 'rem', '%', etc.
}

interface CustomAction {
	id: string;
	label: string;
	icon?: string;
}

interface ParsedJavaScript {
	setupCode: string;
	actions: Array<{
		id: string;
		label: string;
		code: string;
	}>;
}

interface Props {
	id: string;
}

export const HTMLBlock: React.FC<Props> = ({ id }) => {
	const shadowHostRef = useRef<HTMLDivElement>(null);
	const shadowRootRef = useRef<ShadowRoot | null>(null);
	const actionHandlersRef = useRef<Map<string, () => void>>(new Map());
	const [cssVariables, setCSSVariables] = useState<CSSVariable[]>([]);
	const [customActions, setCustomActions] = useState<CustomAction[]>([]);

	// Component States
	const [htmlContent, setHTMLContent] = useControlState(
		`<div class="container">
  <h1>Hello World!</h1>
  <p>Edit this content in the HTML tab</p>
  <p>Use CSS variables in the :root selector to create dynamic controls.</p>
  <p>Add custom actions using // @action:Name syntax in JavaScript.</p>
</div>`,
		`${id}-html`,
	);

	const [cssContent, setCSSContent] = useControlState(
		`:root {
  --primary-color: #3b82f6;
  --text-size: 16px;
  --show-border: true;
  --spacing: 20px;
}

.container {
  padding: var(--spacing);
  border: var(--show-border) ? 2px solid var(--primary-color) : none;
  text-align: center;
}

h1 {
  color: var(--primary-color);
  font-size: var(--text-size);
}

p {
  margin-bottom: var(--spacing);
}`,
		`${id}-css`,
	);

	const [jsContent, setJSContent] = useControlState(
		`// Custom JavaScript code
// This demonstrates the power of HTML Block with arbitrary code execution

// Helper function to safely get elements (available globally)
window.safeQuerySelector = function(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.error('Error selecting element:', selector, error);
    return null;
  }
};

// @action:Change Container Background
const container = safeQuerySelector('.container');
if (container) {
  try {
    container.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    console.log('Background color changed successfully');
  } catch (error) {
    console.error('Error changing background:', error);
  }
} else {
  console.warn('Container element not found');
}

// @action:Add Random Element
const containerEl = htmlBlockAPI.safeDOM.querySelector('.container');
console.log('root:', root);
console.log('containerEl:', containerEl); 
 
if (containerEl) {
    try {
        const newElement = htmlBlockAPI.safeDOM.createElement('div');
        if (newElement) {
            newElement.textContent = 'Dynamic element ' + Date.now();
            htmlBlockAPI.safeDOM.setStyle(newElement, 'padding', '10px');
            htmlBlockAPI.safeDOM.setStyle(newElement, 'margin', '5px');
            htmlBlockAPI.safeDOM.setStyle(newElement, 'backgroundColor', '#f0f0f0');
            htmlBlockAPI.safeDOM.setStyle(newElement, 'border', '1px solid #ccc');
            
            // Usar la API segura para appendChild
            if (root) {
                htmlBlockAPI.safeDOM.appendChild(root, newElement);
            } else {
                htmlBlockAPI.safeDOM.appendChild(containerEl, newElement);
            }
            console.log('Element added successfully');
        }
    } catch (error) {
        console.error('Error adding element:', error);
    }
} else {
    console.warn('Container element not found for adding element');
}

// @action:Modify CSS Variables
try {
  document.documentElement.style.setProperty('--primary-color', '#' + Math.floor(Math.random()*16777215).toString(16));
  document.documentElement.style.setProperty('--text-size', (Math.floor(Math.random() * 20) + 12) + 'px');
  console.log('CSS variables modified successfully');
} catch (error) {
  console.error('Error modifying CSS variables:', error);
}

// @action:Toggle Border Visibility
try {
  const currentBorder = getComputedStyle(document.documentElement).getPropertyValue('--show-border').trim();
  document.documentElement.style.setProperty('--show-border', currentBorder === 'true' ? 'false' : 'true');
  console.log('Border visibility toggled successfully');
} catch (error) {
  console.error('Error toggling border:', error);
}

// @action:Clear All Added Elements
const containerClear = safeQuerySelector('.container');
if (containerClear) {
  try {
    const elements = containerClear.querySelectorAll('div[style*="background-color"]');
    elements.forEach(el => el.remove());
    console.log('Elements cleared successfully');
  } catch (error) {
    console.error('Error clearing elements:', error);
  }
} else {
  console.warn('Container element not found for clearing');
}

// @action:Log DOM Info
try {
  const containerInfo = safeQuerySelector('.container');
  console.log('Container element:', containerInfo);
  console.log('Current CSS variables:', {
    primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
    textSize: getComputedStyle(document.documentElement).getPropertyValue('--text-size'),
    showBorder: getComputedStyle(document.documentElement).getPropertyValue('--show-border')
  });
  alert('Check console for DOM information!');
} catch (error) {
  console.error('Error logging DOM info:', error);
}`,
		`${id}-js`,
	);

	const [autoRefresh, setAutoRefresh] = useControlState(
		true,
		`${id}-autorefresh`,
	);
	const [showDevTools, setShowDevTools] = useControlState(
		false,
		`${id}-devtools`,
	);
	const [allowScriptExecution, setAllowScriptExecution] = useControlState(
		false,
		`${id}-allow-scripts`,
	);

	// Helper function to parse numeric values with units
	const parseNumericValue = (value: string) => {
		const numericRegex =
			/^(-?\d*\.?\d+)(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|in|cm|mm|pt|pc)?$/;
		const match = value.match(numericRegex);

		if (match) {
			const number = parseFloat(match[1]);
			const unit = match[2] || 'px'; // Default to px if no unit specified
			return { number, unit, originalValue: value };
		}

		return null;
	};

	// Parse CSS variables from CSS content
	const parseCSSVariables = (css: string): CSSVariable[] => {
		const variables: CSSVariable[] = [];
		const rootRegex = /:root\s*{([^}]*)}/g;
		const match = rootRegex.exec(css);

		if (match) {
			const varsContent = match[1];
			const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
			let varMatch;

			while ((varMatch = varRegex.exec(varsContent)) !== null) {
				const name = varMatch[1];
				const value = varMatch[2].trim();

				// Detect variable type based on naming conventions and values
				let type: CSSVariable['type'] = 'string';
				let parsedValue: string | number | boolean = value;
				let min, max, step;

				if (
					name.includes('color') ||
					/^#[0-9a-fA-F]{6}$/.test(value) ||
					/^#[0-9a-fA-F]{3}$/.test(value)
				) {
					type = 'color';
					parsedValue = value.startsWith('#') ? value : `#${value}`;
				} else if (
					name.includes('size') ||
					name.includes('width') ||
					name.includes('height') ||
					name.includes('spacing') ||
					name.includes('padding') ||
					name.includes('margin') ||
					name.includes('radius')
				) {
					const numericParse = parseNumericValue(value);
					if (numericParse) {
						type = 'number';
						parsedValue = numericParse.number;
						min = 0;
						max =
							numericParse.unit === '%'
								? 100
								: numericParse.unit === 'em' || numericParse.unit === 'rem'
									? 10
									: 200;
						step =
							numericParse.unit === '%'
								? 1
								: numericParse.unit === 'em' || numericParse.unit === 'rem'
									? 0.1
									: 1;
					}
				} else if (
					name.includes('show') ||
					name.includes('enable') ||
					name.includes('visible')
				) {
					type = 'boolean';
					parsedValue = value === 'true';
				} else {
					// Try to parse as numeric with units for any remaining numeric values
					const numericParse = parseNumericValue(value);
					if (numericParse) {
						type = 'number';
						parsedValue = numericParse.number;
						min = 0;
						max =
							numericParse.unit === '%'
								? 100
								: numericParse.unit === 'em' || numericParse.unit === 'rem'
									? 10
									: 1000;
						step =
							numericParse.unit === '%'
								? 1
								: numericParse.unit === 'em' || numericParse.unit === 'rem'
									? 0.1
									: 1;
					}
				}

				// Add unit information for numeric variables
				let unit;
				if (type === 'number') {
					const numericParse = parseNumericValue(value);
					unit = numericParse ? numericParse.unit : 'px';
				}

				variables.push({
					name,
					type,
					value: parsedValue,
					min,
					max,
					step,
					unit,
					description: `CSS variable --${name}`,
				});
			}
		}

		return variables;
	};

	// Parse custom actions from JS content
	const parseJavaScript = (js: string): ParsedJavaScript => {
		const lines = js.split(/\r?\n/);
		const setupLines: string[] = [];
		const actions: ParsedJavaScript['actions'] = [];
		const actionMarkerRegex = /^\s*\/\/\s*@action:(.+?)\s*$/;

		let currentAction: ParsedJavaScript['actions'][number] | null = null;
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

	const createScopedDocument = (
		shadowRoot: ShadowRoot,
		host: HTMLDivElement,
	): Document & ShadowRoot => {
		const globalDocument = window.document;

		return new Proxy(globalDocument, {
			get(target, prop) {
				switch (prop) {
					case 'querySelector':
						return shadowRoot.querySelector.bind(shadowRoot);
					case 'querySelectorAll':
						return shadowRoot.querySelectorAll.bind(shadowRoot);
					case 'getElementById':
						return shadowRoot.getElementById?.bind(shadowRoot);
					case 'body':
						return shadowRoot;
					case 'head':
						return shadowRoot;
					case 'documentElement':
						return host;
					case 'activeElement':
						return shadowRoot.activeElement;
					case 'addEventListener':
						return shadowRoot.addEventListener.bind(shadowRoot);
					case 'removeEventListener':
						return shadowRoot.removeEventListener.bind(shadowRoot);
					case 'dispatchEvent':
						return shadowRoot.dispatchEvent.bind(shadowRoot);
					default:
						return Reflect.get(target, prop, target);
				}
			},
		}) as Document & ShadowRoot;
	};

	const escapeJavaScriptString = (value: string) =>
		JSON.stringify(value).slice(1, -1);

	// Update CSS variables and custom actions when content changes
	useEffect(() => {
		setCSSVariables(parseCSSVariables(cssContent));
		const parsedJavaScript = parseJavaScript(jsContent);
		setCustomActions(
			parsedJavaScript.actions.map((action) => ({
				id: action.id,
				label: action.label,
				icon: 'Play',
			})),
		);
	}, [cssContent, jsContent]);

	// Update CSS content when variables change
	const updateCSSVariable = (
		varName: string,
		newValue: string | number | boolean,
	) => {
		// Find the variable to get its unit information
		const variable = cssVariables.find((v) => v.name === varName);
		let valueWithUnit = newValue;

		// Add unit back for numeric variables
		if (
			variable &&
			variable.type === 'number' &&
			variable.unit &&
			typeof newValue === 'number'
		) {
			valueWithUnit = `${newValue}${variable.unit}`;
		}

		const varRegex = new RegExp(`(--${varName}\\s*:\\s*)([^;]+);`);
		const newCSS = cssContent.replace(varRegex, `$1${valueWithUnit};`);
		setCSSContent(newCSS);
	};

	// Generate ShadowDOM content
	const generateShadowDOMContent = () => {
		const scopedCSS = scopeCSS(cssContent, ':host');
		const processedCSS = `
		@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap');
		:host {
			display: block;
			font-family:'Noto Sans', sans-serif;
			font-weight: 400;
			all: initial;
			font-family: 'Noto Sans', sans-serif;
		}
		:host * { box-sizing: border-box; }
		${scopedCSS}
		`;

		return { processedCSS };
	};

	// Refresh ShadowDOM
	const refreshShadowDOM = () => {
		console.log('Refreshing ShadowDOM...');
		if (shadowHostRef.current) {
			// Create or get shadow root
			if (!shadowRootRef.current) {
				console.log('Creating new shadow root');
				shadowRootRef.current = shadowHostRef.current.attachShadow({
					mode: 'open',
				});
			}

			const shadowRoot = shadowRootRef.current;
			const { processedCSS } = generateShadowDOMContent();
			const parsedJavaScript = parseJavaScript(jsContent);
			console.log(
				`Parsed ${parsedJavaScript.actions.length} actions from JavaScript`,
			);

			// Only clear action handlers if we're going to re-register them
			if (allowScriptExecution && parsedJavaScript.actions.length > 0) {
				console.log(
					`Clearing ${actionHandlersRef.current.size} existing action handlers for re-registration`,
				);
				actionHandlersRef.current.clear();
			} else {
				console.log(
					'Skipping action handler clear - script execution disabled or no actions to register',
				);
			}

			// Clear existing content
			shadowRoot.innerHTML = '';

			// Add styles
			const styleElement = document.createElement('style');
			styleElement.textContent = processedCSS;
			shadowRoot.appendChild(styleElement);

			// Add HTML content
			const container = document.createElement('div');
			container.innerHTML = htmlContent;
			shadowRoot.appendChild(container);

			// Execute JavaScript only if allowed
			if (allowScriptExecution) {
				console.log('Script execution is allowed, processing JavaScript...');
				try {
					const host = shadowHostRef.current;
					if (!host) return;

					const scopedDocument = createScopedDocument(shadowRoot, host);
					const safeQuerySelector = (selector: string) => {
						try {
							return shadowRoot.querySelector(selector);
						} catch (error) {
							console.error('Error selecting element:', selector, error);
							return null;
						}
					};

					const htmlBlockAPI = {
						refresh: refreshShadowDOM,
						log: (message: unknown) => {
							console.log('HTML Block:', message);
							if (window.parent !== window) {
								window.parent.postMessage(
									{ type: 'html-block-log', message },
									'*',
								);
							}
						},
						host,
						root: container,
						shadowRoot,
						document: scopedDocument,
						globalDocument: window.document,
						registerAction: (actionId: string, handler: () => void) => {
							console.log(`Registering action handler: ${actionId}`);
							actionHandlersRef.current.set(actionId, handler);
							console.log(
								`Total registered actions: ${actionHandlersRef.current.size}`,
							);
						},
						safeDOM: {
							querySelector: (selector: string) => {
								try {
									return shadowRoot.querySelector(selector);
								} catch (error) {
									console.error(
										'Error in safeDOM.querySelector:',
										selector,
										error,
									);
									return null;
								}
							},
							createElement: (tagName: string) => {
								try {
									return document.createElement(tagName);
								} catch (error) {
									console.error(
										'Error in safeDOM.createElement:',
										tagName,
										error,
									);
									return null;
								}
							},
							appendChild: (parent: Element, child: Element) => {
								try {
									Element.prototype.appendChild.call(parent, child);
									return true;
								} catch (error) {
									console.error('Error in safeDOM.appendChild:', error);
									return false;
								}
							},
							setStyle: (element: Element, property: string, value: string) => {
								try {
									(element as HTMLElement).style.setProperty(property, value);
									return true;
								} catch (error) {
									console.error('Error in safeDOM.setStyle:', error);
									return false;
								}
							},
						},
					};

					(
						window as Window & {
							htmlBlockAPI?: typeof htmlBlockAPI;
							safeQuerySelector?: typeof safeQuerySelector;
						}
					).htmlBlockAPI = htmlBlockAPI;
					(
						window as Window & {
							htmlBlockAPI?: typeof htmlBlockAPI;
							safeQuerySelector?: typeof safeQuerySelector;
						}
					).safeQuerySelector = safeQuerySelector;

					const actionRegistrations = parsedJavaScript.actions
						.map(
							(action) => `
console.log('Registering action: ${action.label} (ID: ${action.id})');
registerAction("${escapeJavaScriptString(action.id)}", () => {
	console.log('Executing action: ${action.label}');
${action.code}
});`,
						)
						.join('\n');

					const compiledSource = `
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

					const executeUserCode = new Function(
						'window',
						'console',
						'alert',
						compiledSource,
					);

					executeUserCode(window, console, window.alert.bind(window));
					console.log('JavaScript execution completed successfully');
				} catch (error) {
					console.error('Error executing HTML block script:', error);
				}
			} else {
				console.log(
					'Script execution is disabled, skipping JavaScript execution',
				);
			}
		} else {
			console.log('Shadow host is not available');
		}
	};

	// Auto-refresh when content changes
	useEffect(() => {
		if (autoRefresh && shadowHostRef.current) {
			const timeoutId = setTimeout(() => {
				refreshShadowDOM();
			}, 500); // Debounce refresh
			return () => clearTimeout(timeoutId);
		}
	}, [htmlContent, cssContent, jsContent, autoRefresh, allowScriptExecution]);

	// Initial load
	useEffect(() => {
		refreshShadowDOM();
	}, [allowScriptExecution]);

	// Execute custom action
	const executeCustomAction = (action: CustomAction) => {
		if (!allowScriptExecution) {
			console.warn(
				'Script execution is disabled. Enable "Allow Script Execution" to run custom actions.',
			);
			return;
		}

		if (!shadowRootRef.current) {
			console.warn(
				'Shadow DOM is not initialized. Cannot execute custom action.',
			);
			return;
		}

		try {
			const actionHandler = actionHandlersRef.current.get(action.id);
			if (!actionHandler) {
				console.warn(
					`Custom action "${action.label}" (ID: ${action.id}) is not registered. Available handlers: [${Array.from(actionHandlersRef.current.keys()).join(', ')}]`,
				);

				// Try to re-register actions by re-executing the JavaScript
				console.log('Attempting to re-register actions...');
				try {
					const parsedJavaScript = parseJavaScript(jsContent);
					if (parsedJavaScript.actions.length > 0) {
						console.log('Re-executing JavaScript to re-register actions...');

						const host = shadowHostRef.current;
						if (host) {
							const shadowRoot = shadowRootRef.current;
							const scopedDocument = createScopedDocument(shadowRoot, host);
							const safeQuerySelector = (selector: string) => {
								try {
									return shadowRoot.querySelector(selector);
								} catch (error) {
									console.error('Error selecting element:', selector, error);
									return null;
								}
							};

							const htmlBlockAPI = {
								refresh: refreshShadowDOM,
								log: (message: unknown) => {
									console.log('HTML Block:', message);
								},
								host,
								root: shadowRoot.querySelector('div'),
								shadowRoot,
								document: scopedDocument,
								globalDocument: window.document,
								registerAction: (actionId: string, handler: () => void) => {
									console.log(`Re-registering action handler: ${actionId}`);
									actionHandlersRef.current.set(actionId, handler);
								},
							};

							const actionRegistrations = parsedJavaScript.actions
								.map(
									(action) => `
registerAction("${escapeJavaScriptString(action.id)}", () => {
	console.log('Executing action: ${action.label}');
${action.code}
});`,
								)
								.join('\n');

							const compiledSource = `
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

							const executeUserCode = new Function(
								'window',
								'console',
								'alert',
								compiledSource,
							);

							// Set up global objects for the execution context
							(window as any).htmlBlockAPI = htmlBlockAPI;
							(window as any).safeQuerySelector = safeQuerySelector;

							executeUserCode(window, console, window.alert.bind(window));

							// Now try to execute the action again
							const reRegisteredHandler = actionHandlersRef.current.get(
								action.id,
							);
							if (reRegisteredHandler) {
								console.log(
									`Successfully re-registered and executing action: ${action.label}`,
								);
								reRegisteredHandler();
							} else {
								console.error(`Failed to re-register action: ${action.label}`);
							}
						}
					}
				} catch (error) {
					console.error('Error during action re-registration:', error);
				}
				return;
			}

			console.log(
				`Executing custom action: ${action.label} (ID: ${action.id})`,
			);
			actionHandler();
		} catch (error) {
			console.error('Error executing custom action:', error);
		}
	};

	// Render control for CSS variable
	const renderVariableControl = (variable: CSSVariable) => {
		switch (variable.type) {
			case 'color':
				return (
					<div key={variable.name} className='space-y-2'>
						<Label className='text-xs text-muted-foreground'>
							{variable.name}
						</Label>
						<ColorPicker
							isGradientEnable={false}
							color={variable.value as string}
							onColorChange={(color) => updateCSSVariable(variable.name, color)}
							label=''
						/>
					</div>
				);

			case 'number':
				return (
					<div key={variable.name} className='space-y-2'>
						<Label className='text-xs text-muted-foreground'>
							{variable.name}
						</Label>
						<div className='flex items-center gap-2'>
							<Slider
								className='flex-1'
								onValueChange={(value) =>
									updateCSSVariable(variable.name, value[0])
								}
								value={[variable.value as number]}
								min={variable.min || 0}
								max={variable.max || 100}
								step={variable.step || 1}
							/>
							<span className='text-xs text-muted-foreground w-12 text-right'>
								{variable.value}
							</span>
						</div>
					</div>
				);

			case 'boolean':
				return (
					<div
						key={variable.name}
						className='flex items-center justify-between'
					>
						<Label className='text-xs text-muted-foreground'>
							{variable.name}
						</Label>
						<Switch
							checked={variable.value as boolean}
							onCheckedChange={(checked: boolean) =>
								updateCSSVariable(variable.name, checked)
							}
						/>
					</div>
				);

			default:
				return (
					<div key={variable.name} className='space-y-2'>
						<Label className='text-xs text-muted-foreground'>
							{variable.name}
						</Label>
						<Input
							value={variable.value as string}
							onChange={(e) => updateCSSVariable(variable.name, e.target.value)}
							className='h-8 text-sm'
						/>
					</div>
				);
		}
	};

	const scopeCSS = (css: string, scopeSelector: string) => {
		return css
			.replace(/([^\r\n,{}]+)(?=[^{}]*{)/g, (match) => {
				const trimmed = match.trim();
				if (trimmed.startsWith('@') || trimmed.startsWith(':root'))
					return match;
				return `${scopeSelector} ${trimmed}`;
			})
			.replace(/:root/g, scopeSelector);
	};

	return (
		<>
			<ControlTemplate
				id={id}
				borderEditable={false}
				defaultHeight='300px'
				defaultWidth='400px'
				minHeight='200px'
				minWidth='300px'
				maxWidth='1200px'
				maxHeight='800px'
				menu={
					<>
						{/* Content Editor */}
						<CustomCollapse
							isOpen
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconCode size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Content</Label>
								</div>
							}
						>
							<Tabs defaultValue='html' className='w-full'>
								<TabsList className='grid w-full grid-cols-3'>
									<TabsTrigger value='html'>HTML</TabsTrigger>
									<TabsTrigger value='css'>CSS</TabsTrigger>
									<TabsTrigger value='js'>JS</TabsTrigger>
								</TabsList>

								<TabsContent value='html' className='space-y-2'>
									<Label className='text-xs text-muted-foreground'>
										HTML Content
									</Label>
									<Textarea
										value={htmlContent}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
											setHTMLContent(e.target.value)
										}
										className='font-mono text-xs min-h-25'
										placeholder='Enter HTML content...'
									/>
								</TabsContent>

								<TabsContent value='css' className='space-y-2'>
									<Label className='text-xs text-muted-foreground'>
										CSS Styles
									</Label>
									<Textarea
										value={cssContent}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
											setCSSContent(e.target.value)
										}
										className='font-mono text-xs min-h-25'
										placeholder='Enter CSS with --variable-name: value; format...'
									/>
									<Alert>
										<Info className='h-4 w-4' />
										<AlertDescription className='text-xs'>
											Use CSS variables with --prefix to auto-generate controls.
											Variables ending with "color" become color pickers, "size"
											numbers, "show" booleans.
										</AlertDescription>
									</Alert>
								</TabsContent>

								<TabsContent value='js' className='space-y-2'>
									<Label className='text-xs text-muted-foreground'>
										JavaScript
									</Label>
									<Textarea
										value={jsContent}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
											setJSContent(e.target.value)
										}
										className='font-mono text-xs min-h-25'
										placeholder='Enter JavaScript code...'
									/>
									<Alert>
										<Info className='h-4 w-4' />
										<AlertDescription className='text-xs'>
											Add custom actions with // @action:Button Name followed by
											the code to execute.
										</AlertDescription>
									</Alert>
								</TabsContent>
							</Tabs>
						</CustomCollapse>

						{/* CSS Variables Controls */}
						{cssVariables.length > 0 && (
							<CustomCollapse
								menu={
									<div className='flex items-center gap-2 text-foreground'>
										<IconWorld size={18} className='text-muted-foreground' />
										<Label className='text-sm font-semibold'>Variables</Label>
										<Badge variant='secondary' className='text-xs'>
											{cssVariables.length}
										</Badge>
									</div>
								}
							>
								<div className='space-y-4'>
									{cssVariables.map(renderVariableControl)}
								</div>
							</CustomCollapse>
						)}

						{/* Custom Actions */}
						{customActions.length > 0 && (
							<CustomCollapse
								menu={
									<div className='flex items-center gap-2 text-foreground'>
										<Play size={18} className='text-muted-foreground' />
										<Label className='text-sm font-semibold'>Actions</Label>
										<Badge variant='secondary' className='text-xs'>
											{customActions.length}
										</Badge>
									</div>
								}
							>
								<div className='space-y-2'>
									{customActions.map((action) => (
										<Button
											key={action.id}
											variant='outline'
											size='sm'
											onClick={() => executeCustomAction(action)}
											className='w-full justify-start'
										>
											<Play className='h-4 w-4 mr-2' />
											{action.label}
										</Button>
									))}
								</div>
							</CustomCollapse>
						)}

						{/* Settings */}
						<CustomCollapse
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconCode size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Settings</Label>
								</div>
							}
						>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<Label className='text-xs text-muted-foreground'>
										Auto Refresh
									</Label>
									<Switch
										checked={autoRefresh}
										onCheckedChange={setAutoRefresh}
									/>
								</div>

								<div className='flex items-center justify-between'>
									<Label className='text-xs text-muted-foreground'>
										Allow Script Execution
									</Label>
									<Switch
										checked={allowScriptExecution}
										onCheckedChange={setAllowScriptExecution}
									/>
								</div>

								<Button
									variant='outline'
									size='sm'
									onClick={refreshShadowDOM}
									className='w-full'
								>
									<RefreshCw className='h-4 w-4 mr-2' />
									Refresh Preview
								</Button>
							</div>
						</CustomCollapse>
					</>
				}
			>
				<>
					<div ref={shadowHostRef} className='w-full h-full' />
				</>
			</ControlTemplate>
		</>
	);
};

export default HTMLBlock;
