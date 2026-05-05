import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileImage, Layers, Plus, ArrowLeft, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useWorkspaceStore } from '@/stores';
import { getRandomNumber } from '@/utils/getRandom';
import { SizeItem, Sizes } from '@/constants/sizes';

export const NewProject: React.FC = () => {
	const navigate = useNavigate();
	const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
	const setCurrentWorkspace = useWorkspaceStore(
		(state) => state.setCurrentWorkspace,
	);

	const [projectName, setProjectName] = useState('');
	const [selectedPreset, setSelectedPreset] = useState<SizeItem | null>(null);
	const [customWidth, setCustomWidth] = useState('1920');
	const [customHeight, setCustomHeight] = useState('1080');
	const [useCustomSize, setUseCustomSize] = useState(false);

	const handleCreateProject = () => {
		const width = useCustomSize
			? parseInt(customWidth)
			: selectedPreset?.width || 1920;
		const height = useCustomSize
			? parseInt(customHeight)
			: selectedPreset?.height || 1080;

		if (!projectName.trim()) {
			alert('Por favor ingresa un nombre para el proyecto');
			return;
		}

		if (width <= 0 || height <= 0) {
			alert('Por favor ingresa dimensiones válidas');
			return;
		}

		const workspaceId = getRandomNumber().toString();
		addWorkspace(workspaceId, projectName);
		setCurrentWorkspace(workspaceId);

		// Update workspace with custom dimensions
		const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
		if (currentWorkspace) {
			useWorkspaceStore.setState((state) => ({
				...state,
				currentWorkspace: {
					...currentWorkspace,
					workspaceWidth: width.toString(),
					workspaceHeight: height.toString(),
				},
			}));
		}

		navigate('/editor');
	};

	const handlePresetSelect = (preset: SizeItem) => {
		setSelectedPreset(preset);
		setUseCustomSize(false);
	};

	const handleCustomSizeToggle = () => {
		setUseCustomSize(true);
		setSelectedPreset(null);
	};

	return (
		<div className='flex h-full w-full items-center justify-center bg-background p-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='w-full max-w-6xl mx-auto'
			>
				{/* Header */}
				<div className='mb-8 text-center'>
					<div className='mb-4 flex justify-center'>
						<div className='rounded-full bg-primary/10 p-4'>
							<Layers className='h-8 w-8 text-primary' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-foreground mb-2'>
						Nuevo Proyecto
					</h1>
					<p className='text-muted-foreground'>
						Crea un nuevo proyecto con las dimensiones que necesites
					</p>
				</div>

				<div className='grid gap-6 lg:grid-cols-3 xl:grid-cols-4'>
					{/* Left Column - Project Info */}
					<Card className='lg:col-span-1 xl:col-span-2'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<FileImage className='w-5 h-5' />
								Información del Proyecto
							</CardTitle>
							<CardDescription>
								Configura los detalles básicos de tu proyecto
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<Label htmlFor='project-name'>Nombre del Proyecto</Label>
								<Input
									id='project-name'
									placeholder='Mi Proyecto'
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
									className='mt-1'
								/>
							</div>

							<div>
								<Label>Dimensiones del Lienzo</Label>
								<div className='mt-2 space-y-3'>
									{!useCustomSize && (
										<div className='grid grid-cols-2 gap-2'>
											<div className='text-sm text-muted-foreground'>
												Ancho: {selectedPreset?.width || 1920}px
											</div>
											<div className='text-sm text-muted-foreground'>
												Alto: {selectedPreset?.height || 1080}px
											</div>
										</div>
									)}

									{useCustomSize && (
										<div className='grid grid-cols-2 gap-2'>
											<div>
												<Label htmlFor='custom-width' className='text-xs'>
													Ancho (px)
												</Label>
												<Input
													id='custom-width'
													type='number'
													value={customWidth}
													onChange={(e) => setCustomWidth(e.target.value)}
													className='mt-1'
												/>
											</div>
											<div>
												<Label htmlFor='custom-height' className='text-xs'>
													Alto (px)
												</Label>
												<Input
													id='custom-height'
													type='number'
													value={customHeight}
													onChange={(e) => setCustomHeight(e.target.value)}
													className='mt-1'
												/>
											</div>
										</div>
									)}
								</div>
							</div>

							<Button
								variant='outline'
								onClick={handleCustomSizeToggle}
								className='w-full'
							>
								{useCustomSize ? 'Usar预设尺寸' : 'Dimensiones Personalizadas'}
							</Button>
						</CardContent>
					</Card>

					{/* Right Column - Preset Sizes */}
					<Card className='lg:col-span-2 xl:col-span-2'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Monitor className='w-5 h-5' />
								Tamaños Predefinidos
							</CardTitle>
							<CardDescription>
								Selecciona un tamaño predefinido para empezar rápidamente
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 max-h-96 overflow-y-auto'>
								{Sizes.map((preset) => (
									<div
										key={preset.label}
										onClick={() => handlePresetSelect(preset)}
										className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent ${
											selectedPreset?.label === preset.label && !useCustomSize
												? 'border-primary bg-primary/5'
												: 'border-border'
										}`}
									>
										<div className='flex items-center gap-3'>
											<div className='text-muted-foreground'>{preset.icon}</div>
											<div className='flex-1'>
												<div className='font-medium text-sm'>
													{preset.label}
												</div>
												<div className='text-xs text-muted-foreground'>
													{preset.width} × {preset.height}px
												</div>
												<div className='text-xs text-muted-foreground mt-1'>
													{preset.description}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Action Buttons */}
				<div className='mt-8 flex flex-col sm:flex-row justify-between gap-4'>
					<Button
						variant='outline'
						onClick={() => navigate('/editor')}
						className='flex items-center gap-2 w-full sm:w-auto'
					>
						<ArrowLeft className='w-4 h-4' />
						Volver al Editor
					</Button>

					<Button
						onClick={handleCreateProject}
						size='lg'
						className='flex items-center gap-2 w-full sm:w-auto'
					>
						<Plus className='w-4 h-4' />
						Crear Proyecto
					</Button>
				</div>
			</motion.div>
		</div>
	);
};

export default NewProject;
