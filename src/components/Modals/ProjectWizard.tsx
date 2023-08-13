import React, { useState } from 'react';
import {
	Button,
	FileInput,
	Input,
	Modal,
	Select,
	Textarea,
} from 'react-daisyui';
import blank_template from '../../assets/blank_template.png';
import browser_template from '../../assets/browser_template.png';
import code_template from '../../assets/code_template.png';
import image_template from '../../assets/image_template.png';
import karbonized from '../../assets/karbonized.svg';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { languages } from '../../utils/Languages';
import { getRandomNumber } from '../../utils/getRandom';

interface Props {
	open: boolean;
	onClose?: Function;
}

export const ProjectWizard: React.FC<Props> = ({ open, onClose }) => {
	/* Component State */
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
	const setWorkspaceSize = useStoreActions((state) => state.setWorkspaceSize);
	const cleanWorkspace = useStoreActions((state) => state.cleanWorkspace);

	const getElementsByType = (type: string) => {
		return (
			currentWorkspace.controls.filter((item) => item.type === type).length + 1
		);
	};

	const handleCreate = () => {
		cleanWorkspace();

		if (template === 'blank') {
			setWorkspaceSize({ height: '512', width: '512' });
		} else if (template === 'code') {
			const num = getRandomNumber();
			addControl({
				type: 'code',
				id: `code-${num}`,
				isSelectable: true,
				isDeleted: false,
				name: `code ${getElementsByType('code')}`,
				isVisible: true,
			});

			setWorkspaceSize({ width: '512', height: '512' });
			addInitialProperty({ id: `code-${num}-wintitle`, value: title });
			addInitialProperty({ id: `code-${num}-lang`, value: lang });
			addInitialProperty({ id: `code-${num}-code`, value: code });
			addInitialProperty({ id: `code-${num}-shadowBlur`, value: 8 });
			addInitialProperty({ id: `code-${num}-borderRadius`, value: 8 });
			addInitialProperty({
				id: `code-${num}-pos`,
				value: { x: 26, y: 186 },
			});
		} else if (template === 'browser') {
			const num = getRandomNumber();

			addControl({
				type: 'window',
				id: `window-${num}`,
				isSelectable: true,
				isDeleted: false,
				name: `window ${getElementsByType('window')}`,
				isVisible: true,
			});

			setWorkspaceSize({ width: '1280', height: '720' });

			addInitialProperty({ id: `window-${num}-title`, value: titleBrowser });
			addInitialProperty({ id: `window-${num}-url`, value: url });
			addInitialProperty({ id: `window-${num}-src`, value: srcBrowser });
			addInitialProperty({ id: `window-${num}-shadowBlur`, value: 24 });
			addInitialProperty({ id: `window-${num}-borderRadius`, value: 8 });
			addInitialProperty({
				id: `window-${num}-pos`,
				value: { x: 127.6653, y: 71.499 },
			});
			addInitialProperty({
				id: `window-${num}-control_size`,
				value: { w: 1024, h: 576 },
			});
		} else if (template === 'image') {
			const num = getRandomNumber();

			addControl({
				type: 'image',
				id: `image-${num}`,
				isSelectable: true,
				isDeleted: false,
				name: `image ${getElementsByType('image')}`,
				isVisible: true,
			});

			setWorkspaceSize({ width: '1280', height: '720' });

			addInitialProperty({ id: `image-${num}-src`, value: src });
			addInitialProperty({ id: `image-${num}-shadowBlur`, value: 24 });
			addInitialProperty({ id: `image-${num}-borderRadius`, value: 8 });
			addInitialProperty({
				id: `image-${num}-pos`,
				value: { x: 127.6653, y: 71.499 },
			});

			addInitialProperty({
				id: `image-${num}-control_size`,
				value: { w: 1024, h: 576 },
			});
		}

		onClose && onClose();
	};

	return (
		<Modal.Legacy
			open={open}
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='flex max-h-[40rem] max-w-none flex-col overflow-hidden  bg-base-300 md:max-h-[34rem] md:max-w-4xl'
		>
			<Modal.Header className='font-bold dark:text-white'>
				<div className='hidden w-fit select-none flex-row gap-2 rounded-xl bg-base-200/70 p-2 text-black dark:text-white md:flex'>
					<img className='my-auto h-6' src={karbonized}></img>
					<label className='poppins-font-family my-auto mr-1 select-none'>
						Project Wizard
					</label>
				</div>
			</Modal.Header>

			<Modal.Body className='flex select-none flex-col gap-4 overflow-auto md:flex-row'>
				{/* Templates */}
				<label className='poppins-font-family mb-2 text-right text-xl font-bold md:hidden'>
					Templates
				</label>
				<div className='mx-auto flex max-h-16 shrink-0 flex-row gap-2 overflow-y-auto  rounded bg-base-200 p-2 md:max-h-full md:flex-col md:bg-transparent'>
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

				{/* Menus */}
				<div className='flex flex-auto flex-col gap-2 overflow-auto text-base-content'>
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
			</Modal.Body>

			<Modal.Actions>
				<Button className='dark:text-white' onClick={handleCreate}>
					Create
				</Button>
			</Modal.Actions>
		</Modal.Legacy>
	);
};
