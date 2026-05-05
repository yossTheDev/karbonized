import React, { useState, useRef } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Trash2, Plus, Download, Info } from 'lucide-react';
import { useKComponentStore } from '@/stores/kcomponent-store';
import {
	parseKComponent,
	validateKComponentFile,
	generateKComponentExample,
} from '@/utils/kcomponentParser';
import { KComponent } from '@/models/KComponent';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImportComponentsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddToCanvas: (component: KComponent) => void;
}

export const ImportComponentsDialog: React.FC<ImportComponentsDialogProps> = ({
	open,
	onOpenChange,
	onAddToCanvas,
}) => {
	const [yamlContent, setYamlContent] = useState('');
	const [parseError, setParseError] = useState<string | null>(null);
	const [parsedComponent, setParsedComponent] = useState<KComponent | null>(
		null,
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { importedComponents, addImportedComponent, removeImportedComponent } =
		useKComponentStore();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			setYamlContent(content);
			validateAndParse(content);
		};
		reader.readAsText(file);
	};

	const handleYamlChange = (content: string) => {
		setYamlContent(content);
		validateAndParse(content);
	};

	const validateAndParse = (content: string) => {
		const validation = validateKComponentFile(content);
		if (!validation.valid) {
			setParseError(validation.error || 'Invalid .kcomponent file');
			setParsedComponent(null);
		} else {
			try {
				const component = parseKComponent(content);
				setParseError(null);
				setParsedComponent(component);
			} catch (error) {
				setParseError(
					error instanceof Error ? error.message : 'Failed to parse component',
				);
				setParsedComponent(null);
			}
		}
	};

	const handleImport = () => {
		if (!parsedComponent) return;

		addImportedComponent(parsedComponent);
		setYamlContent('');
		setParsedComponent(null);
		setParseError(null);
	};

	const handleAddToCanvas = (component: KComponent) => {
		onAddToCanvas(component);
		onOpenChange(false);
	};

	const handleDeleteImported = (id: string) => {
		removeImportedComponent(id);
	};

	const handleDownloadExample = () => {
		const example = generateKComponentExample();
		const blob = new Blob([example], { type: 'text/yaml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'example.kcomponent';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Import Custom Components</DialogTitle>
					<DialogDescription>
						Import .kcomponent files (YAML format) to add custom HTML/CSS/JS
						components to your canvas.
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue='import' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='import'>Import New</TabsTrigger>
						<TabsTrigger value='library'>Component Library</TabsTrigger>
					</TabsList>

					<TabsContent value='import' className='space-y-4'>
						{/* File Upload */}
						<div className='space-y-2'>
							<Label>Upload .kcomponent File</Label>
							<div className='flex gap-2'>
								<Input
									ref={fileInputRef}
									type='file'
									accept='.kcomponent,.yaml,.yml'
									onChange={handleFileUpload}
									className='hidden'
								/>
								<Button
									type='button'
									variant='outline'
									onClick={() => fileInputRef.current?.click()}
									className='flex-1'
								>
									<Upload className='mr-2 h-4 w-4' />
									Choose File
								</Button>
								<Button
									type='button'
									variant='ghost'
									onClick={handleDownloadExample}
								>
									<Download className='mr-2 h-4 w-4' />
									Download Example
								</Button>
							</div>
						</div>

						{/* YAML Editor */}
						<div className='space-y-2'>
							<Label>Or Paste YAML Content</Label>
							<Textarea
								value={yamlContent}
								onChange={(e) => handleYamlChange(e.target.value)}
								placeholder='Paste your .kcomponent YAML content here...'
								className='font-mono text-xs min-h-50'
							/>
						</div>

						{/* Validation Status */}
						{parseError && (
							<Alert variant='destructive'>
								<Info className='h-4 w-4' />
								<AlertDescription>{parseError}</AlertDescription>
							</Alert>
						)}

						{parsedComponent && (
							<Alert>
								<Info className='h-4 w-4' />
								<AlertDescription>
									Valid component:{' '}
									<strong>{parsedComponent.manifest.name}</strong>
									{parsedComponent.manifest.description && (
										<> - {parsedComponent.manifest.description}</>
									)}
								</AlertDescription>
							</Alert>
						)}

						{/* Preview */}
						{parsedComponent && (
							<div className='space-y-2'>
								<Label>Preview</Label>
								<div className='border rounded-lg p-4 bg-muted'>
									<div className='space-y-1'>
										<p className='font-semibold'>
											{parsedComponent.manifest.name}
										</p>
										{parsedComponent.manifest.author && (
											<p className='text-sm text-muted-foreground'>
												By {parsedComponent.manifest.author}
											</p>
										)}
										{parsedComponent.manifest.description && (
											<p className='text-sm text-muted-foreground'>
												{parsedComponent.manifest.description}
											</p>
										)}
										{parsedComponent.manifest.category && (
											<Badge variant='secondary'>
												{parsedComponent.manifest.category}
											</Badge>
										)}
									</div>
								</div>
							</div>
						)}

						<DialogFooter>
							<Button
								onClick={handleImport}
								disabled={!parsedComponent || !!parseError}
								className='w-full'
							>
								<Plus className='mr-2 h-4 w-4' />
								Add to Library
							</Button>
						</DialogFooter>
					</TabsContent>

					<TabsContent value='library' className='space-y-4'>
						{importedComponents.length === 0 ? (
							<div className='text-center py-8 text-muted-foreground'>
								<FileText className='h-12 w-12 mx-auto mb-4 opacity-50' />
								<p>No components imported yet.</p>
								<p className='text-sm'>
									Import components from the "Import New" tab.
								</p>
							</div>
						) : (
							<div className='space-y-2 max-h-100 overflow-y-auto'>
								{importedComponents.map((imported) => (
									<div
										key={imported.id}
										className='border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors'
									>
										<div className='flex items-start justify-between gap-4'>
											<div className='flex-1 space-y-1'>
												<div className='flex items-center gap-2'>
													<p className='font-semibold'>
														{imported.component.manifest.name}
													</p>
													{imported.component.manifest.category && (
														<Badge variant='secondary' className='text-xs'>
															{imported.component.manifest.category}
														</Badge>
													)}
												</div>
												{imported.component.manifest.author && (
													<p className='text-sm text-muted-foreground'>
														By {imported.component.manifest.author}
													</p>
												)}
												{imported.component.manifest.description && (
													<p className='text-sm text-muted-foreground'>
														{imported.component.manifest.description}
													</p>
												)}
												{imported.component.manifest.tags &&
													imported.component.manifest.tags.length > 0 && (
														<div className='flex gap-1 flex-wrap mt-2'>
															{imported.component.manifest.tags.map((tag) => (
																<Badge
																	key={tag}
																	variant='outline'
																	className='text-xs'
																>
																	{tag}
																</Badge>
															))}
														</div>
													)}
											</div>
											<div className='flex gap-2'>
												<Button
													size='sm'
													onClick={() => handleAddToCanvas(imported.component)}
												>
													<Plus className='h-4 w-4 mr-1' />
													Add
												</Button>
												<Button
													size='sm'
													variant='ghost'
													onClick={() => handleDeleteImported(imported.id)}
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default ImportComponentsDialog;
