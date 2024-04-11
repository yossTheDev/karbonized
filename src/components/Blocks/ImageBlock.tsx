import { IconBorderStyle, IconPhoto } from '@tabler/icons-react';
import React, { useRef } from 'react';
import karbonized from '../../assets/logo.svg';
import { useControlState } from '../../hooks/useControlState';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { ControlTemplate } from './ControlTemplate';
import { useStoreActions, useStoreState } from '@/stores/Hooks';
import { Button } from '../ui/button';

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

	const setControlSize = useStoreActions((state) => state.setControlSize);
	const setControlState = useStoreActions((state) => state.setControlState);
	const currentWorkspaceID = useStoreState((state) => state.currentWorkspaceID);
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
				menu={
					<>
						{/* Border Settings */}
						<CustomCollapse
							menu={
								<div className='flex items-center gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className=' font-bold'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto  p-2'>
									<p className='my-auto p-2'>Radius:</p>
									<Slider
										color='primary'
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
								<div className='flex items-center gap-2'>
									<IconPhoto></IconPhoto>
									<p>Image</p>
								</div>
							}
						>
							{/* Source */}
							<p>Source</p>
							<Input
								type='file'
								accept='image/*'
								onChange={(e) => {
									if (e.target.files != null && e.target.files.length > 0) {
										const reader = new FileReader();
										reader.addEventListener('load', () => {
											setSrc(reader.result?.toString() ?? '');
										});
										reader.readAsDataURL(e.target.files[0]);
									}
								}}
							></Input>

							<Button
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
							</Button>
						</CustomCollapse>
					</>
				}
			>
				<img
					ref={imgRef}
					style={{ borderRadius: borderRadius + 'px' }}
					className={`flex h-full w-full flex-auto select-none rounded-3xl `}
					src={src}
				></img>
			</ControlTemplate>
		</>
	);
};
export default ImageBlock;
