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
	action: string; // JavaScript code to execute
	icon?: string;
}

interface Props {
	id: string;
}

export const HTMLBlock: React.FC<Props> = ({ id }) => {
	const shadowHostRef = useRef<HTMLDivElement>(null);
	const shadowRootRef = useRef<ShadowRoot | null>(null);
	const [cssVariables, setCSSVariables] = useState<CSSVariable[]>([]);
	const [customActions, setCustomActions] = useState<CustomAction[]>([]);

	// Component States
	const [htmlContent, setHTMLContent] = useControlState(
		`<div class="card">
  <div class="card-header">
    <h2 class="card-title">Static Card Demo</h2>
    <div class="badge" id="counter">0</div>
  </div>
  <div class="card-body">
    <p class="card-text">This card demonstrates HTML Block features for static images:</p>
    <ul class="feature-list">
      <li>✨ CSS Variables with live controls</li>
      <li>🎨 Dynamic color theming</li>
      <li>📱 Static design for images</li>
      <li>🔧 Customizable styling</li>
    </ul>
  </div>
</div>`,
		`${id}-html`,
	);

	const [cssContent, setCSSContent] = useControlState(
		`:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  --background-color: #ffffff;
  --text-color: #1f2937;
  --card-padding: 24px;
  --border-radius: 16px;
  --shadow-size: 8px;
  --show-shadow: true;
  --show-border: true;
  --spacing: 16px;
}

.card {
  background: var(--background-color);
  border: var(--show-border) ? 2px solid var(--primary-color) : none;
  border-radius: var(--border-radius);
  box-shadow: var(--show-shadow) ? 0 var(--shadow-size) var(--shadow-size) rgba(0, 0, 0, 0.1) : none;
  overflow: hidden;
  max-width: 400px;
  margin: 0 auto;
}

.card-header {
  background: var(--primary-color);
  color: white;
  padding: var(--card-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.badge {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.875rem;
}

.card-body {
  padding: var(--card-padding);
}

.card-text {
  color: var(--text-color);
  margin-bottom: var(--spacing);
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing) 0;
}

.feature-list li {
  color: var(--text-color);
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.feature-list li:last-child {
  border-bottom: none;
}

`,
		`${id}-css`,
	);

	const [jsContent, setJSContent] = useControlState(
		`// Interactive Card Demo - HTML Block Features
let clickCounter = 0;

// Initialize counter display
document.addEventListener('DOMContentLoaded', function() {
  updateCounter();
  console.log('HTML Block loaded successfully!');
});

// Update counter display
function updateCounter() {
  const counter = document.getElementById('counter');
  if (counter) {
    counter.textContent = clickCounter;
  }
}

// Animate card function (disabled for static image app)
function animateCard() {
  // No animations for static image app
  console.log('Animations disabled for static image app');
}

// Custom Actions - These will appear as buttons in the control panel

// @action:Randomize Theme
const themes = [
  { primary: '#3b82f6', secondary: '#64748b', accent: '#f59e0b' },
  { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
  { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
  { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
  { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' }
];
const randomTheme = themes[Math.floor(Math.random() * themes.length)];
document.documentElement.style.setProperty('--primary-color', randomTheme.primary);
document.documentElement.style.setProperty('--secondary-color', randomTheme.secondary);
document.documentElement.style.setProperty('--accent-color', randomTheme.accent);

// @action:Increment Counter
clickCounter++;
updateCounter();

// @action:Reset Counter
clickCounter = 0;
updateCounter();

// @action:Toggle Shadow
const currentShadow = getComputedStyle(document.documentElement).getPropertyValue('--show-shadow').trim();
document.documentElement.style.setProperty('--show-shadow', currentShadow === 'true' ? 'false' : 'true');

// @action:Toggle Border
const currentBorder = getComputedStyle(document.documentElement).getPropertyValue('--show-border').trim();
document.documentElement.style.setProperty('--show-border', currentBorder === 'true' ? 'false' : 'true');

// @action:Change Background
const backgrounds = ['#ffffff', '#f8fafc', '#fef3c7', '#dbeafe', '#ede9fe'];
const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.documentElement.style.setProperty('--background-color', randomBg);

// @action:Grow Card
const currentPadding = getComputedStyle(document.documentElement).getPropertyValue('--card-padding').trim();
const newPadding = parseInt(currentPadding) + 4;
document.documentElement.style.setProperty('--card-padding', Math.min(newPadding, 48) + 'px');

// @action:Shrink Card
const currentPaddingShrink = getComputedStyle(document.documentElement).getPropertyValue('--card-padding').trim();
const newPaddingShrink = parseInt(currentPaddingShrink) - 4;
document.documentElement.style.setProperty('--card-padding', Math.max(newPaddingShrink, 8) + 'px');

// @action:Reset All
document.documentElement.style.setProperty('--primary-color', '#3b82f6');
document.documentElement.style.setProperty('--secondary-color', '#64748b');
document.documentElement.style.setProperty('--accent-color', '#f59e0b');
document.documentElement.style.setProperty('--background-color', '#ffffff');
document.documentElement.style.setProperty('--text-color', '#1f2937');
document.documentElement.style.setProperty('--card-padding', '24px');
document.documentElement.style.setProperty('--border-radius', '16px');
document.documentElement.style.setProperty('--shadow-size', '8px');
document.documentElement.style.setProperty('--show-shadow', 'true');
document.documentElement.style.setProperty('--show-border', 'true');
document.documentElement.style.setProperty('--spacing', '16px');
clickCounter = 0;
updateCounter();`,
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
	const parseCustomActions = (js: string): CustomAction[] => {
		const actions: CustomAction[] = [];
		const actionRegex =
			/\/\/ @action:(.+?)\n([\s\S]*?)(?=\n\/\/ @action:|\n\/\/|$)/g;
		let match;

		while ((match = actionRegex.exec(js)) !== null) {
			const label = match[1].trim();
			const action = match[2].trim();
			const id = `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

			actions.push({
				id,
				label,
				action,
				icon: 'Play',
			});
		}

		return actions;
	};

	// Update CSS variables and custom actions when content changes
	useEffect(() => {
		setCSSVariables(parseCSSVariables(cssContent));
		setCustomActions(parseCustomActions(jsContent));
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

		const processedJS = `
		// Custom actions API
		window.htmlBlockAPI = {
			refresh: () => {
				console.log('Refresh requested from parent');
			},
			log: (message) => {
				console.log('HTML Block:', message);
				if (window.parent !== window) {
					window.parent.postMessage({ type: 'html-block-log', message }, '*');
				}
			}
		};
		
		${jsContent}
		`;

		return { processedCSS, processedJS };
	};

	// Refresh ShadowDOM
	const refreshShadowDOM = () => {
		if (shadowHostRef.current) {
			// Create or get shadow root
			if (!shadowRootRef.current) {
				shadowRootRef.current = shadowHostRef.current.attachShadow({
					mode: 'open',
				});
			}

			const shadowRoot = shadowRootRef.current;
			const { processedCSS, processedJS } = generateShadowDOMContent();

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
				const scriptElement = document.createElement('script');
				scriptElement.textContent = processedJS;
				shadowRoot.appendChild(scriptElement);
			}
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
	}, [htmlContent, cssContent, jsContent, autoRefresh]);

	// Initial load
	useEffect(() => {
		refreshShadowDOM();
	}, []);

	// Execute custom action
	const executeCustomAction = (action: CustomAction) => {
		if (!allowScriptExecution) {
			console.warn(
				'Script execution is disabled. Enable "Allow Script Execution" to run custom actions.',
			);
			return;
		}

		if (shadowRootRef.current) {
			try {
				// Execute the action in the ShadowDOM context
				const script = document.createElement('script');
				script.textContent = action.action;
				shadowRootRef.current.appendChild(script);
				// Remove the script after execution
				shadowRootRef.current.removeChild(script);
			} catch (error) {
				console.error('Error executing custom action:', error);
			}
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
					<div
						ref={shadowHostRef}
						className='w-full h-full pointer-events-none'
					/>
				</>
			</ControlTemplate>
		</>
	);
};

export default HTMLBlock;
