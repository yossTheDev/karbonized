import React, { useEffect, useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { FaIcon } from '../FaIcon';
import { IconType } from '../../utils/FaIconList';
import { Button, Input, Modal } from 'react-daisyui';
import { Portal } from 'react-portal';
import { IconSearch, IconSticker } from '@tabler/icons';
import { NumberInput } from '../CustomControls/NumberInput';
import { ColorPicker } from '../CustomControls/ColorPicker';

const FaIconBlock: React.FC = () => {
	/* Component States */
	const [icon, setIcon] = useState('FaFontAwesome');
	const [iconColor, setIconColor] = useState('#ffffff');
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
				borderEditable={false}
				shadowEditable={false}
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
								<div className='flex flex-row m-2 gap-2'>
									<IconSticker className='dark:text-gray-400 text-xl'></IconSticker>
									<p className='my-auto'>Icon</p>
								</div>
							}
						>
							{/* Select Icon */}
							<div className='flex flex-row flex-auto'>
								<p className='text-xs my-auto'>Select Icon</p>
								<div
									className='flex ml-2 bg-base-100 hover:bg-base-200 cursor-pointer rounded p-4 w-22'
									onMouseDown={() => setShowIconPicker(true)}
								>
									<FaIcon
										className='text-4xl my-auto mx-auto'
										icon={icon}
									></FaIcon>
								</div>
							</div>

							{/* Icon Color */}
							<ColorPicker
								type='HexAlpha'
								label='Icon Color'
								color={iconColor}
								onColorChange={(color) => setIconColor(color)}
							></ColorPicker>

							{/* Text */}
						</CustomCollapse>
					</>
				}
			>
				<FaIcon
					className='flex flex-auto max-w-full max-h-full select-none w-full'
					style={{ color: iconColor }}
					icon={icon}
				></FaIcon>
			</ControlTemplate>

			{showIconPicker && (
				<Portal>
					<Modal
						open={true}
						onClickBackdrop={() => {
							setShowIconPicker(false);
						}}
						className='bg-base-200'
					>
						<Modal.Header className='font-bold dark:text-white'>
							<p className='text-center md:text-left md:text-xl text-2xl poppins-font-family'>
								Select Icon
							</p>
						</Modal.Header>

						<Modal.Body className='select-none overflow-hidden flex flex-auto flex-col'>
							{/* Search */}
							<div className='flex flex-auto flex-row'>
								<IconSearch className='dark:text-white my-auto mr-2'></IconSearch>
								<Input
									onChange={(ev) => setQuery(ev.currentTarget.value)}
									value={query}
									className='flex flex-auto text-gray-400'
								></Input>
							</div>

							{/* Licence */}
							<p className='text-xs text-gray-500 my-2'>
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
							<div className='flex flex-auto flex-row flex-wrap gap-3 overflow-y-auto mt-2 max-h-64'>
								{faIcons
									?.filter(
										(icon) =>
											icon.label.toUpperCase().indexOf(query.toUpperCase()) > -1
									)
									.map((el, i) => (
										<div
											className='inline-flex flex-auto cursor-pointer dark:text-gray-400 text-3xl p-2 rounded bg-base-100 hover:bg-base-200'
											onMouseDown={() => setIcon(el.label)}
										>
											<div className='mx-auto my-auto'>
												<FaIcon icon={el.label}></FaIcon>
											</div>
										</div>
									))}
							</div>
						</Modal.Body>

						<Modal.Actions>
							<Button
								className='dark:text-white'
								onClick={() => setShowIconPicker(false)}
							>
								OK
							</Button>
						</Modal.Actions>
					</Modal>
				</Portal>
			)}
		</>
	);
};

export default FaIconBlock;
