import {
	Download,
	FileUp,
	Plus,
	Search,
	Sparkles,
	User,
	Users,
	X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import * as localforage from 'localforage';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Portal } from 'react-portal';
import { AppContext } from '@/AppContext';
import { NewsPanel } from '../components/Panels/NewsPanel';
import { CustomPortal } from '../components/Portal';
import { useScreenDirection } from '../hooks/useScreenDirection';
import { useStoreActions } from '../stores/Hooks';
import { getRandomNumber } from '../utils/getRandom';

const TEMPLATE_SYSTEM_ROOT = 'https://karbon-apps.github.io/templates/';

const NavBarMobile = React.lazy(
	async () => await import('../components/Mobile/NavBarMobile'),
);

interface Props {
	open: boolean;
	onClose?: () => void;
}

export const ProjectWizard: React.FC<Props> = ({ open, onClose }) => {
	/* App Context */
	const { setShowWizard } = useContext(AppContext);

	/* Component State */
	const [templateType, setTemplateType] = useState<'user' | 'community'>(
		'user',
	);

	const [userTemplates, setUserTemplates] = useState<any>([]);
	const [loadingUserTemplates] = useState(false);
	const [communityTemplates] = useState<any>(null);
	const [communityTemplateType, setCommunityTemplateType] = useState('code');

	const [current, setCurrent] = useState<any>(null);
	const isHorizontal = useScreenDirection();

	/* App Store */
	const loadProject = useStoreActions((state) => state.loadProject);
	const addWorkspace = useStoreActions((state) => state.addWorkspace);
	const setCurrentWorkspace = useStoreActions(
		(state) => state.setCurrentWorkspace,
	);

	useEffect(() => {
		/* Load From Cache */
		/* const load = async () => {
			setLoadingUserTemplates(true);
			const templates = await localforage.getItem('user_templates_test');

			if (templates) setUserTemplates(templates);

			setLoadingUserTemplates(false);
		};

		load(); */
	}, []);

	useEffect(() => {
		setCurrent(null);
	}, [templateType, communityTemplateType]);

	useEffect(() => {
		/* const load = async () => {
			const data = await (
				await fetch(TEMPLATE_SYSTEM_ROOT + 'index.json')
			).json();

			if (data) setCommunityTemplates(data);
		};

		load(); */
	}, [templateType]);

	const handleAddUserTemplate = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		void localforage.setItem('user_templates_test', userTemplates);

		if (e.target.files !== null && e.target.files.length > 0) {
			const reader = new FileReader();

			reader.addEventListener('load', () => {
				void (async () => {
					if (typeof reader.result === 'string') {
						const newTemplate = JSON.parse(reader.result) as Record<
							string,
							unknown
						>;
						/* eslint-disable @typescript-eslint/strict-boolean-expressions */
						const isTemplateObject =
							newTemplate !== null &&
							typeof newTemplate === 'object' &&
							'workspace' in newTemplate &&
							'properties' in newTemplate;

						if (isTemplateObject) {
							if (
								!userTemplates.find(
									(item: any) =>
										item.workspace.id ===
										(newTemplate.workspace as { id: string }).id,
								)
							) {
								/* eslint-enable @typescript-eslint/strict-boolean-expressions */
								await localforage.setItem('user_templates_test', [
									...userTemplates,
									newTemplate,
								]);

								setUserTemplates([...userTemplates, newTemplate]);
							} else {
								alert('You already have this template installed');
							}
						}
					}
				})();
			});
			reader.readAsText(e.target.files[0]);
		}
	};

	const handleDeleteUserTemplate = (id: string): void => {
		const copy = userTemplates.filter((item: any) => item.workspace.id !== id);
		setUserTemplates(copy);
		void localforage.setItem('user_templates_test', copy);
	};

	const handleDownloadTemplate = (template: any): void => {
		if (
			template?.workspace?.id !== undefined &&
			userTemplates.find(
				(item: any) => item.workspace.id === template.workspace.id,
			) === undefined
		) {
			void localforage.setItem('user_templates_test', [
				...userTemplates,
				template,
			]);

			setUserTemplates([...userTemplates, template]);
			alert('Template installed in User Templates');
		} else {
			alert('You already have this template installed');
		}

		setCurrent(null);
	};

	const handleCreateNewProject = (): void => {
		const num = getRandomNumber().toString();
		addWorkspace(num);
		setCurrentWorkspace(num);
		setShowWizard(false);
	};

	const handleCreateFromTemplate = (): void => {
		if (current !== null) loadProject(current);

		setShowWizard(false);
	};

	return (
		// @ts-expect-error Portal type compatibility issue
		<Portal node={document.getElementById('body')}>
			<AnimatePresence>
				{open && (
					<>
						{/* Backdrop overlay */}
						<div
							className='fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm'
							onClick={() => setShowWizard(false)}
						>
							{/* Floating panel */}
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2 }}
								onClick={(e) => e.stopPropagation()}
								className='relative flex h-[90vh] w-[90vw] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xl'
							>
								{/* Header */}
								<div className='flex h-fit w-full items-center justify-between border-b border-border p-4'>
									<div className='flex items-center gap-2'>
										<Sparkles size={20} className='text-foreground'></Sparkles>
										<p className='borel-font text-lg text-foreground'>Templates</p>
									</div>

									<div className='flex items-center gap-2 rounded-full border-2 border-border px-3 py-0.5 shadow-sm'>
										<svg
											className='fill-foreground h-6 w-6 dark:fill-white'
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
													<g clipPath='url(#clip_1)'>
														<use fill='none' strokeWidth='12' />
													</g>
												</g>
												<path
													d='M203.05 47.5693C215.56 35.0586 235.838 35.0586 248.349 47.5693L403.75 202.971C416.261 215.482 416.261 235.759 403.75 248.27L248.349 403.672C244.634 407.387 240.234 409.999 235.556 411.507C235.585 398.816 232.019 400.749 239.573 374.964C247.126 349.179 255.652 338.375 265.771 308.368C275.89 278.36 275.179 275.842 280.05 254.932C284.92 234.023 281.278 201.52 258.561 169.564C233.034 133.656 192.433 98.9087 169.001 81.618L203.05 47.5693L203.05 47.5693ZM88.4009 288.828C88.3898 288.882 88.3787 288.936 88.3677 288.99L47.6482 248.27C35.1375 235.759 35.1375 215.482 47.6482 202.971L162.022 86.373C165.225 101.533 178.6 131.78 169.14 158.04C150.072 210.97 99.9601 233.004 88.4009 288.828L88.4009 288.828Z'
													id='Vector'
													fillRule='evenodd'
													stroke='none'
												/>
											</g>
										</svg>
										<p className='borel-font text-base text-foreground'>Karbonized</p>
									</div>
								</div>

								{/* Content */}
								<div className='flex flex-auto flex-col gap-3 overflow-hidden p-4'>
									{/* Actions */}
									<div className='flex w-full gap-4 '>
										<Button
											onClick={handleCreateNewProject}
											variant='outline'
											size='lg'
											className='h-28 flex-col gap-2 rounded-2xl'
										>
											<Plus size={28} />
											<span className='text-xs'>New Project</span>
										</Button>

										<input
											onInput={handleAddUserTemplate}
											id='input'
											name='input'
											accept='.json'
											hidden
											type='file'
										/>

										<label htmlFor='input'>
											<Button
												variant='outline'
												size='lg'
												className='h-28 flex-col gap-2 rounded-2xl'
												asChild
											>
												<div>
													<FileUp size={28} />
													<span className='text-xs'>Import Template</span>
												</div>
											</Button>
										</label>
									</div>

									<div className='mx-auto w-4/5 rounded-full bg-muted p-0.5'></div>

									{/* Template Type Selector */}
									<Tabs
										value={templateType}
										onValueChange={(value) => {
											setTemplateType(value as 'user' | 'community');
										}}
										className='w-full'
									>
										<TabsList className='grid w-full grid-cols-2 bg-muted'>
											<TabsTrigger value='user' className='gap-2'>
												<User size={16} />
												User
											</TabsTrigger>
											<TabsTrigger value='community' className='gap-2'>
												<Users size={16} />
												Community
											</TabsTrigger>
										</TabsList>
									</Tabs>

									{/* Community Templates */}
									{templateType === 'community' && (
										<div className='flex h-full w-full flex-col gap-4 overflow-hidden'>
											{communityTemplates !== null ? (
												<>
													{/* Header */}
													<div className='mt-1 flex w-full flex-auto flex-row gap-2 p-1'>
														<div className='mr-2 flex flex-auto flex-row'>
															<Search className='my-auto mr-2 dark:text-white'></Search>
															<div className='flex w-full' id='search_bar'></div>
														</div>

														<p className='my-auto text-xs'>Type</p>
														<Select
															value={communityTemplateType}
															onValueChange={(value) => {
																setCommunityTemplateType(value);
															}}
														>
															<SelectTrigger className='w-32'>
																<SelectValue placeholder='Type' />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value='code'>Code</SelectItem>
																<SelectItem value='devices'>Devices</SelectItem>
																<SelectItem value='window'>Window</SelectItem>
															</SelectContent>
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
												<p className='text-muted-foreground mx-6 my-auto text-center text-xs md:mx-auto'>
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
																	onClick={() => {
																		setCurrent(item);
																	}}
																	className={`relative flex h-fit w-fit min-w-fit flex-col rounded-2xl border-2 bg-muted p-2 transition-all active:scale-90 ${
																		current?.workspace.id === item.workspace.id
																			? 'border-border shadow-xl'
																			: 'border-border'
																	}`}
																>
																	<img
																		className='flex h-36 w-full rounded-2xl'
																		src={item.thumb}
																	></img>

																	{current?.workspace.id === item.workspace.id && (
																		<Button
																			size='icon'
																			variant='outline'
																			className='absolute -left-1 -top-1 h-8 w-8 rounded-full border-none bg-muted'
																			onClick={() => {
																				handleDeleteUserTemplate(item.workspace.id);
																			}}
																		>
																			<X size={16} />
																		</Button>
																	)}
																</button>
															</>
														))
													) : (
														<p className='text-muted-foreground mx-auto my-auto text-center text-xs'>
															You haven&apos;t saved any template yet
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
									{current !== null && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className='pointer-events-none absolute inset-0 flex h-full w-full'
										>
											<div className='mt-auto flex h-fit w-full flex-auto gap-2 bg-linear-to-t from-muted to-transparent p-4'>
												<Button
													className='pointer-events-auto ml-auto rounded-3xl'
													onClick={handleCreateFromTemplate}
												>
													Create
												</Button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>
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
		const load = async (): Promise<void> => {
			setLoading(true);
			const copy = [];

			for (const item of templates) {
				const data = await (
					await fetch(TEMPLATE_SYSTEM_ROOT + 'templates/' + item.path)
				).json();

				copy.push({ ...item, data });
			}

			setItems(copy);
			setLoading(false);
		};

		void load();
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
								?.filter((item) =>
									item.name.toUpperCase().includes(query.toUpperCase()),
								)
								.map((item: any) => (
									<button
										key={item.data.workspace.id}
										onClick={() => {
											setCurrent(item.data);
										}}
										className={`relative flex h-fit w-fit min-w-fit flex-col rounded-2xl border-2 bg-muted  p-2 transition-all active:scale-90 ${
											current?.workspace.id === item.data.workspace.id
												? 'border-border shadow-xl'
												: 'border-border'
										}`}
									>
										<img
											className='mx-auto flex h-20 w-full rounded-2xl md:h-36'
											src={item.data.thumb}
										></img>

										<p className='poppins-font-family mt-2 text-foreground'>
											{item.name}
										</p>
										<p className='text-xs'>{item.user}</p>

										{current?.workspace.id === item.data.workspace.id && (
											<Button
												size='icon'
												variant='outline'
												className='absolute -left-1 -top-1 h-8 w-8 rounded-full border-none bg-muted'
												onClick={() => {
													handleDownloadTemplate(item.data);
												}}
											>
												<Download size={16} />
											</Button>
										)}
									</button>
								))}
						</>
					) : (
						<p className='text-muted-foreground mx-6 my-auto text-center text-xs md:mx-auto'>
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
					onChange={(ev) => {
						setQuery(ev.currentTarget.value);
					}}
					value={query}
					placeholder='Search templates...'
					className='flex w-full flex-auto'
				></Input>
			</CustomPortal>
		</div>
	);
};
