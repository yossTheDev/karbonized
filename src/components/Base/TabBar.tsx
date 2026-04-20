import React, { useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { IconSquareRotated, IconX } from '@tabler/icons-react';
import { Scrollbars } from 'react-custom-scrollbars-2';

export const TabBar: React.FC = () => {
	const workspaces = useStoreState((state) => state.workspaces);

	const currentWorkspaceID = useStoreState((state) => state.currentWorkspaceID);

	const deleteWorkspace = useStoreActions((state) => state.deleteWorkspace);
	const setCurrentWorkspace = useStoreActions(
		(state) => state.setCurrentWorkspace,
	);

	const ref = useRef<Scrollbars>(null);

	useEffect(() => {
		ref.current?.scrollToRight();
	}, [workspaces]);

	return (
		<Scrollbars
			ref={ref}
			autoHeight
			autoHide
			style={{ width: '100%' }}
			renderThumbHorizontal={(props) => (
				<div {...props} className='rounded bg-base-100/75 p-1' />
			)}
			onWheel={(event: any) => {
				const delta = Math.max(
					-1,
					Math.min(
						1,
						event.nativeEvent.wheelDelta || -event.nativeEvent.detail,
					),
				);

				ref.current?.scrollLeft(ref.current.getScrollLeft() - delta * 20);
				event.preventDefault();
			}}
		>
			<div className='flex w-[70%] p-1 gap-2'>
				{workspaces.map((item) => (
					<button
						key={item.id}
						id={item.id}
						onClick={() => {
							setCurrentWorkspace(item.id);
						}}
						className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 ${
							currentWorkspaceID === item.id
								? 'bg-card shadow-lg shadow-black/10 ring-1 ring-border'
								: 'bg-muted/50 hover:bg-muted hover:shadow-md'
						}`}
					>
						<IconSquareRotated
							className='text-foreground/70'
							size={16}
						></IconSquareRotated>
						<label className='select-none text-clip whitespace-nowrap text-xs font-medium text-foreground hover:cursor-pointer'>
							{item.workspaceName}
						</label>

						<div
							onClick={(ev) => {
								ev.stopPropagation();
								deleteWorkspace(item.id);
							}}
							className='ml-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100'
						>
							<IconX size={14}></IconX>
						</div>
					</button>
				))}
			</div>
		</Scrollbars>
	);
};

export default TabBar;
