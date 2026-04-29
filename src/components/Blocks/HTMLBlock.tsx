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
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [cssVariables, setCSSVariables] = useState<CSSVariable[]>([]);
	const [customActions, setCustomActions] = useState<CustomAction[]>([]);

	// Component States
	const [htmlContent, setHTMLContent] = useControlState(
		`<div class="container">
  <h1>Hello World!</h1>
  <p>Edit this content in the HTML tab</p>
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
}`,
		`${id}-css`,
	);

	const [jsContent, setJSContent] = useControlState(
		`// Custom JavaScript code
console.log('HTML Block loaded');

// Example: Add click handler
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  if (container) {
    container.addEventListener('click', function() {
      this.style.backgroundColor = '#f0f0f0';
    });
  }
});`,
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
	const [sandboxMode, setSandboxMode] = useControlState(true, `${id}-sandbox`);

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
					name.includes('spacing')
				) {
					type = 'number';
					parsedValue = parseInt(value) || 0;
					min = 0;
					max = 200;
					step = 1;
				} else if (
					name.includes('show') ||
					name.includes('enable') ||
					name.includes('visible')
				) {
					type = 'boolean';
					parsedValue = value === 'true';
				} else if (!isNaN(parseInt(value))) {
					type = 'number';
					parsedValue = parseInt(value);
					min = 0;
					max = 1000;
					step = 1;
				}

				variables.push({
					name,
					type,
					value: parsedValue,
					min,
					max,
					step,
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
		const varRegex = new RegExp(`(--${varName}\\s*:\\s*)([^;]+);`);
		const newCSS = cssContent.replace(varRegex, `$1${newValue};`);
		setCSSContent(newCSS);
	};

	// Generate iframe content
	const generateIframeContent = () => {
		const processedCSS = cssContent;
		const processedJS = `
      // CSS Variables injection
      const style = document.createElement('style');
      style.textContent = \`${processedCSS}\`;
      document.head.appendChild(style);
      
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

		return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Block</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 16px; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>${processedJS}</script>
      </body>
      </html>
    `;
	};

	// Refresh iframe
	const refreshIframe = () => {
		if (iframeRef.current) {
			const content = generateIframeContent();
			iframeRef.current.srcdoc = content;
		}
	};

	// Auto-refresh when content changes
	useEffect(() => {
		if (autoRefresh && iframeRef.current) {
			const timeoutId = setTimeout(() => {
				refreshIframe();
			}, 500); // Debounce refresh
			return () => clearTimeout(timeoutId);
		}
	}, [htmlContent, cssContent, jsContent, autoRefresh]);

	// Initial load
	useEffect(() => {
		refreshIframe();
	}, []);

	// Execute custom action
	const executeCustomAction = (action: CustomAction) => {
		if (iframeRef.current && iframeRef.current.contentWindow) {
			try {
				(iframeRef.current.contentWindow as any).eval(action.action);
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
										Sandbox Mode
									</Label>
									<Switch
										checked={sandboxMode}
										onCheckedChange={setSandboxMode}
									/>
								</div>

								<Button
									variant='outline'
									size='sm'
									onClick={refreshIframe}
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
				<div className='w-full h-full bg-white border rounded'>
					<iframe
						ref={iframeRef}
						className='w-full h-full border-0'
						sandbox={
							sandboxMode
								? 'allow-scripts allow-same-origin allow-forms'
								: undefined
						}
						title='HTML Block Content'
					/>
				</div>
			</ControlTemplate>
		</>
	);
};

export default HTMLBlock;
