import { List, arrayMove } from 'react-movable';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { MenuItem } from './MenuItem';

export const HierarchyPanel = () => {
	/* App Store */
	const controlID = useStoreState((state) => state.currentControlID);
	const ControlsTree = useStoreState((state) => state.ControlsTree);
	const visibleControls = useStoreState((state) => state.visibleControls);
	const setControls = useStoreActions((state) => state.setControls);
	const setCurrentControlID = useStoreActions(
		(state) => state.setcurrentControlID,
	);
	return (
		<div className='mt-1 flex flex-auto'>
			{/* Controls */}
			{visibleControls.length > 0 ? (
				<List
					values={visibleControls}
					lockVertically
					onChange={({ oldIndex, newIndex }) =>
						setControls(arrayMove(visibleControls, oldIndex, newIndex))
					}
					renderList={({ children, props }) => (
						<ul
							className='z-50 flex h-full w-full flex-auto  flex-col gap-2 p-1'
							{...props}
						>
							{children}
						</ul>
					)}
					renderItem={({ value, props, isDragged }) => (
						<MenuItem props={props} isDragged={isDragged} {...value}></MenuItem>
					)}
				/>
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
