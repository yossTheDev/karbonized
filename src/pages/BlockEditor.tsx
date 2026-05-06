import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Editor, { loader } from '@monaco-editor/react';
import {
	ArrowLeft,
	Save,
	Eye,
	EyeOff,
	RefreshCw,
	Code2,
	Type,
	FileJson,
	Sparkles,
} from 'lucide-react';
import { useControlsStore, useWorkspaceStore } from '@/stores';
import {
	scopeCSS,
	createSafeDOM,
	parseJavaScript,
	generateActionRegistrations,
	generateCompiledSource,
} from '@/lib/blocks-api';
import {
	defaultHTMLContent,
	defaultCSSContent,
	defaultJSContent,
} from '@/lib/blocks-api/default-content';
import StatusBar from '@/components/Base/StatusBar';

loader.init().then((monaco) => {
	const commonRules = [
		{ token: 'comment', foreground: '6e7681', fontStyle: 'italic' },
		{ token: 'keyword', foreground: 'ff7b72', fontStyle: 'bold' },
		{ token: 'string', foreground: 'a5d6ff' },
		{ token: 'number', foreground: '79c0ff' },
	];

	monaco.editor.defineTheme('karbonized-dark', {
		base: 'vs-dark',
		inherit: true,
		rules: commonRules,
		colors: {
			'editor.background': '#09090b', // zinc-950
			'editor.foreground': '#e4e4e7',
			'editor.lineHighlightBackground': '#18181b',
			'editor.selectionBackground': '#3f3f4650',
			'editorIndentGuide.background': '#27272a',
			'editorCursor.foreground': '#3b82f6',
		},
	});

	monaco.editor.defineTheme('karbonized-light', {
		base: 'vs',
		inherit: true,
		rules: commonRules,
		colors: {
			'editor.background': '#ffffff',
			'editor.lineHighlightBackground': '#f4f4f5',
			'editorCursor.foreground': '#2563eb',
		},
	});
});

interface BlockEditorState {
	htmlContent: string;
	cssContent: string;
	jsContent: string;
	allowScriptExecution: boolean;
}

const BlockEditor: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const shadowHostRef = useRef<HTMLDivElement>(null);
	const shadowRootRef = useRef<ShadowRoot | null>(null);
	const [theme] = useTheme();

	const [editorState, setEditorState] = useState<BlockEditorState>({
		htmlContent: defaultHTMLContent,
		cssContent: defaultCSSContent,
		jsContent: defaultJSContent,
		allowScriptExecution: false,
	});

	const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
	const [showPreview, setShowPreview] = useState(true);
	const [isDirty, setIsDirty] = useState(false);

	const ControlProperties = useControlsStore(
		(state) => state.ControlProperties,
	);
	const addControlProperty = useControlsStore(
		(state) => state.addControlProperty,
	);
	const currentWorkspaceID = useWorkspaceStore(
		(state) => state.currentWorkspaceID,
	);

	useEffect(() => {
		if (location.state?.blockId) {
			const blockId = location.state.blockId;
			const findProp = (suffix: string) =>
				ControlProperties.find((p) => p.id === `${blockId}-${suffix}`)?.value;

			const newState = {
				htmlContent: findProp('html') || defaultHTMLContent,
				cssContent: findProp('css') || defaultCSSContent,
				jsContent: findProp('js') || defaultJSContent,
				allowScriptExecution: findProp('allow-scripts') || false,
			};

			setEditorState(newState);
			setTimeout(() => setIsDirty(false), 100);
		}
	}, [location.state?.blockId, ControlProperties]);

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

	const updatePreview = () => {
		if (!shadowHostRef.current) return;

		// Create or get shadow root
		if (!shadowRootRef.current) {
			shadowRootRef.current = shadowHostRef.current.attachShadow({
				mode: 'open',
			});
		}

		const shadowRoot = shadowRootRef.current;
		const scopedCSS = scopeCSS(editorState.cssContent, ':host');
		const processedCSS = `
		@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap');
		:host {
			display: block;
			font-family:'Noto Sans', sans-serif;
			font-weight: 400;
			all: initial;
			color: ${theme === 'dark' ? '#fff' : '#000'};
		}
		:host * { box-sizing: border-box; }
		${scopedCSS}
		`;

		// Clear existing content
		shadowRoot.innerHTML = '';

		// Add styles
		const styleElement = document.createElement('style');
		styleElement.textContent = processedCSS;
		shadowRoot.appendChild(styleElement);

		// Add HTML content
		const container = document.createElement('div');
		container.innerHTML = editorState.htmlContent;
		shadowRoot.appendChild(container);

		// Execute JavaScript only if allowed
		if (editorState.allowScriptExecution && editorState.jsContent.trim()) {
			try {
				const host = shadowHostRef.current;
				const scopedDocument = createScopedDocument(shadowRoot, host);

				const htmlBlockAPI = {
					refresh: updatePreview,
					log: (message: unknown) => {
						console.log('Block Editor:', message);
					},
					warn: (message: unknown) => {
						console.warn('Block Editor:', message);
					},
					error: (message: unknown) => {
						console.error('Block Editor:', message);
					},
					host,
					root: container,
					shadowRoot,
					document: scopedDocument,
					globalDocument: window.document,
					registerAction: (actionId: string, handler: () => void) => {
						console.log(`Action registered: ${actionId}`);
					},
				};

				(
					window as Window & {
						htmlBlockAPI?: typeof htmlBlockAPI;
					}
				).htmlBlockAPI = htmlBlockAPI;

				const parsedJavaScript = parseJavaScript(editorState.jsContent);
				const actionRegistrations = generateActionRegistrations(
					parsedJavaScript.actions,
				);
				const compiledSource = generateCompiledSource(
					parsedJavaScript,
					actionRegistrations,
				);

				const executeUserCode = new Function(
					'window',
					'console',
					'alert',
					compiledSource,
				);

				executeUserCode(window, console, window.alert.bind(window));
			} catch (error) {
				console.error('Error executing Block Editor script:', error);
			}
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(updatePreview, 400);
		return () => clearTimeout(timeoutId);
	}, [editorState, showPreview, theme]);

	const handleSave = () => {
		if (location.state?.blockId) {
			const blockId = location.state.blockId;
			const props = [
				{ id: 'html', value: editorState.htmlContent },
				{ id: 'css', value: editorState.cssContent },
				{ id: 'js', value: editorState.jsContent },
				{ id: 'allow-scripts', value: editorState.allowScriptExecution },
			];

			props.forEach((prop) => {
				addControlProperty(
					{ id: `${blockId}-${prop.id}`, value: prop.value },
					currentWorkspaceID,
				);
			});

			setIsDirty(false);

			setTimeout(() => {
				import('@/stores').then((m) => {
					const { setControlState } = m.useHistoryStore.getState();

					props.forEach((prop) => {
						setControlState({ id: `${blockId}-${prop.id}`, value: prop.value });
					});

					navigate('/editor');
				});
			}, 100);
		}
	};

	const editorOptions = {
		wordWrap: 'on' as const,
		minimap: { enabled: false },
		fontSize: 13,
		fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
		automaticLayout: true,
		scrollBeyondLastLine: false,
		padding: { top: 20 },
		renderLineHighlight: 'all' as const,
		lineNumbers: 'on' as const,
	};

	const currentMonacoTheme =
		theme === 'dark' ? 'karbonized-dark' : 'karbonized-light';

	return (
		<div className='flex flex-col h-screen w-screen bg-background overflow-hidden text-foreground selection:bg-primary/30'>
			{/* Header */}
			<header className='flex items-center justify-between px-5 h-14 border-b bg-card/30 backdrop-blur-xl z-20 shrink-0'>
				<div className='flex items-center gap-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => navigate('/editor')}
						className='hover:bg-secondary/50 transition-colors'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back
					</Button>
					<Separator orientation='vertical' className='h-5' />
					<div className='flex items-center gap-2'>
						<Sparkles className='h-4 w-4 text-blue-500' />
						<h1 className='text-xs font-black tracking-widest uppercase opacity-80'>
							Block Engine
						</h1>
						{isDirty && (
							<Badge className='ml-2 bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] animate-pulse'>
								Modified
							</Badge>
						)}
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<Button
						variant='secondary'
						size='sm'
						onClick={() => setShowPreview(!showPreview)}
						className='h-8 text-[11px] font-bold'
					>
						{showPreview ? (
							<EyeOff className='h-3.5 w-3.5 mr-2' />
						) : (
							<Eye className='h-3.5 w-3.5 mr-2' />
						)}
						{showPreview ? 'HIDE PREVIEW' : 'SHOW PREVIEW'}
					</Button>
					<Button
						onClick={handleSave}
						size='sm'
						className='h-8 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20'
					>
						<Save className='h-3.5 w-3.5 mr-2' />
						SAVE CHANGES
					</Button>
				</div>
			</header>

			<main className='flex h-full overflow-hidden min-h-0 relative'>
				{/* Editor Container */}
				<div
					className={`${showPreview ? 'w-3/5' : 'w-full'} flex flex-col transition-all duration-300 border-r border-border/50 bg-zinc-950`}
				>
					<Tabs
						value={activeTab}
						onValueChange={(v) => setActiveTab(v as any)}
						className='flex flex-col h-full'
					>
						<TabsList className='justify-start h-11 bg-zinc-900/50 rounded-none border-b border-white/5 px-2 gap-1'>
							<TabsTrigger
								value='html'
								className='data-[state=active]:bg-white/5 text-[11px] font-medium h-8 px-4'
							>
								<Code2 className='w-3.5 h-3.5 mr-2 text-orange-400' />{' '}
								index.html
							</TabsTrigger>
							<TabsTrigger
								value='css'
								className='data-[state=active]:bg-white/5 text-[11px] font-medium h-8 px-4'
							>
								<Type className='w-3.5 h-3.5 mr-2 text-blue-400' /> style.css
							</TabsTrigger>
							<TabsTrigger
								value='js'
								className='data-[state=active]:bg-white/5 text-[11px] font-medium h-8 px-4'
							>
								<FileJson className='w-3.5 h-3.5 mr-2 text-yellow-400' />{' '}
								main.js
							</TabsTrigger>
						</TabsList>

						<div className='flex-1 relative bg-zinc-950'>
							<TabsContent value='html' className='absolute inset-0 m-0'>
								<Editor
									language='html'
									theme={currentMonacoTheme}
									value={editorState.htmlContent}
									options={editorOptions}
									onChange={(v) => {
										setEditorState((p) => ({ ...p, htmlContent: v || '' }));
										setIsDirty(true);
									}}
								/>
							</TabsContent>
							<TabsContent value='css' className='absolute inset-0 m-0'>
								<Editor
									language='css'
									theme={currentMonacoTheme}
									value={editorState.cssContent}
									options={editorOptions}
									onChange={(v) => {
										setEditorState((p) => ({ ...p, cssContent: v || '' }));
										setIsDirty(true);
									}}
								/>
							</TabsContent>
							<TabsContent value='js' className='absolute inset-0 m-0'>
								<Editor
									language='javascript'
									theme={currentMonacoTheme}
									value={editorState.jsContent}
									options={editorOptions}
									onChange={(v) => {
										setEditorState((p) => ({ ...p, jsContent: v || '' }));
										setIsDirty(true);
									}}
								/>
							</TabsContent>
						</div>
					</Tabs>
				</div>

				{/* Preview Container */}
				{showPreview && (
					<div className='w-2/5 flex flex-col bg-secondary/10 backdrop-blur-sm'>
						<div className='flex items-center justify-between px-4 h-11 border-b border-border/50 bg-background/50'>
							<div className='flex items-center gap-2'>
								<div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
								<span className='text-[10px] font-black uppercase tracking-tighter opacity-50'>
									Live Render
								</span>
							</div>
							<div className='flex items-center gap-4'>
								<div className='flex items-center space-x-2 group'>
									<Switch
										checked={editorState.allowScriptExecution}
										onCheckedChange={(v) => {
											setEditorState((p) => ({
												...p,
												allowScriptExecution: v,
											}));
											setIsDirty(true);
										}}
									/>
									<Label className='text-[10px] uppercase font-bold cursor-pointer group-hover:text-primary transition-colors'>
										JS Runtime
									</Label>
								</div>
								<Separator orientation='vertical' className='h-4' />
								<Button
									variant='ghost'
									size='icon'
									className='h-7 w-7 hover:rotate-180 transition-transform duration-500'
									onClick={updatePreview}
								>
									<RefreshCw className='h-3 w-3' />
								</Button>
							</div>
						</div>
						<div className='flex-1 bg-white dark:bg-zinc-900 m-5 rounded-xl shadow-2xl shadow-black/20 overflow-hidden border border-border/50 relative group'>
							<div
								ref={shadowHostRef}
								className='w-full h-full bg-transparent'
							/>
						</div>
					</div>
				)}
			</main>

			<footer className='shrink-0 h-20 z-30'>
				<StatusBar />
			</footer>
		</div>
	);
};

export default BlockEditor;
