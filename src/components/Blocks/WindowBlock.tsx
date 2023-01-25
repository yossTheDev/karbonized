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
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { FileInput, Input, Select } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/image-example.png';
import { CloseSvg, MiniminizeSvg } from '../General/Icons';
import { ColorPicker } from '../CustomControls/ColorPicker';

export const WindowBlock: React.FC = () => {
	/* Component States */
	const [title, setTitle] = useState('Karbonized');
	const [url, setUrl] = useState('karbonized.onrender.com');
	const [color, setColor] = useState('#ffffff');
	const [controlsColor, setControlsColor] = useState('#0e111b');

	const [windowStyle, setWindowStyle] = useState('mac');
	const [windowType, setWindowType] = useState('browser');

	const [src, setSrc] = useState(karbonized);

	return (
		<>
			<ControlTemplate
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
								<div className='flex flex-row m-2 gap-2'>
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
									onChange={(e) => setWindowStyle(e)}
								>
									<option value={'mac'}>mac</option>
									<option value={'window'}>window</option>
								</Select>

								<p className='text-xs'>Window Type</p>
								<Select
									defaultValue={'normal'}
									tabIndex={0}
									value={windowType}
									onChange={(e) => setWindowType(e)}
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
					<div className='flex flex-auto max-h-12 p-1'>
						<div className='my-auto flex flex-row flex-auto '>
							<div className='flex flex-auto flex-row text-gray-600 my-auto w-1/3  '>
								{windowStyle === 'window' && (
									<>
										{windowType === 'normal' ? (
											<p
												style={{ color: controlsColor }}
												className='text-left my-auto ml-2'
											>
												{title}
											</p>
										) : (
											<div className='flex flex-auto flex-row'>
												<IconBrandChrome
													className='my-auto mx-2'
													size={15}
												></IconBrandChrome>
												<div className='p-2 bg-slate-500/10  rounded flex flex-row gap-1'>
													<IconFile size={15}></IconFile>
													<p className='text-xs my-auto'>{title}</p>
												</div>
											</div>
										)}
									</>
								)}

								{windowStyle === 'mac' && (
									<>
										<div className='flex flex-auto flex-row gap-1 p-1'>
											<div className='p-1 w-4  h-4 rounded-full bg-red-500 my-auto'></div>
											<div className='p-1 w-4  h-4 rounded-full bg-yellow-300 my-auto'></div>
											<div className='p-1 w-4  h-4 rounded-full  bg-green-500 my-auto'></div>

											{/* Browser Buttons Mac*/}
											{windowType === 'browser' && (
												<div className='flex  flex-row my-auto gap-1 ml-2'>
													<div className='bg-slate-500/20 p-1 rounded'>
														<IconChevronLeft size={15}></IconChevronLeft>
													</div>

													<div className='bg-slate-500/20 p-1 rounded'>
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
								className='text-gray-600 select-none flex flex-auto flex-row w-1/3 my-auto'
							>
								{windowStyle === 'mac' && windowType === 'normal' && (
									<p
										style={{ color: controlsColor }}
										className='text-center mx-auto my-auto'
									>
										{title}
									</p>
								)}

								{windowStyle === 'mac' && windowType === 'browser' && (
									<>
										<div className='bg-slate-500/20 flex flex-auto flex-row my-auto w-full rounded-full p-1 mx-auto  max-h-6 overflow-hidden'>
											<IconSearch className='ml-1' size={15}></IconSearch>
											<p className='text-xs my-auto ml-2 max-w-fit w-56 max-h-6 h-6 overflow-hidden '>
												{url}
											</p>
										</div>
									</>
								)}
							</div>

							{windowStyle === 'mac' ? (
								<div className='flex flex-row flex-auto w-1/3'></div>
							) : (
								<div className='flex flex-row flex-auto w-1/3 my-auto mr-2'>
									<MiniminizeSvg
										style={{ fill: controlsColor }}
										className='h-4 w-4 ml-auto'
									></MiniminizeSvg>
									<CloseSvg
										style={{ fill: controlsColor }}
										className='h-4 w-4  ml-2'
									></CloseSvg>
								</div>
							)}
						</div>
					</div>

					{windowStyle === 'window' && windowType === 'browser' && (
						<div className='flex flex-auto flex-row gap-2'>
							{/* Browser Controls */}
							<div
								className='flex  gap-1 ml-2 my-auto p-1'
								style={{ color: controlsColor }}
							>
								<IconArrowLeft size={14}></IconArrowLeft>
								<IconArrowRight size={14}></IconArrowRight>
								<IconReload size={14}></IconReload>
							</div>

							{/* Search Bar  */}
							<div
								className='flex flex-auto flex-row bg-slate-500/20 p-1 rounded m-1'
								style={{ color: controlsColor }}
							>
								<IconSearch className='my-auto' size={14}></IconSearch>
								<p className='my-auto text-xs ml-2'>{url}</p>
								<IconStar className='ml-auto my-auto' size={14}></IconStar>
							</div>
						</div>
					)}

					{/* Content */}
					<div className='flex flex-auto'>
						<img
							className='flex flex-auto h-full w-full aspect-auto'
							src={src}
						></img>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};
