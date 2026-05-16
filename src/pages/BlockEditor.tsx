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
	Files,
	MonitorSmartphone,
	PanelRight,
	Play,
	ShieldCheck,
	ChevronsLeft,
	ChevronsRight,
	Circle,
	Layers3,
	GitBranch,
	Zap,
	ChevronRight,
	Boxes,
	Palette,
} from 'lucide-react';
import { useControlsStore, useWorkspaceStore } from '@/stores';
import {
	type CustomAction,
	scopeCSS,
	parseJavaScript,
	generateActionRegistrations,
	generateCompiledSource,
	updateCSSVariable,
	updateJSVariable,
	createSafeDOM,
	fileHandler,
	fileUtils,
} from '@/lib/blocks-api';
import {
	defaultHTMLContent,
	defaultCSSContent,
	defaultJSContent,
} from '@/lib/blocks-api/default-content';
import { stringifyKComponent } from '@/utils/kcomponentParser';
import { useHTMLBlockBindings } from '@/hooks/useHTMLBlockBindings';
import {
	HTMLBlockActionsControls,
	HTMLBlockCSSVariablesControls,
	HTMLBlockJSVariablesControls,
} from '@/components/Blocks/HTMLBlockBindingsPanel';
import { useBlockEditorChrome } from '@/contexts/BlockEditorChromeContext';

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
			'editor.background': '#1e1e1e',
			'editor.foreground': '#d4d4d4',
			'editor.lineHighlightBackground': '#2a2d2e',
			'editor.selectionBackground': '#264f78',
			'editor.inactiveSelectionBackground': '#3a3d41',
			'editorIndentGuide.background': '#404040',
			'editorCursor.foreground': '#aeafad',
			'editorLineNumber.foreground': '#858585',
			'editorLineNumber.activeForeground': '#c6c6c6',
			'editorWidget.background': '#252526',
		},
	});

	monaco.editor.defineTheme('karbonized-light', {
		base: 'vs',
		inherit: true,
		rules: commonRules,
		colors: {
			'editor.background': '#f8f8f8',
			'editor.foreground': '#1f2937',
			'editor.lineHighlightBackground': '#eaeaea',
			'editor.selectionBackground': '#cfe8ff',
			'editorCursor.foreground': '#0f172a',
			'editorLineNumber.foreground': '#9ca3af',
			'editorLineNumber.activeForeground': '#1f2937',
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
	const actionHandlersRef = useRef<Map<string, () => void>>(new Map());
	const [theme] = useTheme();
	const blockId =
		(location.state as { blockId?: string } | null)?.blockId ?? null;
	const { setConfig } = useBlockEditorChrome();

	const [editorState, setEditorState] = useState<BlockEditorState>({
		htmlContent: defaultHTMLContent,
		cssContent: defaultCSSContent,
		jsContent: defaultJSContent,
		allowScriptExecution: false,
	});

	const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
	const [showPreview, setShowPreview] = useState(true);
	const [isDirty, setIsDirty] = useState(false);
	const [showExplorer, setShowExplorer] = useState(true);
	const [activePreviewTab, setActivePreviewTab] = useState<
		'preview' | 'css' | 'js' | 'actions'
	>('preview');

	const ControlProperties = useControlsStore(
		(state) => state.ControlProperties,
	);
	const addControlProperty = useControlsStore(
		(state) => state.addControlProperty,
	);
	const currentWorkspaceID = useWorkspaceStore(
		(state) => state.currentWorkspaceID,
	);
	const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
	const { cssVariables, jsVariables, customActions } = useHTMLBlockBindings(
		editorState.cssContent,
		editorState.jsContent,
	);

	const files = [
		{
			id: 'html' as const,
			label: 'index.html',
			description: 'Markup',
			language: 'html',
			icon: Code2,
			iconClassName: 'text-orange-400',
			content: editorState.htmlContent,
		},
		{
			id: 'css' as const,
			label: 'styles.css',
			description: 'Styles',
			language: 'css',
			icon: Type,
			iconClassName: 'text-sky-400',
			content: editorState.cssContent,
		},
		{
			id: 'js' as const,
			label: 'main.js',
			description: 'Logic',
			language: 'javascript',
			icon: FileJson,
			iconClassName: 'text-yellow-300',
			content: editorState.jsContent,
		},
	] as const;

	const activeFile = files.find((file) => file.id === activeTab) ?? files[0];

	const handleUpdateCSSVariable = (
		varName: string,
		newValue: string | number | boolean,
	) => {
		const nextCSS = updateCSSVariable(
			editorState.cssContent,
			varName,
			newValue,
			cssVariables,
		);
		setEditorState((previousState) => ({
			...previousState,
			cssContent: nextCSS,
		}));
		setIsDirty(true);
	};

	const handleUpdateJSVariable = (varName: string, newValue: any) => {
		const nextJS = updateJSVariable(
			editorState.jsContent,
			varName,
			newValue,
			jsVariables,
		);
		setEditorState((previousState) => ({
			...previousState,
			jsContent: nextJS,
		}));
		setIsDirty(true);
	};

	useEffect(() => {
		if (blockId) {
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
	}, [blockId, ControlProperties]);

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
		if (!shadowHostRef.current || !showPreview) return;

		if (!shadowRootRef.current) {
			shadowRootRef.current = shadowHostRef.current.attachShadow({
				mode: 'open',
			});
		}

		const shadowRoot = shadowRootRef.current;
		actionHandlersRef.current.clear();
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

		shadowRoot.innerHTML = '';

		const styleElement = document.createElement('style');
		styleElement.textContent = processedCSS;
		shadowRoot.appendChild(styleElement);

		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.width = '100%';
		container.style.height = '100%';
		container.innerHTML = editorState.htmlContent;
		shadowRoot.appendChild(container);

		if (editorState.allowScriptExecution && editorState.jsContent.trim()) {
			try {
				const host = shadowHostRef.current;
				const scopedDocument = createScopedDocument(shadowRoot, host);
				const safeQuerySelector = (selector: string) => {
					try {
						return shadowRoot.querySelector(selector);
					} catch (error) {
						console.error('Error selecting element:', selector, error);
						return null;
					}
				};
				const safeDOM = createSafeDOM(shadowRoot);

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
						actionHandlersRef.current.set(actionId, handler);
						console.log(`Action registered: ${actionId}`);
					},
					safeDOM,
					uploadFile: fileHandler.uploadFile,
					removeFile: fileHandler.removeFile,
					getFile: fileHandler.getFile,
					getAllFiles: fileHandler.getAllFiles,
					clearFiles: fileHandler.clearFiles,
					validateFile: fileHandler.validateFile,
					convertToDataUrl: fileHandler.convertToDataUrl,
					optimizeImage: fileHandler.optimizeImage,
					fileUtils,
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
		if (blockId) {
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

	const handleExportKComponent = () => {
		const componentName =
			(currentWorkspace?.workspaceName != null
				? `${currentWorkspace.workspaceName} Block`
				: blockId ?? 'custom-block')
				.trim();

		const yamlContent = stringifyKComponent({
			manifest: {
				name: componentName,
				description: `Exported from block ${blockId ?? 'editor'} in Karbonized`,
				version: '1.0.0',
				category: 'HTML Blocks',
				tags: ['karbonized', 'html-block'],
			},
			html: editorState.htmlContent,
			css: editorState.cssContent,
			js: editorState.jsContent,
		});

		const filename = componentName
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

		const blob = new Blob([yamlContent], {
			type: 'text/yaml;charset=utf-8',
		});
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename || 'custom-block'}.kcomponent`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(url);
	};

	const executeCustomAction = (action: CustomAction) => {
		if (!editorState.allowScriptExecution) return;

		const handler = actionHandlersRef.current.get(action.id);
		if (handler != null) {
			handler();
			return;
		}

		updatePreview();
		setTimeout(() => {
			const refreshedHandler = actionHandlersRef.current.get(action.id);
			refreshedHandler?.();
		}, 50);
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 's') {
				event.preventDefault();
				handleSave();
				return;
			}

			if (event.ctrlKey && event.key === 'b') {
				event.preventDefault();
				setShowExplorer((current) => !current);
				return;
			}

			if (event.ctrlKey && event.key === '\\') {
				event.preventDefault();
				setShowPreview((current) => !current);
				return;
			}

			if (event.ctrlKey && event.key === 'r') {
				event.preventDefault();
				updatePreview();
				return;
			}

			if (event.altKey && event.key === '1') {
				event.preventDefault();
				setActiveTab('html');
				return;
			}

			if (event.altKey && event.key === '2') {
				event.preventDefault();
				setActiveTab('css');
				return;
			}

			if (event.altKey && event.key === '3') {
				event.preventDefault();
				setActiveTab('js');
				return;
			}

			if (event.altKey && event.key === '4') {
				event.preventDefault();
				setActivePreviewTab('preview');
				return;
			}

			if (event.key === 'Escape') {
				event.preventDefault();
				navigate('/editor');
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [navigate, handleSave]);

	useEffect(() => {
		setConfig({
			save: handleSave,
			exportKComponent: handleExportKComponent,
			refreshPreview: updatePreview,
			togglePreview: () => setShowPreview((current) => !current),
			toggleExplorer: () => setShowExplorer((current) => !current),
			toggleRuntime: () =>
				setEditorState((previousState) => ({
					...previousState,
					allowScriptExecution: !previousState.allowScriptExecution,
				})),
			setActiveCodeTab: setActiveTab,
			setActivePreviewTab,
			showPreview,
			showExplorer,
			allowScriptExecution: editorState.allowScriptExecution,
			activeCodeTab: activeTab,
			activePreviewTab,
		});

		return () => {
			setConfig(null);
		};
	}, [
		activePreviewTab,
		activeTab,
		editorState.allowScriptExecution,
		handleSave,
		showExplorer,
		showPreview,
		setConfig,
	]);

	const editorOptions = {
		wordWrap: 'on' as const,
		minimap: { enabled: false },
		fontSize: 14,
		fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
		automaticLayout: true,
		scrollBeyondLastLine: false,
		padding: { top: 16, bottom: 16 },
		renderLineHighlight: 'all' as const,
		lineNumbers: 'on' as const,
		lineNumbersMinChars: 4,
		roundedSelection: false,
		glyphMargin: true,
		folding: true,
		tabSize: 2,
		smoothScrolling: true,
		cursorBlinking: 'smooth' as const,
		stickyScroll: { enabled: false },
		scrollbar: {
			verticalScrollbarSize: 10,
			horizontalScrollbarSize: 10,
		},
	};

	const currentMonacoTheme =
		theme === 'dark' ? 'karbonized-dark' : 'karbonized-light';

	const handleFileChange = (nextValue: string) => {
		setEditorState((previousState) => ({
			...previousState,
			...(activeTab === 'html' && { htmlContent: nextValue }),
			...(activeTab === 'css' && { cssContent: nextValue }),
			...(activeTab === 'js' && { jsContent: nextValue }),
		}));
		setIsDirty(true);
	};

	return (
		<div className='flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground selection:bg-primary/30'>
			<div className='flex h-10 items-center gap-2 border-b bg-card/70 px-3 backdrop-blur-xl'>
				<Button
					variant='ghost'
					size='sm'
					onClick={() => navigate('/editor')}
					className='h-8 gap-2 rounded-full px-3'
				>
					<ArrowLeft className='h-3.5 w-3.5' />
					Back
				</Button>
				<Separator orientation='vertical' className='h-5' />
				<Badge className='border-primary/20 bg-primary/10 text-[10px] text-primary hover:bg-primary/10'>
					HTML BLOCK
				</Badge>
				<div className='min-w-0 flex-1'>
					<p className='truncate text-sm font-semibold'>
						{blockId ?? 'Detached block'}
					</p>
				</div>
			</div>

			<div className='flex min-h-0 flex-1 overflow-hidden'>
				<div className='flex w-16 shrink-0 flex-col items-center gap-3 border-r border-border/60 bg-popover p-2 text-foreground shadow-md'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setShowExplorer((current) => !current)}
						className='size-9 rounded-4xl'
					>
						<Files className='h-4 w-4' />
					</Button>
				</div>

				{showExplorer && (
					<aside className='flex w-72 shrink-0 flex-col border-r border-border/60 bg-popover text-foreground'>
						<div className='flex h-11 items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
							<span>Explorer</span>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setShowExplorer(false)}
								className='h-7 w-7 rounded-full'
							>
								<ChevronsLeft className='h-3.5 w-3.5' />
							</Button>
						</div>
						<div className='border-t border-border/60 px-2 py-3'>
							<div className='mb-3 flex items-center gap-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
								<ChevronRight className='h-3.5 w-3.5' />
								<span>Html Block</span>
							</div>
							<div className='space-y-2'>
								{files.map((file) => {
									const FileIcon = file.icon;
									const isActive = file.id === activeTab;

									return (
										<button
											key={file.id}
											type='button'
											onClick={() => setActiveTab(file.id)}
											className={`group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all ${
												isActive
													? 'border-primary/40 bg-primary/10 text-foreground shadow-sm'
													: 'border-transparent bg-background/60 text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground'
											}`}
										>
											<div
												className={`flex size-9 shrink-0 items-center justify-center rounded-2xl border ${
													isActive
														? 'border-primary/30 bg-primary/10'
														: 'border-border/80 bg-card'
												}`}
											>
												<FileIcon className={`h-4 w-4 ${file.iconClassName}`} />
											</div>
											<div className='min-w-0 flex-1'>
												<p className='truncate text-sm font-medium'>{file.label}</p>
												<p className='truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground/90'>
													{file.description}
												</p>
											</div>
											{isDirty && file.id === activeTab && (
												<Circle className='h-2.5 w-2.5 fill-current text-current' />
											)}
										</button>
									);
								})}
							</div>
						</div>
						<div className='mt-auto border-t border-border/60 px-4 py-3 text-xs text-muted-foreground'>
							<p className='truncate'>Workspace: {currentWorkspace?.workspaceName}</p>
							<p className='truncate'>Block: {blockId ?? 'Detached'}</p>
						</div>
					</aside>
				)}

				<Tabs
					value={activeTab}
					onValueChange={(value) => setActiveTab(value as 'html' | 'css' | 'js')}
					className='flex min-w-0 flex-1 flex-col overflow-hidden'
				>
					<div className='flex min-h-0 flex-1 overflow-hidden'>
						<section className='flex min-w-0 flex-1 flex-col overflow-hidden bg-background'>
							<div className='flex h-11 items-center justify-between border-b border-border/60 bg-card/30 pr-3'>
								<TabsList className='h-full justify-start gap-1 rounded-none border-0 bg-transparent p-1'>
									{files.map((file) => {
										const FileIcon = file.icon;

										return (
											<TabsTrigger
												key={file.id}
												value={file.id}
												className='h-9 rounded-2xl border border-transparent bg-transparent px-4 text-xs font-medium text-muted-foreground data-[state=active]:border-border/60 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none'
											>
												<FileIcon
													className={`mr-2 h-3.5 w-3.5 ${file.iconClassName}`}
												/>
												{file.label}
												{isDirty && activeTab === file.id && (
													<Circle className='ml-2 h-2.5 w-2.5 fill-current text-primary' />
												)}
											</TabsTrigger>
										);
									})}
								</TabsList>

								<div className='flex items-center gap-1'>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => setShowExplorer((current) => !current)}
										className='h-8 w-8 rounded-full text-muted-foreground'
									>
										{showExplorer ? (
											<ChevronsLeft className='h-3.5 w-3.5' />
										) : (
											<ChevronsRight className='h-3.5 w-3.5' />
										)}
									</Button>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => setShowPreview((current) => !current)}
										className='h-8 w-8 rounded-full text-muted-foreground'
									>
										{showPreview ? (
											<EyeOff className='h-3.5 w-3.5' />
										) : (
											<Eye className='h-3.5 w-3.5' />
										)}
									</Button>
								</div>
							</div>

							<div className='flex h-9 items-center gap-2 border-b border-border/60 bg-muted/30 px-4 text-xs text-muted-foreground'>
								<Sparkles className='h-3.5 w-3.5 text-primary' />
								<span>Block Engine</span>
								<ChevronRight className='h-3 w-3' />
								<span>{activeFile.label}</span>
								{isDirty && (
									<Badge className='border-primary/20 bg-primary/10 text-[10px] text-primary hover:bg-primary/10'>
										Unsaved
									</Badge>
								)}
							</div>

							<div className='relative min-h-0 flex-1 bg-background'>
								{files.map((file) => (
									<TabsContent
										key={file.id}
										value={file.id}
										className='absolute inset-0 m-0 data-[state=inactive]:hidden'
									>
										<Editor
											language={file.language}
											theme={currentMonacoTheme}
											value={file.content}
											options={editorOptions}
											onChange={(value) => handleFileChange(value || '')}
										/>
									</TabsContent>
								))}
							</div>
						</section>

						{showPreview && (
							<aside className='flex w-[38%] min-w-[320px] max-w-[560px] shrink-0 flex-col border-l border-border/60 bg-popover text-foreground'>
								<div className='flex h-11 items-center justify-between border-b border-border/60 px-4'>
									<div className='flex items-center gap-2 text-xs font-medium'>
										<PanelRight className='h-3.5 w-3.5 text-primary' />
										<span>Element Preview</span>
									</div>
									<div className='flex items-center gap-1.5'>
										<div className='flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1'>
											<Switch
												checked={editorState.allowScriptExecution}
												onCheckedChange={(checked) => {
													setEditorState((previousState) => ({
														...previousState,
														allowScriptExecution: checked,
													}));
													setIsDirty(true);
												}}
											/>
											<Label className='cursor-pointer text-[11px] font-medium'>
												JS Runtime
											</Label>
										</div>
										<Button
											variant='ghost'
											size='icon'
											onClick={updatePreview}
											className='h-8 w-8 rounded-full text-muted-foreground'
										>
											<RefreshCw className='h-3.5 w-3.5' />
										</Button>
									</div>
								</div>
								<div className='border-b border-border/60 bg-card/30 px-4 py-2 text-[11px] text-muted-foreground'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<MonitorSmartphone className='h-3.5 w-3.5' />
											<span>Selected block render</span>
										</div>
										<div className='flex items-center gap-2'>
											{editorState.allowScriptExecution ? (
												<Play className='h-3.5 w-3.5 text-emerald-400' />
											) : (
												<ShieldCheck className='h-3.5 w-3.5 text-amber-400' />
											)}
											<span>
												{editorState.allowScriptExecution
													? 'Scripts enabled'
													: 'Scripts sandboxed'}
											</span>
										</div>
									</div>
								</div>
								<Tabs
									value={activePreviewTab}
									onValueChange={(value) =>
										setActivePreviewTab(
											value as 'preview' | 'css' | 'js' | 'actions',
										)
									}
									className='flex min-h-0 flex-1 flex-col'
								>
									<TabsList className='mx-4 mt-3 grid h-10 grid-cols-4 rounded-2xl border border-border/60 bg-background/70 p-1'>
										<TabsTrigger value='preview' className='rounded-xl text-[11px]'>
											<MonitorSmartphone className='mr-1.5 h-3.5 w-3.5' />
											Preview
										</TabsTrigger>
										<TabsTrigger value='css' className='rounded-xl text-[11px]'>
											<Palette className='mr-1.5 h-3.5 w-3.5' />
											CSS
										</TabsTrigger>
										<TabsTrigger value='js' className='rounded-xl text-[11px]'>
											<Code2 className='mr-1.5 h-3.5 w-3.5' />
											JS
										</TabsTrigger>
										<TabsTrigger value='actions' className='rounded-xl text-[11px]'>
											<Boxes className='mr-1.5 h-3.5 w-3.5' />
											Actions
										</TabsTrigger>
									</TabsList>

									<TabsContent value='preview' className='min-h-0 flex-1 m-0 p-4'>
										<div className='flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl'>
											<div className='flex h-10 items-center gap-2 border-b border-border/60 bg-card/70 px-4 text-xs text-muted-foreground'>
												<div className='h-2.5 w-2.5 rounded-full bg-primary/50' />
												<span className='truncate'>Block Surface</span>
												<Badge className='ml-auto border-border/60 bg-background text-[10px] text-muted-foreground hover:bg-background'>
													Single Element
												</Badge>
											</div>
											<div className='min-h-0 flex-1 overflow-auto bg-muted/20 p-4'>
												<div className='flex min-h-full items-center justify-center'>
													<div className='inline-flex min-h-[260px] min-w-[260px] max-w-full overflow-auto rounded-2xl border border-dashed border-border/70 bg-background p-3 shadow-sm'>
														<div
															ref={shadowHostRef}
															className='inline-flex min-h-[220px] min-w-[220px] bg-transparent'
														/>
													</div>
												</div>
											</div>
										</div>
									</TabsContent>

									<TabsContent value='css' className='min-h-0 flex-1 m-0 p-4'>
										<div className='h-full overflow-auto rounded-3xl border border-border/60 bg-card p-4 shadow-sm'>
											<div className='mb-4 flex items-center gap-2 text-sm font-semibold'>
												<Palette className='h-4 w-4 text-primary' />
												CSS Variables
												<Badge variant='secondary'>{cssVariables.length}</Badge>
											</div>
											<HTMLBlockCSSVariablesControls
												variables={cssVariables}
												onUpdateVariable={handleUpdateCSSVariable}
											/>
										</div>
									</TabsContent>

									<TabsContent value='js' className='min-h-0 flex-1 m-0 p-4'>
										<div className='h-full overflow-auto rounded-3xl border border-border/60 bg-card p-4 shadow-sm'>
											<div className='mb-4 flex items-center gap-2 text-sm font-semibold'>
												<Code2 className='h-4 w-4 text-primary' />
												JS Variables
												<Badge variant='secondary'>{jsVariables.length}</Badge>
											</div>
											<HTMLBlockJSVariablesControls
												variables={jsVariables}
												onUpdateVariable={handleUpdateJSVariable}
											/>
										</div>
									</TabsContent>

									<TabsContent value='actions' className='min-h-0 flex-1 m-0 p-4'>
										<div className='h-full overflow-auto rounded-3xl border border-border/60 bg-card p-4 shadow-sm'>
											<div className='mb-4 flex items-center gap-2 text-sm font-semibold'>
												<Play className='h-4 w-4 text-primary' />
												Actions
												<Badge variant='secondary'>{customActions.length}</Badge>
											</div>
											<HTMLBlockActionsControls
												actions={customActions}
												allowScriptExecution={editorState.allowScriptExecution}
												onExecuteAction={executeCustomAction}
											/>
										</div>
									</TabsContent>
								</Tabs>
							</aside>
						)}
					</div>
				</Tabs>
			</div>

			<footer className='flex h-9 items-center justify-between border-t border-border bg-background px-3 text-xs text-muted-foreground shadow-sm'>
				<div className='flex items-center gap-3 overflow-hidden'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => navigate('/editor')}
						className='h-7 px-2 text-[11px]'
					>
						<ArrowLeft className='mr-1.5 h-3 w-3' />
						Canvas
					</Button>
					<Separator orientation='vertical' className='h-4' />
					<span className='flex items-center gap-1.5'>
						<GitBranch className='h-3 w-3' />
						html-block/{blockId ?? 'detached'}
					</span>
					<span className='flex items-center gap-1.5'>
						<Zap className='h-3 w-3' />
						{isDirty ? 'Unsaved changes' : 'All changes saved'}
					</span>
				</div>

				<div className='flex items-center gap-3 text-[11px]'>
					<span>{activeFile.label}</span>
					<span>{activeFile.language.toUpperCase()}</span>
					<span>{editorState.allowScriptExecution ? 'JS ON' : 'JS OFF'}</span>
					<span>{showPreview ? 'Preview Visible' : 'Preview Hidden'}</span>
				</div>
			</footer>
		</div>
	);
};

export default BlockEditor;
