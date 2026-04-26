import React, { useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import {
	IconSquareRotated,
	IconX,
	IconX as IconClose,
	IconChevronRight,
	IconChevronLeft,
} from '@tabler/icons-react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';

export const TabBar: React.FC = () => {
	const workspaces = useStoreState((state) => state.workspaces);
	const currentWorkspaceID = useStoreState((state) => state.currentWorkspaceID);

	const deleteWorkspace = useStoreActions((state) => state.deleteWorkspace);
	const setCurrentWorkspace = useStoreActions(
		(state) => state.setCurrentWorkspace,
	);
	const closeOtherWorkspaces = useStoreActions(
		(state) => state.closeOtherWorkspaces,
	);
	const closeWorkspacesToRight = useStoreActions(
		(state) => state.closeWorkspacesToRight,
	);
	const closeWorkspacesToLeft = useStoreActions(
		(state) => state.closeWorkspacesToLeft,
	);

	const ref = useRef<Scrollbars>(null);
	const [contextMenuWorkspaceId, setContextMenuWorkspaceId] = useState<
		string | null
	>(null);

	useEffect(() => {
		ref.current?.scrollToRight();
	}, [workspaces]);

	const getWorkspaceIndex = (workspaceId: string) => {
		return workspaces.findIndex((item) => item.id === workspaceId);
	};

	const canCloseOthers = workspaces.length > 1;
	const canCloseRight =
		getWorkspaceIndex(contextMenuWorkspaceId || '') < workspaces.length - 1;
	const canCloseLeft = getWorkspaceIndex(contextMenuWorkspaceId || '') > 0;

	return (
		<Scrollbars
			ref={ref}
			autoHeight
			autoHide
			style={{ width: '100%' }}
			renderThumbHorizontal={(props) => (
				<div {...props} className='rounded-lg bg-border/50 p-1' />
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
			<div className='flex w-[70%] gap-2 p-1.5'>
				{workspaces.map((item) => (
					<ContextMenu key={item.id}>
						<ContextMenuTrigger asChild>
							<button
								id={item.id}
								onClick={() => {
									setCurrentWorkspace(item.id);
								}}
								onContextMenu={() => setContextMenuWorkspaceId(item.id)}
								className={`group relative flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium outline-hidden select-none liquid-motion ${
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
									className='ml-1 rounded-xl p-1 text-foreground/50 opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100'
								>
									<IconX size={14}></IconX>
								</div>
							</button>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem
								onClick={() => deleteWorkspace(item.id)}
								className='text-destructive focus:bg-destructive/10 focus:text-destructive'
							>
								<IconClose className='size-4' />
								Close
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem
								onClick={() => closeOtherWorkspaces(item.id)}
								disabled={!canCloseOthers}
							>
								Close others
							</ContextMenuItem>
							<ContextMenuItem
								onClick={() => closeWorkspacesToRight(item.id)}
								disabled={!canCloseRight}
							>
								<IconChevronRight className='size-4' />
								Close to the right
							</ContextMenuItem>
							<ContextMenuItem
								onClick={() => closeWorkspacesToLeft(item.id)}
								disabled={!canCloseLeft}
							>
								<IconChevronLeft className='size-4' />
								Close to the left
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))}
			</div>
		</Scrollbars>
	);
};

export default TabBar;
