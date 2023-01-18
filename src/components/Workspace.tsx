import React, { RefObject, useEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { ControlHandler } from './Blocks/ControlHandler';
import './Workspace.css';
import Moveable, { OnDrag, OnResize, OnScale, OnRotate } from 'react-moveable';
import Ruler from '@scena/react-ruler';

interface Props {
	reference: RefObject<HTMLDivElement>;
}
export const Workspace: React.FC<Props> = ({ reference }) => {
	// App Store

	const controls = useStoreState((state) => state.ControlsTree);
	const workspaceColor = useStoreState((state) => state.workspaceColor);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	useEffect(() => {}, []);

	return (
		<>
			<div className='top-44 left-48'>
				<div
					ref={reference}
					id='workspace'
					style={{
						backgroundColor: workspaceColor,
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className={``}
				>
					{controls.map((el, i) => (
						<ControlHandler
							id={i.toString()}
							key={i}
							type={el.type}
						></ControlHandler>
					))}
				</div>
			</div>
		</>
	);
};
