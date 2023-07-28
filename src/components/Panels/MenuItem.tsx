import React, { useEffect } from 'react';
import {
	IconAppWindow,
	IconBrandTwitter,
	IconCircle,
	IconCode,
	IconDeviceMobile,
	IconEye,
	IconEyeClosed,
	IconLetterT,
	IconPhoto,
	IconQrcode,
	IconSticker,
} from '@tabler/icons-react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';

export interface Item {
	id: string;
	type: string;
	name: string;
	isSelectable: boolean;
	isDeleted: boolean;
	isDragged: boolean;
	isVisible: boolean;
	props: any;
}

export const MenuItem: React.FC<Item> = ({
	id,
	isVisible,
	isDragged,
	name,
	type,
	props,
}) => {
	const controlID = useStoreState((state) => state.currentControlID);
	const ControlsTree = useStoreState((state) => state.ControlsTree);

	const setCurrentControlID = useStoreActions(
		(state) => state.setcurrentControlID,
	);
	const setControls = useStoreActions((state) => state.setControls);
	const setWorkspaceControls = useStoreActions(
		(state) => state.setWorkspaceControls,
	);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	useEffect(() => {
		if (controlID === id && !isVisible) {
			setCurrentControlID('');
		}
	}, [ControlsTree]);

	return (
		<>
			<div
				onMouseDown={() => {
					if (isVisible) setCurrentControlID(id);
				}}
				className={`z-50 list-none rounded-xl p-3 hover:bg-base-100/90 dark:text-gray-400 ${
					!isDragged && 'hover:cursor-pointer'
				} ${isDragged && 'cursor-grabbing'} ${
					controlID === id && 'bg-base-100/70'
				}`}
				{...props}
			>
				<div className='pointer-events-none flex flex-row gap-2'>
					<MenuIcon type={type}></MenuIcon>
					<p
						className={`${isDragged && 'cursor-grabbing'} ${
							!isDragged && 'hover:cursor-pointer'
						}`}
					>
						{name}
					</p>

					<div></div>

					<div
						onMouseDown={() => {
							setWorkspaceControls(
								currentWorkspace.controls.map((item) =>
									item.id === id
										? { ...item, isVisible: !item.isVisible }
										: item,
								),
							);
						}}
						className='pointer-events-auto my-auto ml-auto rounded p-1 hover:bg-base-200'
					>
						{isVisible ? (
							<IconEye size={16}></IconEye>
						) : (
							<IconEyeClosed size={16}></IconEyeClosed>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const MenuIcon: React.FC<{ type: string }> = ({ type }) => {
	// Store Actions
	switch (type) {
		case 'code':
			return <IconCode className='my-auto' size={18}></IconCode>;
		case 'text':
			return <IconLetterT className='my-auto' size={18}></IconLetterT>;
		case 'qr':
			return <IconQrcode className='my-auto' size={18}></IconQrcode>;
		case 'image':
			return <IconPhoto className='my-auto' size={18}></IconPhoto>;
		case 'window':
			return <IconAppWindow className='my-auto' size={18}></IconAppWindow>;
		case 'avatar':
			return <></>;

		case 'shape':
			return <IconCircle className='my-auto' size={18}></IconCircle>;
		case 'phone_mockup':
			return (
				<IconDeviceMobile className='my-auto' size={18}></IconDeviceMobile>
			);
		case 'icon':
			return <IconSticker className='my-auto' size={18}></IconSticker>;

		case 'tweet':
			return (
				<IconBrandTwitter className='my-auto' size={18}></IconBrandTwitter>
			);

		case 'badge':
			return (
				<div className='my-auto h-2  w-4 rounded-full border-2 border-black dark:border-gray-400'></div>
			);
		default:
			return <></>;
	}
};
