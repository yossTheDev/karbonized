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
			<div className='absolute z-30 flex h-full w-full flex-auto flex-col bg-base-300 p-4'>
				<div className='hidden w-fit select-none flex-row gap-2 rounded-xl bg-base-200/70 p-2 text-black dark:text-white md:flex'>
					<img className='my-auto h-6' src={karbonized}></img>
					<label className='poppins-font-family my-auto mr-1 select-none'>
						Templates
					</label>
				</div>

				<div className='mb-2 mt-2 flex h-full select-none flex-col gap-1 overflow-auto  rounded-2xl bg-base-300 p-2'>
					{/* Templates */}
					<label className='poppins-font-family mb-2 text-right text-xl font-bold md:hidden'>
						Templates
					</label>

					{/* Code Templates */}
					<div className='mt-4 flex flex-auto flex-wrap gap-2'>
						{code_templates.map((item) => (
							<button
								key={item.controls[0].id}
								onClick={() => setCurrent(item)}
								className='transition-all active:scale-90'
							>
								<img
									className={`flex h-36 rounded-2xl border-4 border-base-100 shadow-2xl ${
										current?.workspace.id === item.workspace.id &&
										'border-primary'
									}`}
									src={item.thumb}
								></img>
							</button>
						))}
					</div>

					{/* Window Templates */}
					<div className='mt-4 flex flex-auto flex-wrap gap-2'>
						{window_templates.map((item) => (
							<button
								key={item.controls[0].id}
								onClick={() => setCurrent(item)}
								className='transition-all active:scale-90'
							>
								<img
									className={`flex h-36 rounded-2xl border-4 border-base-100 shadow-2xl ${
										current?.workspace.id === item.workspace.id &&
										'border-primary'
									}`}
									src={item.thumb}
								></img>
							</button>
						))}
					</div>

					{/* Phone Templates */}
					<div className='mt-4 flex flex-auto flex-wrap gap-2'>
						{phone_templates.map((item) => (
							<button
								key={item.controls[0].id}
								onClick={() => setCurrent(item)}
								className='transition-all active:scale-90'
							>
								<img
									className={`flex h-36 rounded-2xl border-4 border-base-100 shadow-2xl ${
										current?.workspace.id === item.workspace.id &&
										'border-primary'
									}`}
									src={item.thumb}
								></img>
							</button>
						))}
					</div>
				</div>

				<div className='mt-auto flex rounded-2xl p-1'>
					<Button className='my-auto' onClick={handleCreate}>
						Create
					</Button>
				</div>
			</div>
		</Portal>
	);
};

export default ProjectWizard;
