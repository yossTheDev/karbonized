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
import { Upload, Plus, Download, Info } from 'lucide-react';
import { useKComponentStore } from '@/stores/kcomponent-store';
import {
	parseKComponent,
	validateKComponentFile,
	generateKComponentExample,
} from '@/utils/kcomponentParser';
import { KComponent } from '@/models/KComponent';
import { Badge } from '@/components/ui/badge';

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

	const { addImportedComponent, componentExists } = useKComponentStore();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			setYamlContent(content);
			validateAndParse(content);
		};
		reader.onerror = () => {
			setParseError('Failed to read file');
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

		// Check if component already exists
		const exists = componentExists(
			parsedComponent.manifest.name,
			parsedComponent.manifest.author,
		);

		if (exists) {
			setParseError(
				`A component with the name "${parsedComponent.manifest.name}" by ${parsedComponent.manifest.author || 'unknown'} already exists.`,
			);
			return;
		}

		addImportedComponent(parsedComponent);
		setYamlContent('');
		setParsedComponent(null);
		setParseError(null);
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
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Import Custom Components</DialogTitle>
					<DialogDescription>
						Import .kcomponent files (YAML format) to add custom HTML/CSS/JS
						components to your canvas.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4 max-h-[65vh] overflow-y-auto'>
					{/* File Upload */}
					<div className='space-y-2'>
						<Label>Upload .kcomponent File</Label>
						<div className='flex gap-2'>
							<label htmlFor='kcomponent-file' className='flex-1'>
								<Button
									type='button'
									variant='outline'
									className='w-full'
									asChild
								>
									<span>
										<Upload className='mr-2 h-4 w-4' />
										Choose File
									</span>
								</Button>
							</label>
							<Input
								id='kcomponent-file'
								ref={fileInputRef}
								type='file'
								accept='.kcomponent,.yaml,.yml'
								onChange={handleFileUpload}
								className='hidden'
							/>
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
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ImportComponentsDialog;
