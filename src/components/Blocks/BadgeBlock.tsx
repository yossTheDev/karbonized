import React from 'react';
import { FileInput, Input } from 'react-daisyui';
import karbonized from '../../assets/karbonized.svg';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';

interface Props {
	id: string;
}

export const BadgeBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [src, setSrc] = useControlState(karbonized, `${id}-src`);
	const [text, setText] = useControlState('@karbonized_app', `${id}-text`);
	const [color, setColor] = useControlState('#ffffff', `${id}-color`);

	return (
		<>
			<ControlTemplate
				id={id}
				borderEditable={false}
				defaultHeight='45px'
				defaultWidth='85px'
				minHeight={'80px'}
				minWidth={'270px'}
				maxWidth={'270px'}
				maxHeight={'80px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row gap-2'>
									<div className='my-auto h-2 w-4 rounded-full border-2 border-base-content'></div>
									<p className='my-auto'>Badge</p>
								</div>
							}
						>
							{/*  Badge Color */}
							<>
								<ColorPicker
									isGradientEnable={false}
									color={color}
									onColorChange={setColor}
									label='Badge Color'
								></ColorPicker>
							</>

							{/*  Badge Text */}
							<>
								<p className='my-auto'>Text</p>

								<Input
									className='ml-2 flex flex-auto'
									onChange={(ev) => setText(ev.target.value)}
									value={text}
								></Input>
							</>

							{/* Image */}
							<>
								<p>Image</p>
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
						</CustomCollapse>
					</>
				}
			>
				<div
					style={{ background: color, border: color }}
					className='flex h-full w-full flex-auto overflow-hidden rounded-full border-none p-3'
				>
					<div className='my-auto flex flex-auto gap-1'>
						<img
							className='my-auto h-12 w-12 rounded-full bg-white'
							src={src}
						></img>
						<p className='my-auto flex w-2/3 text-xl font-bold'>{text}</p>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};

export default BadgeBlock;
