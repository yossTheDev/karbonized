import {
	IconAppWindow,
	IconArrowLeft,
	IconArrowRight,
	IconBrandChrome,
	IconChevronLeft,
	IconChevronRight,
	IconFile,
	IconReload,
	IconSearch,
	IconStar,
	IconX,
} from '@tabler/icons-react';
import React from 'react';
import { FileInput, Input, Select } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/logo.svg';
import { CloseSvg, MinimizeSvg } from '../Misc/Icons';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { useControlState } from '../../hooks/useControlState';

interface Props {
	id: string;
}

export const WindowBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [title, setTitle] = useControlState('Karbonized', `${id}-title`);
	const [url, setUrl] = useControlState('karbonized.onrender.com', `${id}-url`);
	const [color, setColor] = useControlState('#ffffff', `${id}-color`);
	const [controlsColor, setControlsColor] = useControlState(
		'#0e111b',
		`${id}-controlsColor`,
	);

	const [windowStyle, setWindowStyle] = useControlState(
		'mac',
		`${id}-windowStyle`,
	);
	const [windowType, setWindowType] = useControlState(
		'browser',
		`${id}-windowType`,
	);

	const [src, setSrc] = useControlState(karbonized, `${id}-src`);

	return (
		<>
			<ControlTemplate
				id={id}
				minWidth='400px'
				minHeight='200px'
				maxWidth='3000px'
				maxHeight='2000px'
				border={6}
				defaultHeight={'200px'}
				defaultWidth={'400px'}
				color={color}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconAppWindow></IconAppWindow>
									<p className='my-auto'>Window</p>
								</div>
							}
						>
							<>
								<p className='text-xs'>Window Style</p>
								<Select
									defaultValue={'mac'}
									tabIndex={0}
									value={windowStyle}
									onChange={(e) => setWindowStyle(e.currentTarget.value)}
								>
									<option value={'mac'}>mac</option>
									<option value={'window'}>window</option>
								</Select>

								<p className='text-xs'>Window Type</p>
								<Select
									defaultValue={'normal'}
									tabIndex={0}
									value={windowType}
									onChange={(e) => setWindowType(e.currentTarget.value)}
								>
									<option value={'normal'}>normal</option>
									<option value={'browser'}>browser</option>
								</Select>
							</>
							{/* Title */}
							<>
								<p className='text-xs'>Title</p>
								<Input
									spellCheck={false}
									onChange={(ev) => setTitle(ev.target.value)}
									value={title}
									className='flex flex-auto'
								></Input>
							</>

							{/* Url */}
							{windowType === 'browser' && (
								<>
									<p className='text-xs'>Url</p>
									<Input
										spellCheck={false}
										onChange={(ev) => setUrl(ev.target.value)}
										value={url}
										className='flex flex-auto'
									></Input>
								</>
							)}

							<>
								{/* Source */}
								<p className='text-xs'>Source</p>
								<FileInput
									accept='image/*'
									onChange={(e) => {
										if (e.target.files && e.target.files.length > 0) {
											const reader = new FileReader();
											reader.addEventListener('load', () => {
												setSrc(reader.result?.toString() || '');
											});
											reader.readAsDataURL(e.target.files[0]);
										}
									}}
								></FileInput>
							</>

							{/* Colors */}
							<p className='text-xs'>Colors</p>
							<>
								<ColorPicker
									color={color}
									onColorChange={setColor}
									isGradientEnable={false}
									label='Window Color'
								></ColorPicker>

								<ColorPicker
									color={controlsColor}
									onColorChange={setControlsColor}
									isGradientEnable={false}
									label='Controls Color'
								></ColorPicker>
							</>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex flex-auto flex-col overflow-hidden rounded'>
					{/* Title */}
					<div className='flex max-h-12 flex-auto p-1'>
						<div className='my-auto flex flex-auto flex-row '>
							<div className='my-auto flex w-1/3 flex-auto flex-row text-gray-600  '>
								{windowStyle === 'window' && (
									<>
										{windowType === 'normal' ? (
											<p
												style={{ color: controlsColor }}
												className='my-auto ml-2 text-left'
											>
												{title}
											</p>
										) : (
											<div className='flex flex-auto flex-row'>
												<IconBrandChrome
													className='mx-2 my-auto'
													size={15}
												></IconBrandChrome>
												<div className='flex flex-row  gap-1 rounded bg-slate-500/10 p-2'>
													<IconFile className='my-auto' size={15}></IconFile>
													<p className='my-auto text-xs'>{title}</p>
													<IconX className='my-auto' size={15}></IconX>
												</div>
											</div>
										)}
									</>
								)}

								{windowStyle === 'mac' && (
									<>
										<div className='flex flex-auto flex-row gap-1 p-1'>
											<div className='my-auto h-4  w-4 rounded-full bg-red-500 p-1'></div>
											<div className='my-auto h-4  w-4 rounded-full bg-yellow-300 p-1'></div>
											<div className='my-auto h-4  w-4 rounded-full  bg-green-500 p-1'></div>

											{/* Browser Buttons Mac*/}
											{windowType === 'browser' && (
												<div className='my-auto  ml-2 flex flex-row gap-1'>
													<div className='rounded bg-slate-500/20 p-1'>
														<IconChevronLeft size={15}></IconChevronLeft>
													</div>

													<div className='rounded bg-slate-500/20 p-1'>
														<IconChevronRight size={15}></IconChevronRight>
													</div>
												</div>
											)}
										</div>
									</>
								)}
							</div>

							<div
								spellCheck={false}
								className='my-auto flex w-1/3 flex-auto select-none flex-row text-gray-600'
							>
								{windowStyle === 'mac' && windowType === 'normal' && (
									<p
										style={{ color: controlsColor }}
										className='mx-auto my-auto text-center'
									>
										{title}
									</p>
								)}

								{windowStyle === 'mac' && windowType === 'browser' && (
									<>
										<div className='mx-auto my-auto flex max-h-6 w-full flex-auto flex-row overflow-hidden rounded-full  bg-slate-500/20 p-1'>
											<IconSearch className='ml-1' size={15}></IconSearch>
											<p className='my-auto ml-2 h-6 max-h-6 w-56 max-w-fit overflow-hidden text-xs '>
												{url}
											</p>
										</div>
									</>
								)}
							</div>

							{windowStyle === 'mac' ? (
								<div className='flex w-1/3 flex-auto flex-row'></div>
							) : (
								<div className='my-auto mr-2 flex w-1/3 flex-auto flex-row'>
									<MinimizeSvg
										style={{ fill: controlsColor }}
										className='ml-auto h-4 w-4'
									></MinimizeSvg>
									<CloseSvg
										style={{ fill: controlsColor }}
										className='ml-2 h-4  w-4'
									></CloseSvg>
								</div>
							)}
						</div>
					</div>

					{windowStyle === 'window' && windowType === 'browser' && (
						<div className='flex max-h-10 flex-auto flex-row gap-2'>
							{/* Browser Controls */}
							<div
								className='my-auto  ml-2 flex gap-1 p-1'
								style={{ color: controlsColor }}
							>
								<IconArrowLeft size={14}></IconArrowLeft>
								<IconArrowRight size={14}></IconArrowRight>
								<IconReload size={14}></IconReload>
							</div>

							{/* Search Bar  */}
							<div
								className='m-1 flex flex-auto flex-row rounded bg-slate-500/20 p-1'
								style={{ color: controlsColor }}
							>
								<IconSearch className='my-auto ml-1' size={14}></IconSearch>
								<p className='my-auto ml-2 text-xs'>{url}</p>
								<IconStar className='my-auto ml-auto mr-1' size={14}></IconStar>
							</div>
						</div>
					)}

					{/* Content */}
					<div className='flex flex-auto'>
						<img
							className='flex aspect-auto h-full w-full flex-auto'
							src={src}
						></img>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};
export default WindowBlock;
