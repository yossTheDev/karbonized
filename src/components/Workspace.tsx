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

	return (
		<>
			<TransformWrapper disabled centerOnInit>
				<TransformComponent>
					<div
						style={{ backgroundColor: workspaceColor }}
						className={`workspace lg:workspace`}
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
