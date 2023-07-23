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
		<div className='flex flex-auto mt-2'>
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
							className='flex flex-col gap-2 z-50 p-1  flex-auto w-full h-full'
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
					<p className='mx-auto my-auto text-center text-xs text-gray-700'>
						Start adding controls to the scene
					</p>
				</div>
			)}
		</div>
	);
};
