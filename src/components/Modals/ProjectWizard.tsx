import {
	IconAppWindow,
	IconCode,
	IconDeviceIpad,
	IconStars,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { useContext, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { AppContext } from '../../AppContext';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { NewsPanel } from '../Panels/NewsPanel';

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
import phone_template6 from '../../assets/templates/phone_template6.json';

const code_templates = [code_template1, code_template2];

const window_templates = [window_template1, window_template2, window_template3];

const phone_templates = [
	phone_template1,
	phone_template2,
	phone_template3,
	phone_template4,
	phone_template5,
	phone_template6,
];

interface Props {
	open: boolean;
	onClose?: Function;
}

export const ProjectWizard: React.FC<Props> = ({ open, onClose }) => {
	const ref = useRef<any>(null);

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
			<motion.div
				animate={{ marginTop: '0rem' }}
				initial={{ marginTop: '4rem' }}
				className='absolute z-30 flex h-full w-full flex-auto flex-col bg-base-300/30 md:bg-base-300'
			>
				<div className='mt-auto flex h-5/6 select-none flex-row gap-4 overflow-hidden text-base-content md:mt-0 md:h-full'>
					{/* News Panel */}
					<div className='hidden w-80 md:flex'>
						<NewsPanel></NewsPanel>
					</div>

					{/* Templates */}
					<div className='flex h-full w-full flex-auto flex-col overflow-hidden'>
						{/* Header */}
						<div className='flex h-fit w-full'>
							<div className='mb-3 ml-6 mt-2 flex w-fit gap-2 rounded-3xl bg-base-100 px-3 py-1 md:ml-0'>
								<IconStars size={20} className='my-auto'></IconStars>
								<p className='borel-font mt-4 text-lg'>Templates</p>
							</div>

							<div className='mb-3 ml-auto mr-2 mt-2 hidden w-fit gap-2 rounded-3xl bg-gradient-to-br from-violet-600 to-primary px-3 py-1 text-white shadow-sm shadow-pink-600 md:flex'>
								<svg
									className='my-auto ml-2 flex h-7 w-7 fill-white'
									viewBox='0 0 451.31622 451.31616'
									version='1.1'
									xmlns='http://www.w3.org/2000/svg'
								>
									<defs>
										<path
											d='M251.114 10.5456C237.053 -3.5152 214.263 -3.5152 200.202 10.5456L10.5456 200.202C-3.51519 214.263 -3.51519 237.053 10.5456 251.114L200.202 440.771C214.263 454.831 237.053 454.831 251.114 440.771L440.771 251.114C454.831 237.053 454.831 214.263 440.771 200.202L251.114 10.5456ZM251.151 18.1452C237.091 4.08441 214.3 4.08443 200.24 18.1452L18.2403 200.145C4.17954 214.205 4.17954 236.995 18.2403 251.056L200.24 433.056C214.3 447.116 237.091 447.116 251.151 433.056L433.151 251.056C447.212 236.995 447.212 214.205 433.151 200.145L251.151 18.1452Z'
											id='path_1'
										/>
									</defs>
									<g id='Group-3'>
										<g id='Rec-Subtract'>
											<g clip-path='url(#clip_1)'>
												<use fill='none' stroke-width='12' />
											</g>
										</g>
										<path
											d='M203.05 47.5693C215.56 35.0586 235.838 35.0586 248.349 47.5693L403.75 202.971C416.261 215.482 416.261 235.759 403.75 248.27L248.349 403.672C244.634 407.387 240.234 409.999 235.556 411.507C235.585 398.816 232.019 400.749 239.573 374.964C247.126 349.179 255.652 338.375 265.771 308.368C275.89 278.36 275.179 275.842 280.05 254.932C284.92 234.023 281.278 201.52 258.561 169.564C233.034 133.656 192.433 98.9087 169.001 81.618L203.05 47.5693L203.05 47.5693ZM88.4009 288.828C88.3898 288.882 88.3787 288.936 88.3677 288.99L47.6482 248.27C35.1375 235.759 35.1375 215.482 47.6482 202.971L162.022 86.373C165.225 101.533 178.6 131.78 169.14 158.04C150.072 210.97 99.9601 233.004 88.4009 288.828L88.4009 288.828Z'
											id='Vector'
											fill-rule='evenodd'
											stroke='none'
										/>
									</g>
								</svg>
								<p className='borel-font mt-4 text-lg'>Karbonized</p>
							</div>
						</div>

						<div className='flex flex-auto flex-col gap-3 overflow-hidden rounded-t-2xl bg-base-100 p-2 shadow md:rounded-tl-2xl'>
							<div className='flex h-full w-full flex-col gap-4 overflow-auto'>
								{/* Code Templates */}
								<div className='flex h-fit w-full flex-col gap-2'>
									<div className=' flex w-fit gap-2 rounded-2xl bg-base-200 px-4 py-2'>
										<IconCode className='my-auto' size={20}></IconCode>
										<p>Code</p>
									</div>
									<div className='flex h-full flex-row gap-2 overflow-x-auto overflow-y-hidden  px-2 md:flex-wrap'>
										{code_templates.map((item) => (
											<button
												key={item.workspace.id}
												onClick={() => setCurrent(item)}
												className='h-28 w-fit min-w-fit overflow-hidden transition-all active:scale-90'
											>
												<img
													className={`flex h-full w-full rounded-2xl border-4 border-base-100 ${
														current?.workspace.id === item.workspace.id &&
														'shadow- border-primary shadow-primary'
													}`}
													src={item.thumb}
												></img>
											</button>
										))}
									</div>
								</div>

								{/* Window Templates */}
								<div className='flex h-fit w-full flex-col gap-2 '>
									<div className='flex w-fit gap-2 rounded-2xl bg-base-200 px-4 py-2'>
										<IconAppWindow
											className='my-auto'
											size={20}
										></IconAppWindow>
										<p>Browser</p>
									</div>
									<div className='flex h-full flex-row gap-2 overflow-x-auto  px-2 md:flex-wrap'>
										{window_templates.map((item) => (
											<button
												key={item.workspace.id}
												onClick={() => setCurrent(item)}
												className='h-28 w-52 min-w-fit overflow-hidden transition-all active:scale-90'
											>
												<img
													className={`flex h-full w-full rounded-2xl border-4 border-base-100 ${
														current?.workspace.id === item.workspace.id &&
														'shadow- border-primary shadow-primary'
													}`}
													src={item.thumb}
												></img>
											</button>
										))}
									</div>
								</div>

								{/* Phone Templates */}
								<div className='flex h-fit w-full flex-col  gap-2'>
									<div className='flex w-fit gap-2 rounded-2xl bg-base-200 px-4 py-2'>
										<IconDeviceIpad
											className='my-auto'
											size={20}
										></IconDeviceIpad>
										<p>Devices</p>
									</div>
									<div className='flex h-full  flex-row gap-2 overflow-x-auto px-2 md:flex-wrap'>
										{phone_templates.map((item) => (
											<button
												key={item.workspace.id}
												onClick={() => setCurrent(item)}
												className='h-28 w-52 min-w-fit overflow-hidden transition-all active:scale-90'
											>
												<img
													className={`flex h-full w-full rounded-2xl border-4 border-base-100 ${
														current?.workspace.id === item.workspace.id &&
														'shadow- border-primary shadow-primary'
													}`}
													src={item.thumb}
												></img>
											</button>
										))}
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className='mt-auto flex flex-auto gap-2 p-1'>
								<button
									className='btn my-auto ml-auto rounded-3xl bg-base-300 hover:bg-primary hover:text-white'
									onClick={handleCreate}
								>
									Create
								</button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</Portal>
	);
};

export default ProjectWizard;
