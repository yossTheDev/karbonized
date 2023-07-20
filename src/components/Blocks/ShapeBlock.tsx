import {
	IconHeartFilled,
	IconHexagon,
	IconHexagonFilled,
} from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import {
	Arrow2Svg,
	Arrow3Svg,
	Arrow4Svg,
	Arrow5Svg,
	Arrow6Svg,
	ArrowSvg,
	LineSvg,
	OvalSvg,
	PoligonSvg,
	RectangleSvg,
	StarSvg,
	Trianglevg,
} from '../Misc/Icons';
import { ColorPicker } from '../CustomControls/ColorPicker';

import { ShapeHandler } from './ShapeHandler';
import { Portal } from 'react-portal';
import { Button, Modal } from 'react-daisyui';
import { useTheme } from '../../hooks/useTheme';
import { useRedoUndo } from '../../hooks/useRedoUndo';

interface Props {
	id: string;
}

export const ShapeBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [color, setColor] = useRedoUndo('#f3f4f6', `${id}-color`);
	const [shape, setShape] = useRedoUndo('oval', `${id}-shape`);
	const [showModal, setShowModal] = useState(false);
	const [appTheme] = useTheme();

	return (
		<>
			<ControlTemplate
				id={id}
				borderEditable={false}
				maskEditable={false}
				defaultHeight='120px'
				defaultWidth='120px'
				minHeight={'50px'}
				minWidth={'50px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconHexagon></IconHexagon>
									<p className='my-auto'>Shapes</p>
								</div>
							}
						>
							{/* Select Shape */}
							<div className='ml-2 flex flex-row gap-2'>
								<label className='my-auto text-xs'>Shape</label>
								<div
									onClick={() => setShowModal(true)}
									className='ml-2 h-16 w-20 cursor-pointer rounded-2xl bg-base-100 p-4 hover:bg-neutral'
								>
									<ShapeHandler
										color={appTheme === 'light' ? '#000000' : '#eeeeee'}
										type={shape}
									></ShapeHandler>
								</div>
							</div>

							<ColorPicker
								label='Color'
								isGradientEnable={false}
								color={color}
								onColorChange={(color) => setColor(color)}
							></ColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<ShapeHandler color={color} type={shape}></ShapeHandler>
			</ControlTemplate>

			{showModal && (
				<Portal>
					<Modal
						open={true}
						onClickBackdrop={() => {
							setShowModal(false);
						}}
						className='bg-base-200'
					>
						<Modal.Header className='font-bold dark:text-white'>
							<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
								Shapes
							</p>
						</Modal.Header>

						<Modal.Body className='flex flex-auto select-none flex-col overflow-hidden'>
							{/* Shapes List */}
							<div className='mt-2 flex max-h-64 flex-auto flex-col gap-4 overflow-y-auto'>
								<label className='text-gray-500'>Arrows</label>

								<div className='flex flex-auto flex-wrap gap-2'>
									<div
										onClick={() => setShape('arrow')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<ArrowSvg className='flex h-full w-full flex-auto dark:fill-white'></ArrowSvg>
									</div>

									<div
										onClick={() => setShape('arrow2')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<Arrow2Svg className='mx-auto flex h-full w-full flex-auto fill-black dark:fill-white'></Arrow2Svg>
									</div>

									<div
										onClick={() => setShape('arrow3')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<Arrow3Svg className='mx-auto flex h-full w-full flex-auto dark:fill-white'></Arrow3Svg>
									</div>

									<div
										onClick={() => setShape('arrow4')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<Arrow4Svg className='mx-auto flex h-full w-full flex-auto dark:fill-white'></Arrow4Svg>
									</div>

									<div
										onClick={() => setShape('arrow5')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<Arrow5Svg className='mx-auto flex h-full w-full flex-auto dark:fill-white'></Arrow5Svg>
									</div>

									<div
										onClick={() => setShape('arrow6')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<Arrow6Svg className='mx-auto flex h-full w-full flex-auto dark:fill-white'></Arrow6Svg>
									</div>
								</div>

								<label className='text-gray-500'>Forms</label>

								<div className='flex flex-auto flex-wrap gap-2'>
									<div
										onClick={() => setShape('oval')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<OvalSvg className='flex h-full w-full flex-auto dark:fill-white'></OvalSvg>
									</div>

									<div
										onClick={() => setShape('star')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<StarSvg className='flex h-full w-full flex-auto dark:fill-white'></StarSvg>
									</div>

									<div
										onClick={() => setShape('poligon')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<PoligonSvg className='flex h-full w-full flex-auto dark:fill-white'></PoligonSvg>
									</div>

									<div
										onClick={() => setShape('hexagon')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<IconHexagonFilled className='mx-auto flex h-full w-full flex-auto dark:fill-white'></IconHexagonFilled>
									</div>

									<div
										onClick={() => setShape('triangle')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<Trianglevg className='flex h-full w-full flex-auto dark:fill-white'></Trianglevg>
									</div>

									<div
										onClick={() => setShape('rectangle')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<RectangleSvg className='flex h-full w-full flex-auto dark:fill-white'></RectangleSvg>
									</div>

									<div
										onClick={() => setShape('heart')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200 dark:text-white'
									>
										<IconHeartFilled className='mx-auto flex h-full w-full flex-auto'></IconHeartFilled>
									</div>

									<div
										onClick={() => setShape('line')}
										className='flex h-12 w-9 flex-auto cursor-pointer rounded-xl bg-base-100 p-2 hover:bg-base-200'
									>
										<LineSvg className='flex h-full w-full flex-auto stroke-black dark:stroke-white'></LineSvg>
									</div>
								</div>
							</div>
						</Modal.Body>

						<Modal.Actions>
							<Button
								className='dark:text-white'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</Button>
						</Modal.Actions>
					</Modal>
				</Portal>
			)}
		</>
	);
};
export default ShapeBlock;
