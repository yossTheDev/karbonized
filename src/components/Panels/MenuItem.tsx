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
	IconPuzzle,
	IconQrcode,
	IconSticker,
} from '@tabler/icons-react';
import React, { useEffect } from 'react';
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
	const setCurrentControlID = useStoreActions(
		(state) => state.setcurrentControlID,
	);
	const setWorkspaceControls = useStoreActions(
		(state) => state.setWorkspaceControls,
	);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	useEffect(() => {
		if (controlID === id && !isVisible) {
			setCurrentControlID('');
		}
	}, [controlID, isVisible]);

	return (
		<>
			<button
				onMouseDown={() => {
					if (isVisible) setCurrentControlID(id);
				}}
				className={`btn z-50 list-none rounded-2xl hover:bg-base-300/90 dark:text-gray-400 ${
					!isDragged && 'hover:cursor-pointer'
				} ${isDragged && 'cursor-grabbing'} ${
					controlID === id && 'bg-base-300'
				}`}
				{...props}
			>
				<MenuIcon type={type}></MenuIcon>
				<p
					className={`${isDragged && 'cursor-grabbing'} ${
						!isDragged && 'hover:cursor-pointer'
					}`}
				>
					{name}
				</p>

				{/* Set Visibility */}
				<div
					onMouseDown={() => {
						setWorkspaceControls(
							currentWorkspace.controls.map((item) =>
								item.id === id ? { ...item, isVisible: !item.isVisible } : item,
							),
						);
					}}
					className='btn btn-circle btn-ghost btn-xs pointer-events-auto ml-auto'
				>
					{isVisible ? (
						<IconEye size={16}></IconEye>
					) : (
						<IconEyeClosed size={16}></IconEyeClosed>
					)}
				</div>
			</button>
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

		case 'custom':
			return <IconPuzzle className='my-auto' size={18}></IconPuzzle>;
		default:
			return <></>;
	}
};
