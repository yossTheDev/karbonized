import React, { useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { IconPlus, IconSquareRotated, IconX } from '@tabler/icons-react';
import { Scrollbars } from 'react-custom-scrollbars-2';

export const TabBar: React.FC = () => {
	const workspaces = useStoreState((state) => state.workspaces);

	const currentWorkspaceID = useStoreState((state) => state.currentWorkspaceID);

	const addWorkspace = useStoreActions((state) => state.addWorkspace);
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
				<div {...props} className='rounded bg-base-100 p-1' />
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
			<div className='flex w-[70%]   gap-1 p-1'>
				{workspaces.map((item) => (
					<button
						key={item.id}
						id={item.id}
						onClick={() => {
							setCurrentWorkspace(item.id);
						}}
						className={`flex items-center rounded bg-base-200 px-3 ${
							currentWorkspaceID === item.id &&
							'poppins-font-family btn-neutral  shadow'
						}`}
					>
						<IconSquareRotated
							className='my-auto ml-2'
							size={16}
						></IconSquareRotated>
						<label className='mr-4 select-none text-clip whitespace-nowrap p-2 text-xs hover:cursor-pointer'>
							{item.workspaceName}
						</label>

						<div
							onClick={(ev) => {
								ev.stopPropagation();
								deleteWorkspace(item.id);
							}}
							className='btn btn-circle btn-ghost btn-xs text-base-content'
						>
							<IconX size={16}></IconX>
						</div>
					</button>
				))}
			</div>
		</Scrollbars>
	);
};

export default TabBar;
