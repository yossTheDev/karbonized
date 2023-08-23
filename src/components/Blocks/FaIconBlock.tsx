import React, { Suspense, useEffect, useId, useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { FaIcon } from '../FaIcon';
import { IconType } from '../../utils/FaIconList';
import { Button, Input, Modal } from 'react-daisyui';
import { Portal } from 'react-portal';
import { IconSearch, IconSticker } from '@tabler/icons-react';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { useControlState } from '../../hooks/useControlState';

interface Props {
	id: string;
}

const FaIconBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [icon, setIcon] = useControlState('FaFontAwesome', `${id}-icon`);
	const [iconColor, setIconColor] = useControlState(
		'#ffffff',
		`${id}-iconColor`,
	);
	const [query, setQuery] = useState('');
	const [showIconPicker, setShowIconPicker] = useState(false);
	const [faIcons, setFaIcons] = useState<IconType[]>();

	useEffect(() => {
		const getIconList = async () => {
			const icons = await import('../../utils/FaIconList');
			setFaIcons(icons.iconFaList);
		};

		getIconList();
	}, []);

	return (
		<>
			<ControlTemplate
				id={id}
				borderEditable={false}
				defaultHeight='120px'
				defaultWidth='120px'
				minHeight={'20px'}
				minWidth={'20px'}
				maxWidth={'800px'}
				maxHeight={'800px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row gap-2'>
									<IconSticker className='text-xl dark:text-gray-400'></IconSticker>
									<p className='my-auto'>Icon</p>
								</div>
							}
						>
							{/* Select Icon */}
							<div className='flex flex-auto flex-row'>
								<p className='my-auto text-xs'>Select Icon</p>
								<div
									className='ml-2 flex w-20 cursor-pointer rounded-2xl bg-base-100 p-4 hover:bg-neutral'
									onMouseDown={() => setShowIconPicker(true)}
								>
									<FaIcon
										className='mx-auto my-auto text-4xl'
										icon={icon}
									></FaIcon>
								</div>
							</div>

							{/* Icon Color */}
							<ColorPicker
								type='HexAlpha'
								label='Icon Color'
								color={iconColor}
								isGradientEnable={false}
								onColorChange={(color) => setIconColor(color)}
							></ColorPicker>

							{/* Text */}
						</CustomCollapse>
					</>
				}
			>
				<FaIcon
					className='flex max-h-full w-full max-w-full flex-auto select-none'
					style={{ color: iconColor }}
					icon={icon}
				></FaIcon>
			</ControlTemplate>

			{showIconPicker && (
				<Portal>
					<Modal.Legacy
						onClickBackdrop={() => {
							setShowIconPicker(false);
						}}
						open={true}
						className='bg-base-200'
					>
						<Modal.Header className='font-bold dark:text-white'>
							<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
								Select Icon
							</p>
						</Modal.Header>

						<Modal.Body className='flex flex-auto select-none flex-col overflow-hidden'>
							{/* Search */}
							<div className='flex flex-auto flex-row'>
								<IconSearch className='my-auto mr-2 dark:text-white'></IconSearch>
								<Input
									onChange={(ev) => setQuery(ev.currentTarget.value)}
									value={query}
									className='flex flex-auto text-gray-400'
								></Input>
							</div>

							{/* Licence */}
							<p className='my-2 text-xs text-gray-500'>
								Icons From{' '}
								<span>
									<a
										className='text-gray-400'
										href='https://fontawesome.com/'
										target={'_blank'}
									>
										Font Awesome
									</a>
								</span>
								<span> Licence:</span>
								<span>
									<a
										className='text-gray-400'
										href='https://creativecommons.org/licenses/by/4.0/'
										target={'_blank'}
									>
										{' '}
										CC BY 4.0 License
									</a>
								</span>
							</p>

							{/* Icon List */}
							<div className='mt-2 flex max-h-64 flex-auto flex-row flex-wrap gap-3 overflow-y-auto'>
								{faIcons
									?.filter(
										(icon) =>
											icon.label.toUpperCase().indexOf(query.toUpperCase()) >
											-1,
									)
									.map((el, i) => (
										<Suspense fallback={<></>}>
											<div
												className='inline-flex flex-auto cursor-pointer rounded-xl bg-base-100 p-2 text-3xl hover:bg-base-200 dark:text-gray-400'
												onMouseDown={() => {
													setIcon(el.label);
													setShowIconPicker(false);
												}}
											>
												<div className='mx-auto my-auto'>
													<FaIcon icon={el.label}></FaIcon>
												</div>
											</div>
										</Suspense>
									))}
							</div>
						</Modal.Body>

						<Modal.Actions>
							<Button
								color='neutral'
								className='dark:text-white'
								onClick={() => setShowIconPicker(false)}
							>
								Cancel
							</Button>
						</Modal.Actions>
					</Modal.Legacy>
				</Portal>
			)}
		</>
	);
};

export default FaIconBlock;
