import {
	IconDownload,
	IconFileImport,
	IconPlus,
	IconSearch,
	IconStars,
	IconUser,
	IconUsersGroup,
	IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import * as localforage from 'localforage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, Select } from 'react-daisyui';
import { Portal } from 'react-portal';
import { AppContext } from '../AppContext';
import { NewsPanel } from '../components/Panels/NewsPanel';
import { CustomPortal } from '../components/Portal';
import { useScreenDirection } from '../hooks/useScreenDirection';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { getRandomNumber } from '../utils/getRandom';

const TEMPLATE_SYSTEM_ROOT = ' http://localhost:4000/';

const NavBarMobile = React.lazy(
	() => import('../components/Mobile/NavBarMobile'),
);

interface Props {
	open: boolean;
	onClose?: Function;
}

export const ProjectWizard: React.FC<Props> = ({ open, onClose }) => {
	const ref = useRef<any>(null);

	/* App Context */
	const { setShowWizard } = useContext(AppContext);

	/* Component State */
	const [templateType, setTemplateType] = useState<'user' | 'community'>(
		'user',
	);

	const [userTemplates, setUserTemplates] = useState<any>([]);
	const [loadingUserTemplates, setLoadingUserTemplates] = useState(true);
	const [communityTemplates, setCommunityTemplates] = useState<any>(null);
	const [communityTemplateType, setCommunityTemplateType] = useState('code');

	const [current, setCurrent] = useState<any>(null);
	const isHorizontal = useScreenDirection();

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
	const addWorkspace = useStoreActions((state) => state.addWorkspace);
	const setCurrentWorkspace = useStoreActions(
		(state) => state.setCurrentWorkspace,
	);

	useEffect(() => {
		/* Load From Cache */
		const load = async () => {
			setLoadingUserTemplates(true);
			const templates = await localforage.getItem('user_templates_test');

			if (templates) setUserTemplates(templates);

			setLoadingUserTemplates(false);
		};

		load();
	}, []);

	useEffect(() => {
		setCurrent(null);
	}, [templateType, communityTemplateType]);

	useEffect(() => {
		const load = async () => {
			const data = await (
				await fetch(TEMPLATE_SYSTEM_ROOT + 'index.json')
			).json();

			if (data) setCommunityTemplates(data);
		};

		load();
	}, [templateType]);

	const handleAddUserTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
		localforage.setItem('user_templates_test', userTemplates);

		if (e.target?.files && e.target?.files?.length > 0) {
			const reader = new FileReader();

			reader.addEventListener('load', () => {
				if (reader.result) {
					const newTemplate = JSON.parse(reader.result?.toString());

					if (newTemplate.workspace && newTemplate.properties) {
						if (
							!userTemplates.find(
								(item: any) => item.workspace.id === newTemplate.workspace.id,
							)
						) {
							localforage.setItem('user_templates_test', [
								...userTemplates,
								newTemplate,
							]);

							setUserTemplates([...userTemplates, newTemplate]);
						} else {
							alert('Has template');
						}
					}
				}
			});
			reader.readAsText(e.target.files[0]);
		}
	};

	const handleDeleteUserTemplate = (id: string) => {
		const copy = userTemplates.filter((item: any) => item.workspace.id !== id);
		setUserTemplates(copy);
		localforage.setItem('user_templates_test', copy);
	};

	const handleDownloadTemplate = (template: any) => {
		if (
			!userTemplates.find(
				(item: any) => item.workspace.id === template.workspace.id,
			)
		) {
			localforage.setItem('user_templates_test', [...userTemplates, template]);

			setUserTemplates([...userTemplates, template]);
			alert('Template installed in User Templates');
		} else {
			alert('You already have this template installed');
		}

		setCurrent(null);
	};

	const handleCreateNewProject = () => {
		const num = getRandomNumber().toString();
		addWorkspace(num);
		setCurrentWorkspace(num);
		setShowWizard(false);
	};

	const handleCreateFromTemplate = () => {
		if (current) loadProject(current);

		setShowWizard(false);
	};

	return (
		<Portal node={document.getElementById('body')}>
			<div className='absolute z-30 flex h-full w-full flex-auto flex-col bg-base-300/40 md:bg-base-300'>
				{!isHorizontal && <NavBarMobile></NavBarMobile>}
				<motion.div
					animate={{ marginTop: '0rem' }}
					initial={{ marginTop: isHorizontal ? '4rem' : '0rem' }}
					className='mt-auto flex  h-full select-none flex-row gap-4 overflow-hidden text-base-content md:mt-2'
				>
					{/* News Panel */}
					{isHorizontal && (
						<div className='flex w-[30rem] flex-auto grow-0'>
							<NewsPanel></NewsPanel>
						</div>
					)}

					{/* Templates */}
					<div className='relative flex h-full w-full flex-auto  flex-col overflow-hidden bg-base-100 md:rounded-tl-3xl md:shadow-xl'>
						{/* Header */}
						<div className='hidden h-fit w-full md:flex'>
							<div className='mb-3 ml-6 mt-2 flex w-fit gap-2 rounded-full px-4 py-0.5 md:ml-0 md:bg-base-100'>
								<IconStars size={20} className='my-auto'></IconStars>
								<p className='borel-font mt-4 text-lg'>Templates</p>
							</div>

							<div className='mb-3 ml-auto mr-4 mt-2 hidden w-fit gap-1 rounded-full border-2 border-base-content px-3 py-0.5 shadow-sm dark:border-white dark:text-white  md:flex'>
								<svg
									className='my-auto flex h-6 w-6 fill-base-content dark:fill-white'
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
								<p className='borel-font mt-4 text-base'>Karbonized</p>
							</div>
						</div>

						<div className='flex flex-auto flex-col gap-3 overflow-hidden bg-base-100 p-4'>
							{/* Actions */}
							<div className='flex w-full gap-4'>
								<button
									onClick={handleCreateNewProject}
									className='btn btn-lg h-28 rounded-2xl bg-base-300 p-4'
								>
									<div>
										<IconPlus size={28} className='mx-auto my-auto'></IconPlus>
										<p className='mt-2 text-xs'>New Project</p>
									</div>
								</button>

								<input
									onInput={handleAddUserTemplate}
									id='input'
									name='input'
									accept='.json'
									hidden
									type='file'
								/>

								<label
									htmlFor='input'
									className='btn btn-lg hidden h-28 rounded-2xl bg-base-300 p-4 md:flex'
								>
									<div className='mx-auto my-auto'>
										<IconFileImport
											className='mx-auto my-auto'
											size={28}
										></IconFileImport>
										<p className='mt-2 text-xs'>Import Template</p>
									</div>
								</label>
							</div>

							<div className='mx-auto w-4/5 rounded-full bg-base-300/20 p-0.5'></div>

							{/* Template Type Selector */}
							<div className='flex h-fit flex-row gap-3 rounded-2xl bg-base-300/60 p-3 lg:mx-56'>
								<button
									onClick={() => {
										setTemplateType('user');
									}}
									className={`flex h-full w-8 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2 transition-all hover:cursor-pointer hover:bg-neutral active:scale-90 ${
										templateType === 'user' && 'bg-base-300'
									}`}
								>
									<div className='mx-auto flex gap-2'>
										<IconUser></IconUser>
										<label className='mx-auto my-auto cursor-pointer'>
											User
										</label>
									</div>
								</button>

								<button
									className={`flex h-full w-8 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2  transition-all hover:cursor-pointer hover:bg-neutral active:scale-90 ${
										templateType === 'community' && 'bg-base-300'
									}`}
									onClick={() => {
										setTemplateType('community');
									}}
								>
									<div className='mx-auto flex gap-2'>
										<IconUsersGroup></IconUsersGroup>
										<label className='mx-auto my-auto cursor-pointer'>
											Community
										</label>
									</div>
								</button>
							</div>

							{/* Community Templates */}
							{templateType === 'community' && (
								<div className='flex h-full w-full flex-col gap-4 overflow-hidden'>
									{communityTemplates ? (
										<>
											{/* Header */}
											<div className='mt-1 flex w-full flex-auto flex-row gap-2 p-1'>
												<div className='mr-2 flex flex-auto flex-row'>
													<IconSearch className='my-auto mr-2 dark:text-white'></IconSearch>
													<div className='flex w-full' id='search_bar'></div>
												</div>

												<p className='my-auto text-xs'>Type</p>
												<Select
													defaultValue={'code'}
													tabIndex={0}
													value={communityTemplateType}
													onChange={(e) =>
														setCommunityTemplateType(e.currentTarget.value)
													}
												>
													<option value={'code'}>Code</option>
													<option value={'devices'}>Devices</option>
													<option value={'window'}>Window</option>
												</Select>
											</div>

											{communityTemplateType === 'code' && (
												<Templates
													current={current}
													setCurrent={setCurrent}
													handleDownloadTemplate={handleDownloadTemplate}
													templates={communityTemplates.code}
												></Templates>
											)}

											{communityTemplateType === 'window' && (
												<Templates
													current={current}
													setCurrent={setCurrent}
													handleDownloadTemplate={handleDownloadTemplate}
													templates={communityTemplates.window}
												></Templates>
											)}

											{communityTemplateType === 'devices' && (
												<Templates
													current={current}
													setCurrent={setCurrent}
													handleDownloadTemplate={handleDownloadTemplate}
													templates={communityTemplates.devices}
												></Templates>
											)}
										</>
									) : (
										<p className='mx-auto my-auto text-xs text-base-content/70'>
											No templates available go online to get new templates
											created by the community
										</p>
									)}
								</div>
							)}

							{/* User Templates */}
							{templateType === 'user' && (
								<>
									{!loadingUserTemplates ? (
										<div className='flex  h-full w-full flex-row flex-wrap gap-4 overflow-auto'>
											{userTemplates?.length > 0 ? (
												userTemplates.map((item: any) => (
													<>
														<button
															key={item.workspace.id}
															onClick={() => setCurrent(item)}
															className={`relative flex h-fit w-fit min-w-fit flex-col rounded-2xl border-2 bg-base-300 p-2 transition-all active:scale-90 ${
																current?.workspace.id === item.workspace.id
																	? 'border-base-100 shadow-xl'
																	: 'border-base-300'
															}`}
														>
															<img
																className='flex h-36 w-full rounded-2xl'
																src={item.thumb}
															></img>

															{current?.workspace.id === item.workspace.id && (
																<label
																	onClick={() =>
																		handleDeleteUserTemplate(item.workspace.id)
																	}
																	className='btn btn-circle absolute -ml-1 -mt-1  border-none bg-base-300 hover:bg-neutral'
																>
																	<IconX></IconX>
																</label>
															)}
														</button>
													</>
												))
											) : (
												<p className='mx-auto my-auto text-base-content/70'>
													No templates
												</p>
											)}
										</div>
									) : (
										<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
									)}
								</>
							)}
						</div>

						{/* Actions */}
						<AnimatePresence>
							{current && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='pointer-events-none absolute flex h-full w-full'
								>
									<div className='mt-auto flex h-fit w-full flex-auto gap-2 bg-gradient-to-t from-base-300 to-transparent p-4'>
										<button
											className='btn pointer-events-auto my-auto ml-auto rounded-3xl border-none bg-base-300 shadow hover:bg-primary hover:text-white'
											onClick={handleCreateFromTemplate}
										>
											Create
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
		</Portal>
	);
};

export default ProjectWizard;

interface TemplateItem {
	user: string;
	name: string;
	path: string;
	data: any;
}

const Templates: React.FC<{
	templates: any;
	current: any;
	setCurrent: (item: any) => void;
	handleDownloadTemplate: (id: string) => void;
}> = ({ templates, current, setCurrent, handleDownloadTemplate }) => {
	/* Component State */
	const [items, setItems] = useState<TemplateItem[]>([]);
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			const copy = [];

			for (const item of templates) {
				const data = await (
					await fetch(TEMPLATE_SYSTEM_ROOT + 'templates/' + item.path)
				).json();

				copy.push({ ...item, data: data });
			}

			setItems(copy);
			setLoading(false);
		};

		load();
	}, []);

	useEffect(() => {
		setCurrent(null);
	}, [query]);

	return (
		<div className='flex h-full w-full flex-row flex-wrap gap-4 overflow-auto'>
			{!loading ? (
				<>
					{items.length > 0 ? (
						<>
							{items
								?.filter(
									(item) =>
										item.name.toUpperCase().indexOf(query.toUpperCase()) > -1,
								)
								.map((item: any) => (
									<button
										key={item.data.workspace.id}
										onClick={() => setCurrent(item.data)}
										className={`relative flex h-fit w-fit min-w-fit flex-col rounded-2xl border-2 bg-base-300  p-2 transition-all active:scale-90 ${
											current?.workspace.id === item.data.workspace.id
												? 'border-base-100 shadow-xl'
												: 'border-base-300'
										}`}
									>
										<img
											className='flex h-36 w-full rounded-2xl'
											src={item.data.thumb}
										></img>

										<p className='poppins-font-family mt-2 text-black dark:text-white'>
											{item.name}
										</p>
										<p className='text-xs'>{item.user}</p>

										{current?.workspace.id === item.data.workspace.id && (
											<label
												onClick={() => handleDownloadTemplate(item.data)}
												className='btn btn-circle absolute -ml-1 -mt-1  border-none bg-base-300 hover:bg-neutral'
											>
												<IconDownload></IconDownload>
											</label>
										)}
									</button>
								))}
						</>
					) : (
						<p className='mx-auto my-auto text-xs text-base-content/70'>
							No templates available go online to get new templates created by
							the community
						</p>
					)}
				</>
			) : (
				<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
			)}

			<CustomPortal id='search_bar'>
				<Input
					onChange={(ev) => setQuery(ev.currentTarget.value)}
					value={query}
					className='flex w-full flex-auto text-gray-400'
				></Input>
			</CustomPortal>
		</div>
	);
};
