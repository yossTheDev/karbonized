import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, Lock, Plus, RefreshCcw, Search, Shapes } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import type { Item } from '../../stores/AppStore';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { MenuItem } from './MenuItem';

type LayerFilter = 'all' | 'visible' | 'hidden' | 'locked' | 'groups';
type LayerDropPosition = 'before' | 'after' | 'inside';

interface LayerNode {
	item: Item;
	children: LayerNode[];
}

const normalizeParentId = (value?: string | null): string | null => value ?? null;

const buildLayerTree = (
	controls: Item[],
	parentId: string | null = null,
): LayerNode[] =>
	controls
		.filter(
			(item) =>
				!item.isDeleted && normalizeParentId(item.parentId) === parentId,
		)
		.map((item) => ({
			item,
			children: buildLayerTree(controls, item.id),
		}));

const matchesFilter = (item: Item, filter: LayerFilter): boolean => {
	switch (filter) {
		case 'visible':
			return item.isVisible;
		case 'hidden':
			return !item.isVisible;
		case 'locked':
			return !!item.locked;
		case 'groups':
			return item.type === 'group';
		default:
			return true;
	}
};

const filterTree = (
	nodes: LayerNode[],
	query: string,
	filter: LayerFilter,
): LayerNode[] => {
	const normalizedQuery = query.trim().toLowerCase();

	return nodes
		.map((node) => {
			const filteredChildren = filterTree(node.children, normalizedQuery, filter);
			const queryMatch =
				normalizedQuery === '' ||
				node.item.name.toLowerCase().includes(normalizedQuery) ||
				node.item.type.toLowerCase().includes(normalizedQuery);
			const filterMatch = matchesFilter(node.item, filter);

			if ((queryMatch && filterMatch) || filteredChildren.length > 0) {
				return { ...node, children: filteredChildren };
			}

			return null;
		})
		.filter((node): node is LayerNode => node !== null);
};

const getChildCount = (node: LayerNode): number =>
	node.children.reduce((acc, child) => acc + 1 + getChildCount(child), 0);

export const HierarchyPanel: React.FC = () => {
	const visibleControls = useStoreState((state) => state.visibleControls);
	const currentControlID = useStoreState((state) => state.currentControlID);
	const setCurrentControlID = useStoreActions(
		(state) => state.setcurrentControlID,
	);
	const toggleControlVisibility = useStoreActions(
		(state) => state.toggleControlVisibility,
	);
	const toggleControlLock = useStoreActions((state) => state.toggleControlLock);
	const renameControl = useStoreActions((state) => state.renameControl);
	const deleteControl = useStoreActions((state) => state.deleteControl);
	const duplicateControl = useStoreActions((state) => state.duplicateControl);
	const addGroup = useStoreActions((state) => state.addGroup);
	const groupControl = useStoreActions((state) => state.groupControl);
	const ungroupControl = useStoreActions((state) => state.ungroupControl);
	const moveControlLayer = useStoreActions((state) => state.moveControlLayer);
	const moveControlByStep = useStoreActions((state) => state.moveControlByStep);
	const moveControlToEdge = useStoreActions((state) => state.moveControlToEdge);
	const toggleGroupCollapsed = useStoreActions(
		(state) => state.toggleGroupCollapsed,
	);

	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState<LayerFilter>('all');
	const [focusedLayerID, setFocusedLayerID] = useState<string>('');
	const [renamingID, setRenamingID] = useState<string>('');
	const [renameValue, setRenameValue] = useState('');
	const [draggedId, setDraggedId] = useState('');
	const [dropTarget, setDropTarget] = useState<{
		id: string;
		position: LayerDropPosition;
	} | null>(null);

	useEffect(() => {
		if (currentControlID !== '') {
			setFocusedLayerID(currentControlID);
		}
	}, [currentControlID]);

	const tree = useMemo(() => buildLayerTree(visibleControls), [visibleControls]);
	const filteredTree = useMemo(
		() => filterTree(tree, query, filter),
		[filter, query, tree],
	);
	const activeLayer = useMemo(
		() =>
			visibleControls.find(
				(item) => item.id === (focusedLayerID || currentControlID),
			),
		[currentControlID, focusedLayerID, visibleControls],
	);

	const handleRenameStart = (item: Item) => {
		setFocusedLayerID(item.id);
		setRenamingID(item.id);
		setRenameValue(item.name);
	};

	const handleRenameCommit = (value: string) => {
		if (renamingID !== '') {
			renameControl({ id: renamingID, name: value });
		}

		setRenamingID('');
		setRenameValue('');
	};

	const handleDropPosition = (
		event: React.DragEvent<HTMLDivElement>,
		item: Item,
	): LayerDropPosition => {
		const bounds = event.currentTarget.getBoundingClientRect();
		const ratio = (event.clientY - bounds.top) / bounds.height;

		if (item.type === 'group' && ratio > 0.25 && ratio < 0.75) {
			return 'inside';
		}

		return ratio < 0.5 ? 'before' : 'after';
	};

	const renderNode = (node: LayerNode, depth = 0): React.ReactNode => {
		const isCollapsed = node.item.type === 'group' && node.item.collapsed;
		const activeId = focusedLayerID || currentControlID;

		return (
			<React.Fragment key={node.item.id}>
				<MenuItem
					item={node.item}
					depth={depth}
					isSelected={currentControlID === node.item.id}
					isFocused={activeId === node.item.id}
					isRenaming={renamingID === node.item.id}
					dropPosition={
						dropTarget?.id === node.item.id ? dropTarget.position : null
					}
					childCount={getChildCount(node)}
					onSelect={(item) => {
						setFocusedLayerID(item.id);
						if (item.type !== 'group' && item.isVisible) {
							setCurrentControlID(item.id);
						}
					}}
					onRenameStart={handleRenameStart}
					onRenameCommit={handleRenameCommit}
					onRenameCancel={() => {
						setRenamingID('');
						setRenameValue('');
					}}
					onToggleVisibility={toggleControlVisibility}
					onToggleLock={toggleControlLock}
					onDelete={deleteControl}
					onDuplicate={duplicateControl}
					onGroup={groupControl}
					onUngroup={ungroupControl}
					onMoveStep={(id, direction) => moveControlByStep({ id, direction })}
					onMoveEdge={(id, position) => moveControlToEdge({ id, position })}
					onToggleCollapsed={toggleGroupCollapsed}
					onDragStart={(id) => {
						setDraggedId(id);
						setDropTarget(null);
						setFocusedLayerID(id);
					}}
					onDragOver={(event, item) => {
						event.preventDefault();
						if (draggedId === '' || draggedId === item.id) return;
						setDropTarget({
							id: item.id,
							position: handleDropPosition(event, item),
						});
					}}
					onDrop={(event, item) => {
						event.preventDefault();
						if (draggedId === '') return;

						const position = handleDropPosition(event, item);
						moveControlLayer({
							draggedId,
							targetId: item.id,
							position,
						});
						setDraggedId('');
						setDropTarget(null);
					}}
					onDragEnd={() => {
						setDraggedId('');
						setDropTarget(null);
					}}
					renameValue={renameValue}
					setRenameValue={setRenameValue}
				/>

				{!isCollapsed &&
					node.children.map((child) => renderNode(child, depth + 1))}
			</React.Fragment>
		);
	};

	return (
		<div className='flex h-full flex-col gap-3 pb-2'>
			<div className='rounded-3xl border border-border/70 bg-card/70 p-3 shadow-sm'>
				<div className='flex items-start justify-between gap-3'>
					<div>
						<p className='text-sm font-semibold text-foreground'>Layer manager</p>
						<p className='text-xs text-muted-foreground'>
							Organize, group and reorder your scene without leaving the canvas.
						</p>
					</div>
					<Button
						variant='outline'
						size='sm'
						onClick={() => {
							addGroup({
								parentId:
									activeLayer?.type === 'group'
										? activeLayer.id
										: activeLayer?.parentId ?? null,
							});
						}}
					>
						<Plus className='mr-2 size-4' />
						Group
					</Button>
				</div>

				<div className='mt-3 grid grid-cols-3 gap-2 text-xs'>
					<div className='rounded-2xl border border-border/60 bg-background/70 px-3 py-2'>
						<div className='flex items-center gap-2 text-muted-foreground'>
							<Layers className='size-4' />
							Layers
						</div>
						<p className='mt-1 text-lg font-semibold text-foreground'>
							{visibleControls.length}
						</p>
					</div>
					<div className='rounded-2xl border border-border/60 bg-background/70 px-3 py-2'>
						<div className='flex items-center gap-2 text-muted-foreground'>
							<Lock className='size-4' />
							Locked
						</div>
						<p className='mt-1 text-lg font-semibold text-foreground'>
							{visibleControls.filter((item) => item.locked).length}
						</p>
					</div>
					<div className='rounded-2xl border border-border/60 bg-background/70 px-3 py-2'>
						<div className='flex items-center gap-2 text-muted-foreground'>
							<Shapes className='size-4' />
							Groups
						</div>
						<p className='mt-1 text-lg font-semibold text-foreground'>
							{visibleControls.filter((item) => item.type === 'group').length}
						</p>
					</div>
				</div>

				<div className='relative mt-3'>
					<Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder='Search layers, groups, or types'
						className='pl-9'
					/>
				</div>

				<div className='mt-3 flex flex-wrap gap-2'>
					{[
						{ id: 'all', label: 'All' },
						{ id: 'visible', label: 'Visible' },
						{ id: 'hidden', label: 'Hidden' },
						{ id: 'locked', label: 'Locked' },
						{ id: 'groups', label: 'Groups' },
					].map((option) => (
						<Button
							key={option.id}
							variant={filter === option.id ? 'accent' : 'ghost'}
							size='xs'
							onClick={() => setFilter(option.id as LayerFilter)}
						>
							{option.label}
						</Button>
					))}
				</div>
			</div>

			<div className='flex min-h-0 flex-1 flex-col gap-2'>
				<div className='flex items-center justify-between px-1'>
					<div>
						<p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
							Scene structure
						</p>
						{activeLayer !== undefined && (
							<p className='text-xs text-muted-foreground'>
								Focused: {activeLayer.name}
							</p>
						)}
					</div>
					<Button
						variant='ghost'
						size='icon-xs'
						onClick={() => {
							setQuery('');
							setFilter('all');
						}}
						title='Reset filters'
					>
						<RefreshCcw className='size-4' />
					</Button>
				</div>

				{filteredTree.length > 0 ? (
					<div className='flex flex-col gap-2 pb-4'>
						{filteredTree.map((node) => renderNode(node))}
					</div>
				) : (
					<div className='flex flex-1 items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 p-6'>
						<p className='max-w-52 text-center text-sm text-muted-foreground'>
							No layers match the current search. Try a different keyword or reset the filters.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
