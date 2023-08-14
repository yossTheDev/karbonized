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
		<div className='my-auto ml-2 mr-28 mt-2 hidden max-h-20 w-2/3 max-w-fit flex-auto flex-row overflow-auto lg:flex'>
			<Scrollbars
				ref={ref}
				autoHeight
				autoHide
				renderThumbHorizontal={(props) => (
					<div {...props} className='rounded bg-base-100/70' />
				)}
				onWheel={(event: any) => {
					const delta = Math.max(
						-1,
						Math.min(
							1,
							(event.nativeEvent.wheelDelta as any) ||
								-event.nativeEvent.detail,
						),
					);

					ref.current?.scrollLeft(ref.current.getScrollLeft() - delta * 20);
					event.preventDefault();
				}}
				className='pointer-events-auto flex max-w-fit flex-auto flex-row gap-2 overflow-x-auto overflow-y-hidden'
			>
				<div className='flex flex-row gap-1 p-1'>
					{workspaces.map((item) => (
						<button
							key={item.id}
							id={item.id}
							onClick={() => setCurrentWorkspace(item.id)}
							className={`btn btn-md my-auto flex select-none rounded-2xl text-base-content gap-2${
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

			<button
				onClick={() => addWorkspace('')}
				className='btn btn-circle btn-sm pointer-events-auto mx-2 my-auto'
			>
				<IconPlus size={14} className='my-auto dark:text-white'></IconPlus>
			</button>
		</div>
	);
};

export default TabBar;
