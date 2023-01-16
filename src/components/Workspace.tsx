import React, { RefObject } from 'react';
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
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	return (
		<div className='mx-auto my-auto'>
			<TransformWrapper disabled centerOnInit>
				<TransformComponent>
					<div
						style={{
							backgroundColor: workspaceColor,
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className={``}
						ref={reference}
					>
						{controls.map((el, i) => (
							<ControlHandler key={i} type={el.type}></ControlHandler>
						))}
					</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	);
};
