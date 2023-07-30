import { List, arrayMove } from 'react-movable';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { MenuItem } from './MenuItem';

export const HierarchyPanel = () => {
	/* App Store */
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const visibleControls = useStoreState((state) => state.visibleControls);
	const setWorkspaceControls = useStoreActions(
		(state) => state.setWorkspaceControls,
	);

	return (
		<div className='mt-1 flex flex-auto flex-col overflow-hidden'>
			{/* Controls */}
			{visibleControls.length > 0 ? (
				<>
					<label className='mb-2 ml-3 select-none text-xl font-bold'>
						Hierarchy
					</label>
					<List
						values={visibleControls}
						lockVertically
						onChange={({ oldIndex, newIndex }) =>
							setWorkspaceControls(
								arrayMove(visibleControls, oldIndex, newIndex),
							)
						}
						renderList={({ children, props }) => (
							<ul
								className='z-50 flex h-full w-full flex-auto flex-col  gap-2 overflow-auto p-1'
								{...props}
							>
								{children}
							</ul>
						)}
						renderItem={({ value, props, isDragged }) => (
							<MenuItem
								key={value.id}
								props={props}
								isDragged={isDragged}
								{...value}
							></MenuItem>
						)}
					/>
				</>
			) : (
				<div className='flex flex-auto'>
					<p className='mx-auto my-auto select-none text-center text-xs text-gray-700'>
						Start adding controls to the scene
					</p>
				</div>
			)}
		</div>
	);
};
