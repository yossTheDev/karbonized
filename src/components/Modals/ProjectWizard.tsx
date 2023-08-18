import React, { useContext, useState } from 'react';
import { Button } from 'react-daisyui';
import karbonized from '../../assets/logo.svg';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Portal } from 'react-portal';

/* Project Templates */
import code_template1 from '../../assets/templates/code_template1.json';
import code_template2 from '../../assets/templates/code_template2.json';

import window_template1 from '../../assets/templates/window_template1.json';
import window_template2 from '../../assets/templates/window_template2.json';
import window_template3 from '../../assets/templates/window_template3.json';

import phone_template1 from '../../assets/templates/phone_template1.json';
import phone_template2 from '../../assets/templates/phone_template2.json';
import phone_template3 from '../../assets/templates/phone_template3.json';
import phone_template4 from '../../assets/templates/phone_template4.json';
import phone_template5 from '../../assets/templates/phone_template5.json';
import { AppContext } from '../../AppContext';
import {
	IconAppWindow,
	IconBell,
	IconCode,
	IconDeviceIpad,
} from '@tabler/icons-react';

const code_templates = [code_template1, code_template2];

const window_templates = [window_template1, window_template2, window_template3];

const phone_templates = [
	phone_template1,
	phone_template2,
	phone_template3,
	phone_template4,
	phone_template5,
];

interface Props {
	open: boolean;
	onClose?: Function;
}

export const ProjectWizard: React.FC<Props> = ({ open, onClose }) => {
	/* App Context */
	const { setShowWizard } = useContext(AppContext);

	/* Component State */
	const [current, setCurrent] = useState<any>(null);

	/* App Store */
	const addControl = useStoreActions((state) => state.addControl);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	const setWorkspaceName = useStoreActions((state) => state.setWorkspaceName);
	const loadProject = useStoreActions((state) => state.loadProject);
	const setWorkspaceSize = useStoreActions((state) => state.setWorkspaceSize);
	const cleanWorkspace = useStoreActions((state) => state.cleanWorkspace);

	const handleCreate = () => {
		if (current) loadProject(current);

		setShowWizard(false);
	};

	return (
		<Portal node={document.getElementById('body')}>
			<div className='absolute z-30 flex h-full w-full flex-auto flex-col bg-base-300'>
				<div className='hidden w-fit select-none flex-row gap-2 rounded-xl bg-base-200/70 p-2 text-black dark:text-white'>
					<img className='my-auto h-6' src={karbonized}></img>
					<label className='poppins-font-family my-auto mr-1 select-none'>
						Templates
					</label>
				</div>

				<div className='mb-2 mt-2 flex h-full select-none flex-row gap-4 overflow-hidden bg-base-300 text-base-content'>
					{/* News Panel */}
					<div className='flex h-full w-[30rem] flex-col p-2'>
						<div className='flex w-fit gap-1 rounded-2xl bg-base-200 p-2'>
							<IconBell></IconBell>
							<p className='poppins-font-family'>News</p>
						</div>
					</div>

					{/* Templates */}
					<div className='flex h-full w-full flex-col gap-3 rounded-s-2xl bg-base-200 p-6 shadow'>
						<div className='flex h-full w-full flex-col gap-4 overflow-auto'>
							{/* Code Templates */}
							<div className='flex gap-2'>
								<IconCode></IconCode>
								<p>Code</p>
							</div>
							<div className='flex flex-auto flex-wrap gap-2 px-2'>
								{code_templates.map((item) => (
									<button
										key={item.workspace.id}
										onClick={() => setCurrent(item)}
										className='transition-all active:scale-90'
									>
										<img
											className={`flex h-36 rounded-2xl border-4 border-base-100 ${
												current?.workspace.id === item.workspace.id &&
												'border-primary shadow shadow-primary'
											}`}
											src={item.thumb}
										></img>
									</button>
								))}
							</div>

							{/* Window Templates */}
							<div className='flex gap-2'>
								<IconAppWindow></IconAppWindow>
								<p>Browser</p>
							</div>
							<div className='flex flex-auto flex-wrap gap-2 px-2'>
								{window_templates.map((item) => (
									<button
										key={item.workspace.id}
										onClick={() => setCurrent(item)}
										className='transition-all active:scale-90'
									>
										<img
											className={`flex h-36 rounded-2xl border-4 border-base-100 ${
												current?.workspace.id === item.workspace.id &&
												'shadow- border-primary shadow-primary'
											}`}
											src={item.thumb}
										></img>
									</button>
								))}
							</div>

							{/* Phone Templates */}
							<div className='flex gap-2'>
								<IconDeviceIpad></IconDeviceIpad>
								<p>Devices</p>
							</div>
							<div className='flex flex-auto flex-wrap gap-2 px-2'>
								{phone_templates.map((item) => (
									<button
										key={item.controls[0].id}
										onClick={() => setCurrent(item)}
										className='transition-all active:scale-90'
									>
										<img
											className={`flex h-36 rounded-2xl border-4 border-base-100  ${
												current?.workspace.id === item.workspace.id &&
												'border-primary shadow shadow-primary'
											}`}
											src={item.thumb}
										></img>
									</button>
								))}
							</div>
						</div>

						<div className='mt-auto flex'>
							<Button
								color='primary'
								className='my-auto ml-auto'
								onClick={handleCreate}
							>
								Create
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default ProjectWizard;
