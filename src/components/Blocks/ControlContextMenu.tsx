import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
} from '@/components/ui/context-menu';
import { ContextMenuSub } from '@radix-ui/react-context-menu';
import { IconEye } from '@tabler/icons-react';
import { Slider } from '@/components/ui/slider';
import React, { type ReactNode } from 'react';

interface ControlContextMenuProps {
	opacity: number;
	setOpacity: (value: number) => void;
	exportAsPng: () => Promise<void>;
	exportAsJpeg: () => Promise<void>;
	exportAsSvg: () => Promise<void>;
	onCreateDynamicBackground?: () => Promise<void> | void;
	contextMenu?: ReactNode;
	setID: (value: string) => void;
	removeControl: () => void;
	children: ReactNode;
}

export const ControlContextMenu: React.FC<ControlContextMenuProps> = ({
	opacity,
	setOpacity,
	exportAsPng,
	exportAsJpeg,
	exportAsSvg,
	onCreateDynamicBackground,
	contextMenu,
	setID,
	removeControl,
	children,
}) => {
	return (
		<ContextMenu>
			{children}
			<ContextMenuContent className='bg-popover'>
				<div className='flex gap-2 px-1 py-2'>
					<IconEye className='my-auto ml-2' size={22}></IconEye>
					<Slider
						color='primary'
						className='my-auto'
						min={0}
						max={100}
						onValueChange={(value) => {
							setOpacity(value[0]);
						}}
						value={[opacity]}
					></Slider>
				</div>

				<ContextMenuSub>
					<ContextMenuSubTrigger>Export as</ContextMenuSubTrigger>
					<ContextMenuSubContent className='w-48'>
						<ContextMenuItem
							onClick={async () => {
								await exportAsPng();
							}}
						>
							Export as PNG
						</ContextMenuItem>
						<ContextMenuItem
							onClick={async () => {
								await exportAsJpeg();
							}}
						>
							Export as JPEG
						</ContextMenuItem>
						<ContextMenuItem
							onClick={async () => {
								await exportAsSvg();
							}}
						>
							Export as SVG
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>

				{onCreateDynamicBackground !== undefined && (
					<>
						<ContextMenuSeparator></ContextMenuSeparator>
						<ContextMenuItem
							onClick={async () => {
								await onCreateDynamicBackground();
							}}
						>
							Create Dynamic Background
						</ContextMenuItem>
					</>
				)}

				{contextMenu !== undefined && (
					<>
						<ContextMenuSeparator></ContextMenuSeparator>
						{contextMenu}
					</>
				)}

				<ContextMenuSeparator></ContextMenuSeparator>

				<ContextMenuItem
					onClick={() => {
						setID('');
						removeControl();
					}}
				>
					Delete Layer
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
