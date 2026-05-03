import { User, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import * as localforage from 'localforage';
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Portal } from 'react-portal';
import { AppContext } from '@/AppContext';
import { useWorkspaceStore, useProjectStore, useControlsStore } from '../stores';
import { getRandomNumber } from '../utils/getRandom';
import { WizardHeader } from '../components/Wizard/WizardHeader';
import { WizardActions } from '../components/Wizard/WizardActions';
import { UserTemplatesSection } from '../components/Wizard/UserTemplatesSection';
import { CommunityTemplatesSection } from '../components/Wizard/CommunityTemplatesSection';
import { CreateButtonOverlay } from '../components/Wizard/CreateButtonOverlay';

const mergeHistoryById = <T extends { id: string }>(
	current: T[],
	incoming: T[],
): T[] => {
	const byId = new Map(current.map((item) => [item.id, item]));
	incoming.forEach((item) => {
		byId.set(item.id, item);
	});
	return Array.from(byId.values());
};

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

	/* App Store */
	const loadProject = useProjectStore((state) => state.loadProject);
	const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
	const setCurrentWorkspace = useWorkspaceStore(
		(state) => state.setCurrentWorkspace,
	);
	const setCurrentControlID = useControlsStore(
		(state) => state.setCurrentControlID,
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
		if (current !== null) {
			const loadedProject = loadProject(current);

			useWorkspaceStore.setState((state) => ({
				...state,
				workspaces: [...state.workspaces, loadedProject.newWorkspace],
				currentWorkspaceID: loadedProject.workspaceId,
				currentWorkspace: loadedProject.newWorkspace,
			}));

			useControlsStore.setState((state) => ({
				...state,
				ControlProperties: mergeHistoryById(
					state.ControlProperties,
					loadedProject.initialProperties,
				),
			}));

			setCurrentControlID('');
		}

		setShowWizard(false);
	};

	return (
		// @ts-ignore
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
								<WizardHeader />

								{/* Content */}
								<div className='flex flex-auto flex-col gap-3 overflow-hidden p-4'>
									{/* Actions */}
									<WizardActions
										onCreateNewProject={handleCreateNewProject}
										onAddUserTemplate={handleAddUserTemplate}
									/>

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
										<CommunityTemplatesSection
											communityTemplates={communityTemplates}
											communityTemplateType={communityTemplateType}
											setCommunityTemplateType={setCommunityTemplateType}
											current={current}
											setCurrent={setCurrent}
											handleDownloadTemplate={handleDownloadTemplate}
										/>
									)}

									{/* User Templates */}
									{templateType === 'user' && (
										<UserTemplatesSection
											userTemplates={userTemplates}
											loadingUserTemplates={loadingUserTemplates}
											current={current}
											setCurrent={setCurrent}
											onDeleteUserTemplate={handleDeleteUserTemplate}
										/>
									)}
								</div>

								{/* Actions */}
								<CreateButtonOverlay
									current={current}
									onCreateFromTemplate={handleCreateFromTemplate}
								/>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>
		</Portal>
	);
};

export default ProjectWizard;
