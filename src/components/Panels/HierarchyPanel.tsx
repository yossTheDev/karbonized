import React from 'react';
import { List, arrayMove } from 'react-movable';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { MenuItem } from './MenuItem';

export const HierarchyPanel: React.FC = () => {
	/* App Store */
	const visibleControls = useStoreState((state) => state.visibleControls);
	const setWorkspaceControls = useStoreActions(
		(state) => state.setWorkspaceControls,
	);

	return (
		<>
			{/* Controls */}
			{visibleControls.length > 0 ? (
				<List
					values={visibleControls}
					lockVertically
					onChange={({ oldIndex, newIndex }) => {
						setWorkspaceControls(
							arrayMove(visibleControls, oldIndex, newIndex),
						);
					}}
					renderList={({ children, props }) => (
						<ul
							className='z-50 flex h-full w-full flex-auto flex-col gap-2 p-1'
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
			) : (
				<div className='flex flex-auto items-center justify-center'>
					<p className='text-base-content/70 mx-auto my-auto select-none text-center text-xs'>
						Start adding controls to the scene
					</p>
				</div>
			)}
		</>
	);
};
