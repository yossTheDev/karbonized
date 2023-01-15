import { Capacitor } from '@capacitor/core';
import React, { RefObject } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useStoreState } from '../stores/Hooks';
import { ControlHandler } from './Blocks/ControlHandler';

interface Props {
	reference: RefObject<HTMLDivElement>;
}
export const Workspace: React.FC<Props> = ({ reference }) => {
	// App Store
	const controls = useStoreState((state) => state.ControlsTree);
	return (
		<>
			<TransformWrapper disabled centerOnInit>
				<TransformComponent>
					<div
						style={{
							width: Capacitor.getPlatform() === 'android' ? '400px' : '700px',
							height: '450px',
						}}
						className={`bg-gradient-to-br from-blue-300  to-blue-500 `}
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
