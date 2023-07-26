import React, { useEffect, useState } from 'react';
import { DropMenu, MenuItem } from '../CustomControls/DropMenu';
import { IconArrowBack, IconArrowForward, IconPlus } from '@tabler/icons-react';
import { ProjectWizard } from '../Modals/ProjectWizard';
import { useStoreActions } from '../../stores/Hooks';

export const MenuBar: React.FC = () => {
	/* Panels */
	const [showWizard, setShowWizard] = useState(true);

	/* Actions */
	const redo = useStoreActions((state) => state.redo);
	const undo = useStoreActions((state) => state.undo);

	/* Handle Key Shortcuts */
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'n') {
			event.preventDefault();

			setShowWizard(true);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			setShowWizard(false);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	return (
		<>
			<div id='menubar' className='z-10 mx-2 my-1 flex dark:text-gray-300'>
				<DropMenu
					label='File'
					id='filebar'
					menu={
						<MenuItem
							click={() => setShowWizard(true)}
							icon={<IconPlus size={16}></IconPlus>}
							label='New Project'
							shortcut='Ctrl+N'
						></MenuItem>
					}
				></DropMenu>

				<DropMenu
					label='Edit'
					menu={
						<>
							<MenuItem
								click={() => undo()}
								icon={
									<IconArrowBack
										size={16}
										className='-scale-y-[1]'
									></IconArrowBack>
								}
								label='Undo'
								shortcut='Ctrl+Z'
							></MenuItem>

							<MenuItem
								click={() => redo()}
								icon={
									<IconArrowForward
										size={16}
										className='-scale-y-[1]'
									></IconArrowForward>
								}
								label='Redo'
								shortcut='Ctrl+Y'
							></MenuItem>
						</>
					}
				></DropMenu>
			</div>

			{showWizard && (
				<ProjectWizard
					onClose={() => setShowWizard(false)}
					open={showWizard}
				></ProjectWizard>
			)}
		</>
	);
};
