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
		<div className='absolute z-30 my-auto ml-2 mt-2  hidden max-h-20 w-2/3 max-w-fit flex-auto  flex-row overflow-auto lg:flex'>
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
						<div
							key={item.id}
							id={item.id}
							className={`my-auto flex h-fit select-none gap-2 rounded-xl bg-base-200 p-1  hover:cursor-pointer  hover:bg-neutral active:bg-base-100 dark:text-gray-300 ${
								currentWorkspaceID === item.id &&
								'poppins-font-family  border border-neutral shadow'
							}`}
						>
							<div
								onClick={() => setCurrentWorkspace(item.id)}
								className='flex flex-row'
							>
								<IconSquareRotated
									className='my-auto ml-2'
									size={16}
								></IconSquareRotated>
								<label className='mr-4 select-none text-clip whitespace-nowrap p-2 text-xs hover:cursor-pointer'>
									{item.workspaceName}
								</label>
							</div>

							<IconX
								size={16}
								onClick={() => deleteWorkspace(item.id)}
								className='my-auto ml-auto mr-2 rounded hover:bg-base-100'
							></IconX>
						</div>
					))}
				</div>
			</Scrollbars>

			<div
				onClick={() => addWorkspace('')}
				className='z-20  mx-2 my-auto cursor-pointer rounded-full bg-base-200  p-2 hover:bg-neutral active:bg-base-100'
			>
				<IconPlus size={14} className='my-auto dark:text-white'></IconPlus>
			</div>
		</div>
	);
};
