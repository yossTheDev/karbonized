import React, { useState } from 'react';
import { Button, FileInput, Input, Select, Textarea } from 'react-daisyui';
import blank_template from '../../assets/blank_template.png';
import browser_template from '../../assets/browser_template.png';
import code_template from '../../assets/code_template.png';
import image_template from '../../assets/image_template.png';
import karbonized from '../../assets/logo.svg';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { languages } from '../../utils/Languages';
import { getRandomNumber } from '../../utils/getRandom';
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
	/* Component State */
	const [current, setCurrent] = useState<any>(null);
	const [template, setTemplate] = useState<
		'blank' | 'code' | 'browser' | 'image'
	>('blank');

	/* Code Settings */
	const [title, setTitle] = useState('code');
	const [code, setCode] = useState(
		`<pre><code class="language-jsx"></code></pre>`,
	);
	const [lang, setLang] = useState('jsx');

	/* Image Settings */
	const [src, setSrc] = useState(karbonized);

	/* Browser Settings */
	const [srcBrowser, setSrcBrowser] = useState(karbonized);
	const [titleBrowser, setTitleBrowser] = useState('karbonized');
	const [url, setUrl] = useState('karbonized.onrender.com');

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

	const getElementsByType = (type: string) => {
		return (
			currentWorkspace.controls.filter((item) => item.type === type).length + 1
		);
	};

	const handleCreate = () => {
		cleanWorkspace();

		if (current) loadProject(current);

		onClose && onClose();
	};

	return (
		<Portal node={document.getElementById('body')}>
			<div className='absolute z-30 flex h-full w-full flex-auto flex-col bg-base-300 p-4'>
				<div className='hidden w-fit select-none flex-row gap-2 rounded-xl bg-base-200/70 p-2 text-black dark:text-white md:flex'>
					<img className='my-auto h-6' src={karbonized}></img>
					<label className='poppins-font-family my-auto mr-1 select-none'>
						Project Wizard
					</label>
				</div>

				<div className='flex select-none flex-col gap-2 overflow-auto'>
					{/* Templates */}
					<label className='poppins-font-family mb-2 text-right text-xl font-bold md:hidden'>
						Templates
					</label>
					<div className='mx-auto hidden max-h-16 shrink-0 flex-row flex-wrap gap-2 overflow-y-auto rounded bg-base-200 p-2 md:max-h-full'>
						<button
							onClick={() => setTemplate('blank')}
							className='flex flex-row gap-2 rounded-xl p-2 hover:cursor-pointer hover:bg-base-100/80 active:bg-base-100'
						>
							<img
								className={`w-48 rounded md:rounded-2xl ${
									template === 'blank' && 'border-2 border-primary  shadow-xl'
								}`}
								src={blank_template}
							></img>
						</button>

						<button
							onClick={() => setTemplate('code')}
							className='flex flex-row gap-2 rounded-xl p-2 hover:cursor-pointer hover:bg-base-100/80  active:bg-base-100'
						>
							<img
								className={`w-48 rounded md:rounded-2xl ${
									template === 'code' && 'border-2 border-primary  shadow-xl'
								}`}
								src={code_template}
							></img>
						</button>

						<button
							onClick={() => setTemplate('image')}
							className='flex flex-row gap-2 rounded-xl p-2 hover:cursor-pointer hover:bg-base-100/80  active:bg-base-100'
						>
							<img
								className={`w-48 rounded md:rounded-2xl ${
									template === 'image' && 'border-2 border-primary  shadow-xl'
								}`}
								src={image_template}
							></img>
						</button>

						<button
							onClick={() => setTemplate('browser')}
							className='flex flex-row gap-2 rounded-xl p-2 hover:cursor-pointer hover:bg-base-100/80  active:bg-base-100'
						>
							<img
								className={`w-48 rounded md:rounded-2xl ${
									template === 'browser' && 'border-2 border-primary  shadow-xl'
								}`}
								src={browser_template}
							></img>
						</button>
					</div>

					<div className='mt-4 flex flex-auto flex-wrap gap-2'>
						{code_templates.map((item) => (
							<button
								onClick={() => setCurrent(item)}
								className='transition-all active:scale-90'
							>
								<img
									className='flex h-36 rounded-2xl border-4 border-base-100 shadow-2xl'
									src={item.thumb}
								></img>
							</button>
						))}
					</div>

					<div className='mt-4 flex flex-auto flex-wrap gap-2'>
						{window_templates.map((item) => (
							<button
								onClick={() => setCurrent(item)}
								className='transition-all active:scale-90'
							>
								<img
									className='flex h-36 rounded-2xl border-4 border-base-100 shadow-2xl'
									src={item.thumb}
								></img>
							</button>
						))}
					</div>

					<div className='mt-4 flex flex-auto flex-wrap gap-2'>
						{phone_templates.map((item) => (
							<button
								onClick={() => setCurrent(item)}
								className='transition-all active:scale-90'
							>
								<img
									className='flex h-36 rounded-2xl border-4 border-base-100 shadow-2xl'
									src={item.thumb}
								></img>
							</button>
						))}
					</div>

					{/* Menus */}
					<div className='hidden flex-auto flex-col gap-2 overflow-auto text-base-content'>
						<label className='poppins-font-family mb-2 text-right text-xl font-bold'>
							Properties
						</label>

						<div className='flex w-full flex-col gap-3 overflow-auto  p-2 font-bold'>
							<p className='poppins-font-family'>Project Name</p>
							<Input
								className='min-h-12 w-full'
								value={currentWorkspace.workspaceName}
								onChange={(ev) => setWorkspaceName(ev.currentTarget.value)}
							></Input>

							{template === 'code' && (
								<>
									<p className='poppins-font-family'>Language</p>
									<Select
										className='min-h-12 w-full'
										tabIndex={0}
										value={lang}
										onChange={(e) => {
											setLang(e as any);
										}}
									>
										{languages.map((i) => {
											return (
												<option key={i} value={i}>
													{i}
												</option>
											);
										})}
									</Select>

									<p className='poppins-font-family'>Title</p>
									<Input
										className='min-h-12 w-full'
										value={title}
										onChange={(ev) => setTitle(ev.currentTarget.value)}
									></Input>

									<p className='poppins-font-family'>Code</p>
									<Textarea
										spellCheck={false}
										className='min-h-[16rem] w-full resize-none'
										value={code}
										onChange={(ev) => setCode(ev.target.value)}
									></Textarea>
								</>
							)}

							{template === 'image' && (
								<>
									<p className='poppins-font-family'>Source</p>
									<FileInput
										className='min-h-12 w-full'
										accept='image/*'
										onChange={(e) => {
											if (e.target.files && e.target.files.length > 0) {
												const reader = new FileReader();
												reader.addEventListener('load', () => {
													setSrc(reader.result?.toString() || '');
												});
												reader.readAsDataURL(e.target.files[0]);
											}
										}}
									></FileInput>
								</>
							)}

							{template === 'browser' && (
								<>
									<p className='poppins-font-family'>Source</p>
									<FileInput
										accept='image/*'
										className='min-h-12 w-full'
										onChange={(e) => {
											if (e.target.files && e.target.files.length > 0) {
												const reader = new FileReader();
												reader.addEventListener('load', () => {
													setSrcBrowser(reader.result?.toString() || '');
												});
												reader.readAsDataURL(e.target.files[0]);
											}
										}}
									></FileInput>

									<p className='poppins-font-family'>Title</p>
									<Input
										className='min-h-12 w-full'
										value={titleBrowser}
										onChange={(ev) => setTitleBrowser(ev.currentTarget.value)}
									></Input>

									<p className='poppins-font-family'>Url</p>
									<Input
										className='min-h-12  w-full'
										value={url}
										onChange={(ev) => setUrl(ev.currentTarget.value)}
									></Input>
								</>
							)}
						</div>
					</div>
				</div>

				<div>
					<Button onClick={handleCreate}>Create</Button>
				</div>
			</div>
		</Portal>
	);
};

export default ProjectWizard;
