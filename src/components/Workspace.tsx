import { Capacitor } from '@capacitor/core';
import { IconPalette } from '@tabler/icons';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Portal } from 'react-portal';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useStoreState } from '../stores/Hooks';
import { ControlHandler } from './Blocks/ControlHandler';
import './Workspace.css';

interface Props {
	reference: RefObject<HTMLDivElement>;
}
export const Workspace: React.FC<Props> = ({ reference }) => {
	// App Store
	const controls = useStoreState((state) => state.ControlsTree);
	const workspaceColor = useStoreState((state) => state.workspaceColor);

	return (
		<>
			<TransformWrapper disabled centerOnInit>
				<TransformComponent>
					<div
						className={`bg-gradient-to-br from-blue-300  to-blue-500 workspace lg:workspace`}
						ref={reference}
					>
						{controls.map((el, i) => (
							<ControlHandler key={i} type={el.type}></ControlHandler>
						))}
					</div>
				</TransformComponent>
			</TransformWrapper>
		</>
	);
};
