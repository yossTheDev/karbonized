import { useControlsStore, useWorkspaceStore, useHistoryStore } from '@/stores';
import { IconBorderStyle, IconPhoto } from '@tabler/icons-react';
import React, { useRef } from 'react';
import karbonized from '../../assets/logo.svg';
import { useControlState } from '../../hooks/useControlState';
import { buildDynamicBackgroundColors } from '../../utils/dynamicBackgroundColors';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ContextMenuItem } from '../ui/context-menu';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { ControlTemplate } from './ControlTemplate';
import { Label } from '../ui/label';

interface Props {
	id: string;
}

export const ImageBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const imgRef = useRef<HTMLImageElement>(null);
	const [src, setSrc] = useControlState(karbonized, `${id}-src`);
	const [borderRadius, setBorderRadius] = useControlState(
		3,
		`${id}-borderRadius`,
	);

	const setControlSize = useControlsStore((state) => state.setControlSize);
	const setControlState = useHistoryStore((state) => state.setControlState);
	const setWorkspaceDynamic = useWorkspaceStore(
		(state) => state.setWorkspaceDynamic,
	);
	const setWorkspaceType = useWorkspaceStore((state) => state.setWorkspaceType);
	const currentWorkspaceID = useWorkspaceStore(
		(state) => state.currentWorkspaceID,
	);
	const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

	// Handle Load Image
	const handleLoadImage = (): void => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.addEventListener('change', (ev: any) => {
			if (ev.target?.files != null && ev.target?.files.length > 0) {
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					setSrc(reader.result?.toString() ?? '');
				});
				reader.readAsDataURL(ev.target?.files[0]);
			}
		});
		input.click();
	};

	const handleCreateDynamicBackground = async (): Promise<void> => {
		if (imgRef.current == null || currentWorkspace == null) {
			return;
		}

		try {
			const colors = await buildDynamicBackgroundColors(imgRef.current);
			const seed = Math.floor(Math.random() * 10000);

			setWorkspaceDynamic({
				colors,
				seed,
			});
			setWorkspaceType('dynamic');
		} catch (error) {
			console.error('Failed to create dynamic background from image', error);
		}
	};

	return (
		<>
			<ControlTemplate
				id={id}
				border={0}
				borderEditable={false}
				minHeight={'50px'}
				minWidth={'50px'}
				maxWidth={'5000px'}
				maxHeight={'5000px'}
				defaultHeight={'100px'}
				defaultWidth={'100px'}
				onCreateDynamicBackground={handleCreateDynamicBackground}
				contextMenu={
					<>
						<ContextMenuItem
							onClick={() => {
								handleLoadImage();
							}}
						>
							Load Image
						</ContextMenuItem>

						<ContextMenuItem
							onClick={() => {
								setControlSize({
									w: imgRef.current?.naturalWidth ?? 100,
									h: imgRef.current?.naturalHeight ?? 100,
								});

								setControlState({
									id: `${id}-control_size`,
									value: {
										w: imgRef.current?.naturalWidth,
										h: imgRef.current?.naturalHeight,
									},
									workspace: currentWorkspaceID,
								});
							}}
						>
							Set Original Image Size
						</ContextMenuItem>
					</>
				}
				menu={
					<>
						{/* Border Settings */}
						<CustomCollapse
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconBorderStyle
										size={18}
										className='text-muted-foreground'
									/>
									<Label className='text-sm font-semibold'>Borders</Label>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto  p-2'>
									<Label className='my-auto p-2 text-xs text-muted-foreground'>
										Radius:
									</Label>
									<Slider
										className='flex-1'
										onValueChange={(ev) => {
											setBorderRadius(ev[0]);
										}}
										value={[borderRadius]}
										max={22}
									></Slider>
								</div>
							</div>
						</CustomCollapse>

						{/* Image Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconPhoto size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Image</Label>
								</div>
							}
						>
							{/* Source */}
							<Label className='text-xs text-muted-foreground'>Source</Label>
							<Input
								type='file'
								accept='image/*'
								className='h-8 text-sm'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (e.target.files != null && e.target.files.length > 0) {
										const reader = new FileReader();
										reader.addEventListener('load', () => {
											setSrc(reader.result?.toString() ?? '');
										});
										reader.readAsDataURL(e.target.files[0]);
									}
								}}
							></Input>
						</CustomCollapse>
					</>
				}
			>
				<img
					ref={imgRef}
					style={{ borderRadius: borderRadius + 'px' }}
					className={`flex h-full w-full flex-auto select-none rounded-3xl `}
					src={src}
					crossOrigin='anonymous'
				></img>
			</ControlTemplate>
		</>
	);
};
export default ImageBlock;
