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
import { toPng } from 'html-to-image';
import React, { useEffect, useState } from 'react';
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
	const controlProperties = useStoreState((state) => state.ControlProperties);
	const [src, setSrc] = useState('');

	useEffect(() => {
		const item = document.getElementById('control-' + id);

		if (item !== null && isVisible)
			toPng(item, {
				cacheBust: true,
			})
				.then((dataUrl) => {
					setSrc(dataUrl);
				})
				.catch((err) => {
					console.log(err);
				});
	}, [currentWorkspace, controlProperties]);

	useEffect(() => {
		if (controlID === id && !isVisible) {
			setCurrentControlID('');
		}
	}, [controlID, isVisible]);

	return (
		<>
			<div
				onMouseDown={() => {
					if (isVisible) setCurrentControlID(id);
				}}
				className={`z-50 flex list-none items-center gap-2 rounded-xl px-4 py-2 hover:bg-muted text-muted-foreground ${
					!isDragged && 'hover:cursor-pointer'
				} ${isDragged && 'cursor-grabbing'} ${
					controlID === id && 'bg-muted'
				}`}
				{...props}
			>
				<MenuIcon type={type}></MenuIcon>

				{/* Image */}
				<div className='flex h-12 w-12 items-center justify-center rounded bg-muted border px-3 py-2 shadow'>
					{src !== 'data:,' && <img src={src}></img>}
				</div>

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
						if (currentWorkspace !== undefined)
							setWorkspaceControls(
								currentWorkspace.controls.map((item) =>
									item.id === id
										? { ...item, isVisible: !item.isVisible }
										: item,
								),
							);
					}}
					className='pointer-events-auto ml-auto rounded p-2 hover:bg-muted'
				>
					{isVisible ? (
						<IconEye size={16}></IconEye>
					) : (
						<IconEyeClosed size={16}></IconEyeClosed>
					)}
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
				<div className='my-auto h-2  w-4 rounded-full border-2 border-border'></div>
			);

		case 'custom':
			return <IconPuzzle className='my-auto' size={18}></IconPuzzle>;
		default:
			return <></>;
	}
};
