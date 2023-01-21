import React, { createElement, useEffect, useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { IconType as Icon } from 'react-icons';
import { FaIcon } from '../FaIcon';
import { FaFontAwesome, FaFontAwesomeAlt } from 'react-icons/fa';
import { IconType } from '../../utils/FaIconList';
import { Button, Input, Modal } from 'react-daisyui';
import { Portal } from 'react-portal';
import { IconSearch } from '@tabler/icons';
import { NumberInput } from '../CustomControls/NumberInput';
import { ColorPicker } from '../CustomControls/ColorPicker';

export const FaIconBlock: React.FC = () => {
	/* Component States */
	const [icon, setIcon] = useState('FaFontAwesome');
	const [iconSize, setIconSize] = useState(120);
	const [iconColor, setIconColor] = useState('#ffffff');
	const [query, setQuery] = useState('');
	const [showIconPicker, setShowIconPicker] = useState(false);
	const [faIcons, setFaIcons] = useState<IconType[]>();

	useEffect(() => {
		const getIcon = async () => {
			const icons = await import('../../utils/FaIconList');
			//setIcon(faFontIcon.FaFontAwesome);

			function findIcon(): IconType {
				const iconSelected = icons.iconFaList.find((i) => i.label === icon);
				return iconSelected ? iconSelected : icons.iconFaList[0];
			}
		};

		getIcon();
	}, [icon]);

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
				minWidth={'50px'}
				maxWidth={'500px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<FaFontAwesomeAlt className='dark:text-white text-xl'></FaFontAwesomeAlt>
									<p className='my-auto'>Font Awesome Icon</p>
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

							{/* Icon Size */}
							<div className='flex flex-auto flex-row'>
								<p className='text-xs my-auto'>Icon Size</p>
								<NumberInput
									onChange={(num) => setIconSize(num)}
									number={iconSize}
								></NumberInput>
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
					className='flex flex-auto'
					style={{ fontSize: iconSize + 'px', color: iconColor }}
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

						<Modal.Body className='select-none overflow-y-scroll flex flex-auto flex-col'>
							<div className='flex flex-auto flex-row'>
								<IconSearch className='dark:text-white my-auto mr-2'></IconSearch>
								<Input
									onChange={(ev) => setQuery(ev.currentTarget.value)}
									value={query}
									className='flex flex-auto text-gray-400'
								></Input>
							</div>
							<div className='flex flex-auto flex-row flex-wrap gap-3 overflow-y-auto mt-2'>
								{faIcons
									?.filter(
										(icon) =>
											icon.label.toUpperCase().indexOf(query.toUpperCase()) > -1
									)
									.map((el, i) => (
										<div
											className='inline-flex flex-auto cursor-pointer text-gray-400 text-3xl p-2 rounded bg-base-100 hover:bg-base-200'
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
