import {
	type Action,
	action,
	createStore,
	type Computed,
	computed,
} from 'easy-peasy';
import { getRandomNumber } from '../utils/getRandom';

export interface Item {
	id: string;
	type: string;
	name: string;
	isSelectable: boolean;
	isVisible: boolean;
	isDeleted: boolean;
	locked?: boolean;
	parentId?: string | null;
	collapsed?: boolean;
}

export interface Project {
	thumb?: string;
	properties: History[];
	workspace: Workspace;
}

interface History {
	id: string;
	value: any;
	workspace?: string;
}

interface Workspace {
	id: string;
	controls: Item[];
	workspaceName: string;
	workspaceColor: string;
	workspaceColorMode: string;
	workspaceType: string; // Color or Texture
	workspaceWidth: string;
	workspaceHeight: string;
	workspaceGradientSettings: { color1: string; color2: string; deg: number };
	workspaceDynamicSettings: { colors: string[]; seed: number };
	workspaceDynamicType: 'mesh' | 'lava'; // Type of dynamic background
	workspaceBlur: number;
	workspaceNoise: number;
	textureName: string;
	textureColors: { color1: string; color2: string };
}

interface LayerSnapshot {
	controls: Item[];
	currentControlID: string;
}

type LayerMovePosition = 'before' | 'after' | 'inside';
type LayerStepDirection = 'forward' | 'backward';
type LayerEdgePosition = 'front' | 'back';

const cloneControls = (controls: Item[]): Item[] =>
	controls.map((item) => ({ ...item }));

const normalizeParentId = (value?: string | null): string | null => value ?? null;

const getWorkspaceHistoryId = (workspaceId: string): string =>
	`workspace-structure-${workspaceId}`;

const getChildren = (controls: Item[], parentId?: string | null): Item[] =>
	controls.filter(
		(item) => normalizeParentId(item.parentId) === normalizeParentId(parentId),
	);

const getSubtreeIds = (controls: Item[], rootId: string): string[] => {
	const children = getChildren(controls, rootId);
	return [
		rootId,
		...children.flatMap((child) => getSubtreeIds(controls, child.id)),
	];
};

const moveItemBlock = (
	controls: Item[],
	draggedId: string,
	targetId: string,
	position: LayerMovePosition,
): Item[] => {
	if (draggedId === targetId) return controls;

	const draggedIds = new Set(getSubtreeIds(controls, draggedId));
	if (draggedIds.has(targetId)) return controls;

	const draggedBlock = controls.filter((item) => draggedIds.has(item.id));
	const remaining = controls.filter((item) => !draggedIds.has(item.id));
	const target = remaining.find((item) => item.id === targetId);

	if (draggedBlock.length === 0 || target === undefined) return controls;

	const nextParentId =
		position === 'inside'
			? target.id
			: normalizeParentId(target.parentId);

	const updatedBlock = draggedBlock.map((item) =>
		item.id === draggedId ? { ...item, parentId: nextParentId } : item,
	);

	let insertAt = remaining.length;

	if (position === 'before') {
		insertAt = remaining.findIndex((item) => item.id === targetId);
	} else {
		const targetSubtreeIds = new Set(getSubtreeIds(remaining, targetId));
		const lastIndex = remaining.reduce(
			(acc, item, index) => (targetSubtreeIds.has(item.id) ? index : acc),
			-1,
		);
		insertAt = lastIndex + 1;
	}

	if (insertAt < 0) return controls;

	return [
		...remaining.slice(0, insertAt),
		...updatedBlock,
		...remaining.slice(insertAt),
	];
};

const reorderAmongSiblings = (
	controls: Item[],
	controlId: string,
	direction: LayerStepDirection,
): Item[] => {
	const current = controls.find((item) => item.id === controlId);
	if (current === undefined) return controls;

	const siblings = controls.filter(
		(item) =>
			!item.isDeleted &&
			normalizeParentId(item.parentId) === normalizeParentId(current.parentId) &&
			item.id !== controlId,
	);
	const currentSiblings = controls.filter(
		(item) =>
			!item.isDeleted &&
			normalizeParentId(item.parentId) === normalizeParentId(current.parentId),
	);
	const index = currentSiblings.findIndex((item) => item.id === controlId);

	if (index === -1) return controls;
	if (direction === 'backward' && index === 0) return controls;
	if (direction === 'forward' && index === currentSiblings.length - 1)
		return controls;

	const target =
		direction === 'backward'
			? currentSiblings[index - 1]
			: currentSiblings[index + 1];

	if (target === undefined) return controls;

	return moveItemBlock(
		controls,
		controlId,
		target.id,
		direction === 'backward' ? 'before' : 'after',
	);
};

const moveToSiblingEdge = (
	controls: Item[],
	controlId: string,
	position: LayerEdgePosition,
): Item[] => {
	const current = controls.find((item) => item.id === controlId);
	if (current === undefined) return controls;

	const siblings = controls.filter(
		(item) =>
			!item.isDeleted &&
			normalizeParentId(item.parentId) === normalizeParentId(current.parentId),
	);
	if (siblings.length < 2) return controls;

	const target =
		position === 'back' ? siblings[0] : siblings[siblings.length - 1];

	if (target.id === controlId) return controls;

	return moveItemBlock(
		controls,
		controlId,
		target.id,
		position === 'back' ? 'before' : 'after',
	);
};

const createLayerSnapshot = (state: any): LayerSnapshot => {
	const workspace = state.workspaces.find(
		(item: Workspace) => item.id === state.currentWorkspaceID,
	);

	return {
		controls: cloneControls(workspace?.controls ?? []),
		currentControlID: state.currentControlID,
	};
};

const applyLayerSnapshot = (
	state: any,
	workspaceId: string,
	snapshot: LayerSnapshot,
): void => {
	state.workspaces = state.workspaces.map((item: Workspace) =>
		item.id === workspaceId
			? { ...item, controls: cloneControls(snapshot.controls) }
			: item,
	);
	state.currentControlID = snapshot.currentControlID;
};

const commitLayerMutation = (
	state: any,
	nextControls: Item[],
	nextSelection: string = state.currentControlID,
): void => {
	const historyId = getWorkspaceHistoryId(state.currentWorkspaceID);
	const previous = createLayerSnapshot(state);
	const nextSnapshot: LayerSnapshot = {
		controls: cloneControls(nextControls),
		currentControlID: nextSelection,
	};

	state.pastHistory = [...state.pastHistory, { id: historyId, value: previous }];
	state.futureHistory = [];
	state.controlState = { id: historyId, value: nextSnapshot };
	applyLayerSnapshot(state, state.currentWorkspaceID, nextSnapshot);
	state.readyToSave = true;
};

export interface AppStoreModel {
	/* App States and Actions */
	ControlsTree: Item[];
	History: History[];
	historySignal: 'redo' | 'undo' | '';
	currentControlID: string;
	readyToSave: boolean;
	editing: boolean;
	drag: boolean;
	crop: boolean;
	warp: boolean;
	isExporting: boolean;
	setDrag: Action<AppStoreModel, boolean>;
	setCrop: Action<AppStoreModel, boolean>;
	setWarp: Action<AppStoreModel, boolean>;
	setIsExporting: Action<AppStoreModel, boolean>;
	lockAspect: boolean;
	setLockAspect: Action<AppStoreModel, boolean>;

	/* Project System */
	saveProject: Computed<AppStoreModel, Project>;
	loadProject: Action<AppStoreModel, Project>;

	/* Workspace System */
	currentWorkspaceID: string;
	currentWorkspace: Computed<AppStoreModel, Workspace | undefined>;
	setCurrentWorkspace: Action<AppStoreModel, string>;
	deleteWorkspace: Action<AppStoreModel, string>;
	closeOtherWorkspaces: Action<AppStoreModel, string>;
	closeWorkspacesToRight: Action<AppStoreModel, string>;
	closeWorkspacesToLeft: Action<AppStoreModel, string>;
	workspaces: Workspace[];
	addWorkspace: Action<AppStoreModel, string>;
	setWorkspaceControls: Action<AppStoreModel, Item[]>;
	toggleControlVisibility: Action<AppStoreModel, string>;
	toggleControlLock: Action<AppStoreModel, string>;
	renameControl: Action<AppStoreModel, { id: string; name: string }>;
	deleteControl: Action<AppStoreModel, string>;
	duplicateControl: Action<AppStoreModel, string>;
	addGroup: Action<
		AppStoreModel,
		{ name?: string; parentId?: string | null; childIds?: string[] } | undefined
	>;
	groupControl: Action<AppStoreModel, string>;
	ungroupControl: Action<AppStoreModel, string>;
	toggleGroupCollapsed: Action<AppStoreModel, string>;
	moveControlLayer: Action<
		AppStoreModel,
		{ draggedId: string; targetId: string; position: LayerMovePosition }
	>;
	moveControlByStep: Action<
		AppStoreModel,
		{ id: string; direction: LayerStepDirection }
	>;
	moveControlToEdge: Action<
		AppStoreModel,
		{ id: string; position: LayerEdgePosition }
	>;

	/* Controls System */
	initialProperties: History[];
	ControlProperties: History[];
	currentControlProperties: Computed<AppStoreModel, History[]>;
	currentControl: Computed<AppStoreModel, Item | undefined>;
	setControlProperties: Action<AppStoreModel, History[]>;
	addControlProperty: Action<AppStoreModel, History>;
	addInitialProperty: Action<AppStoreModel, History>;
	removeInitialProperty: Action<AppStoreModel, string>;
	setControls: Action<AppStoreModel, Item[]>;
	controlsClass: Computed<AppStoreModel, string[]>;
	visibleControls: Computed<AppStoreModel, Item[]>;

	controlSize?: { w: number; h: number };
	controlPosition?: { x: number; y: number };
	controlTransform?: string;

	setControlTransform: Action<AppStoreModel, string>;
	setControlPosition: Action<AppStoreModel, { x: number; y: number }>;
	setControlSize: Action<AppStoreModel, { w: number; h: number }>;

	setEditing: Action<AppStoreModel, boolean>;
	setReadyToSave: Action<AppStoreModel, boolean>;

	/* Drawing System */
	isDrawing: boolean;
	setIsDrawing: Action<AppStoreModel, boolean>;
	isErasing: boolean;
	setIsErasing: Action<AppStoreModel, boolean>;
	lineWidth: number;
	strokeColor: string;
	setStrokeColor: Action<AppStoreModel, string>;
	setLineWidth: Action<AppStoreModel, number>;

	/* History System */
	addToHistory: Action<AppStoreModel, History>;
	setHistorySignal: Action<AppStoreModel, 'redo' | 'undo' | ''>;
	setControlState: Action<AppStoreModel, History | null>;
	redo: Action<AppStoreModel>;
	undo: Action<AppStoreModel>;

	futureHistory: History[];
	pastHistory: History[];
	controlState: History | null;
	setPast: Action<AppStoreModel, History[]>;
	setFuture: Action<AppStoreModel, History[]>;

	/* Tabs */
	workspaceMode: 'design' | 'edit' | 'zen' | 'custom';
	setWorkspaceMode: Action<AppStoreModel, 'design' | 'edit' | 'zen' | 'custom'>;
	selectedTab: 'hierarchy' | 'control' | 'workspace' | 'extensions';
	setSelectedTab: Action<
		AppStoreModel,
		'hierarchy' | 'control' | 'workspace' | 'extensions'
	>;

	/* Workspace */
	workspaceName: string;
	workspaceColor: string;
	workspaceColorMode: string;
	workspaceType: string; // Color or Texture
	workspaceWidth: string;
	workspaceHeight: string;
	workspaceGradientSettings: { color1: string; color2: string; deg: number };
	workspaceDynamicSettings: { colors: string[]; seed: number };
	workspaceDynamicType: 'mesh' | 'lava';
	workspaceBlur: number;
	workspaceNoise: number;
	setWorkspaceGradient: Action<
		AppStoreModel,
		{ color1: string; color2: string; deg: number }
	>;
	setWorkspaceDynamic: Action<
		AppStoreModel,
		{ colors: string[]; seed: number }
	>;
	setWorkspaceDynamicType: Action<AppStoreModel, 'mesh' | 'lava'>;
	setWorkspaceBlur: Action<AppStoreModel, number>;
	setWorkspaceNoise: Action<AppStoreModel, number>;
	generateDynamicSeed: Action<AppStoreModel, void>;
	textureName: string;
	textureColors: { color1: string; color2: string };
	setTextureName: Action<AppStoreModel, string>;
	setTextureColors: Action<AppStoreModel, { color1: string; color2: string }>;
	setWorkspaceColorMode: Action<AppStoreModel, string>;
	setWorkspaceName: Action<AppStoreModel, string>;
	setWorkspaceColor: Action<AppStoreModel, string>;
	setWorkspaceSize: Action<AppStoreModel, { height: string; width: string }>;
	setWorkspaceType: Action<AppStoreModel, string>;
	addControl: Action<AppStoreModel, Item>;
	setcurrentControlID: Action<AppStoreModel, string>;
	cleanWorkspace: Action<AppStoreModel>;
}

export const AppStore = createStore<AppStoreModel>({
	/* Store */
	ControlsTree: [],
	History: [],
	historySignal: '',
	readyToSave: false,
	currentControlID: '',
	editing: true,
	lockAspect: false,
	warp: false,
	isExporting: false,
	setWarp: action((state, payload) => {
		state.warp = payload;
	}),
	setIsExporting: action((state, payload) => {
		state.isExporting = payload;
	}),
	crop: false,
	setCrop: action((state, payload) => {
		state.crop = payload;
	}),
	drag: false,
	setDrag: action((state, payload) => {
		state.drag = payload;
	}),
	workspaceGradientSettings: { color1: '#00B4DB', color2: '#0083B0', deg: 98 },
	workspaceDynamicSettings: {
		colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
		seed: 1234,
	},
	workspaceDynamicType: 'mesh',
	workspaceBlur: 0,
	workspaceNoise: 0,

	/* Project System */
	saveProject: computed((state) => {
		if (state.currentWorkspace !== undefined) {
			const controls = state.currentWorkspace.controls.filter(
				(item) => !item.isDeleted,
			);
			const project: Project = {
				properties: state.ControlProperties.filter(
					(item) =>
						item.workspace === state.currentWorkspaceID &&
						controls.find(
							(i) =>
								item.id.split('-')[0] + '-' + item.id.split('-')[1] === i.id,
						),
				),
				workspace: {
					...state.currentWorkspace,
					controls: state.currentWorkspace.controls.filter(
						(item) => !item.isDeleted,
					),
				},
			};
			return project;
		} else {
			const emptyProject: Project = {
				properties: [],
				workspace: {} as any,
			};
			return emptyProject;
		}
	}),

	loadProject: action((state, project) => {
		state.initialProperties = [];
		state.currentControlID = '';

		/* Prepare a copy of the project */
		let lastProp = '';
		let newID = getRandomNumber();
		const wId = getRandomNumber();
		const props: Array<{ id: string; value: any; workspace: string }> = [];
		const controls: any[] = [];

		project.workspace.controls.forEach((item) => {
			project.properties
				.filter((items) => items.id.startsWith(item.id))
				.forEach((prop) => {
					if (
						lastProp !==
						item.id.split('-')[0] + '-' + item.id.split('-')[1]
					) {
						newID = getRandomNumber();
						props.push({
							id: prop.id.replace(
								prop.id,
								prop.id.split('-')[0] +
									'-' +
									newID +
									'-' +
									prop.id.split('-')[2],
							),
							value: prop.value,
							workspace: wId.toString(),
						});

						lastProp = prop.id.split('-')[0] + '-' + prop.id.split('-')[1];

						const newItem = project.workspace.controls.find(
							(control) =>
								control.id ===
								prop.id.split('-')[0] + '-' + prop.id.split('-')[1],
						);

						if (newItem !== undefined) {
							controls.push({
								...newItem,
								id: prop.id.split('-')[0] + '-' + newID,
							});
						}

						console.log('item');
					} else {
						props.push({
							id: prop.id.replace(
								prop.id,
								prop.id.split('-')[0] +
									'-' +
									newID +
									'-' +
									prop.id.split('-')[2],
							),
							value: prop.value,
							workspace: wId.toString(),
						});

						lastProp = prop.id.split('-')[0] + '-' + prop.id.split('-')[1];
					}
				});
		});

		const copy: Project = {
			properties: props,
			workspace: {
				...project.workspace,
				id: wId.toString(),
				controls,
			},
		};

		/* Set Initial Properties */
		state.initialProperties = copy.properties;

		/* Add New Workspace */
		state.workspaces = [
			...state.workspaces,
			{
				...copy.workspace,
				id: wId.toString(),
			},
		];

		state.currentWorkspaceID = wId.toString();
	}),

	/* Workspace System */
	workspaces: [
		{
			id: '----',
			controls: [],
			workspaceColor: '#ffffff',
			workspaceHeight: '720',
			workspaceWidth: '1280',
			workspaceColorMode: 'Single',
			workspaceName: 'Workspace 1',
			workspaceType: 'color',
			workspaceGradientSettings: {
				color1: '#00B4DB',
				color2: '#0083B0',
				deg: 98,
			},
			workspaceDynamicSettings: {
				colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
				seed: 1234,
			},
			workspaceDynamicType: 'mesh',
			workspaceBlur: 0,
			workspaceNoise: 0,
			textureName: 'grayrate',
			textureColors: { color1: '#409ccf', color2: '#136179' },
		},
	],
	currentWorkspaceID: '----',
	addWorkspace: action((state, payload) => {
		if (payload === '') {
			state.workspaces = [
				...state.workspaces,
				{
					id: getRandomNumber().toString(),
					controls: [],
					workspaceColor: '#ffffff',
					workspaceHeight: '720',
					workspaceWidth: '1280',
					workspaceColorMode: 'Single',
					workspaceName: 'Workspace ' + (state.workspaces.length + 1),
					workspaceType: 'color',
					workspaceGradientSettings: {
						color1: '#00B4DB',
						color2: '#0083B0',
						deg: 98,
					},
					workspaceDynamicSettings: {
						colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
						seed: 1234,
					},
					workspaceDynamicType: 'mesh',
					workspaceBlur: 0,
					workspaceNoise: 0,
					textureName: 'grayrate',
					textureColors: { color1: '#409ccf', color2: '#136179' },
				},
			];
		} else {
			state.workspaces = [
				...state.workspaces,
				{
					id: payload,
					controls: [],
					workspaceColor: '#ffffff',
					workspaceHeight: '720',
					workspaceWidth: '1280',
					workspaceColorMode: 'Single',
					workspaceName: 'Workspace ' + (state.workspaces.length + 1),
					workspaceType: 'color',
					workspaceGradientSettings: {
						color1: '#00B4DB',
						color2: '#0083B0',
						deg: 98,
					},
					workspaceDynamicSettings: {
						colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
						seed: 1234,
					},
					workspaceDynamicType: 'mesh',
					workspaceBlur: 0,
					workspaceNoise: 0,
					textureName: 'grayrate',
					textureColors: { color1: '#409ccf', color2: '#136179' },
				},
			];
		}
	}),
	setCurrentWorkspace: action((state, payload) => {
		state.currentWorkspaceID = payload;
		state.currentControlID = '';
	}),
	deleteWorkspace: action((state, payload) => {
		if (state.workspaces.length > 1) {
			state.currentControlID = '';

			const newIndex = state.workspaces.findIndex(
				(item) => item.id === payload,
			);

			if (newIndex > 0) {
				state.workspaces = state.workspaces.filter(
					(item) => item.id !== payload,
				);

				state.currentWorkspace = state.workspaces[newIndex - 1];
				state.currentWorkspaceID = state.workspaces[newIndex - 1].id;
			} else if (newIndex === 0) {
				state.workspaces = state.workspaces.filter(
					(item) => item.id !== payload,
				);

				state.currentWorkspace = state.workspaces[newIndex];
				state.currentWorkspaceID = state.workspaces[newIndex].id;
			}
		} else {
			alert('You need at least one Workspace');
		}
	}),
	closeOtherWorkspaces: action((state, payload) => {
		if (state.workspaces.length > 1) {
			state.currentControlID = '';
			state.workspaces = state.workspaces.filter(
				(item) => item.id === payload,
			);
			state.currentWorkspaceID = payload;
		}
	}),
	closeWorkspacesToRight: action((state, payload) => {
		const currentIndex = state.workspaces.findIndex(
			(item) => item.id === payload,
		);
		if (currentIndex !== -1 && currentIndex < state.workspaces.length - 1) {
			state.workspaces = state.workspaces.slice(0, currentIndex + 1);
		}
	}),
	closeWorkspacesToLeft: action((state, payload) => {
		const currentIndex = state.workspaces.findIndex(
			(item) => item.id === payload,
		);
		if (currentIndex > 0) {
			state.currentControlID = '';
			state.workspaces = state.workspaces.slice(currentIndex);
			state.currentWorkspaceID = payload;
		}
	}),

	currentWorkspace: computed((state) => {
		return state.workspaces.find(
			(item) => item.id === state.currentWorkspaceID,
		);
	}),

	/* Controls System */
	initialProperties: [],
	addInitialProperty: action((state, payload) => {
		state.initialProperties.push({
			...payload,
			workspace: state.currentWorkspaceID,
		});
	}),
	removeInitialProperty: action((state, id) => {
		state.initialProperties = state.initialProperties.filter(
			(item) => item.id !== id,
		);
	}),
	ControlProperties: [],
	currentControlProperties: computed((state) => {
		return state.ControlProperties.filter((item) =>
			item.id.includes(state.currentControlID),
		);
	}),
	currentControl: computed((state) => {
		return state.currentWorkspace?.controls.find(
			(item) => item.id === state.currentControlID,
		);
	}),
	addControlProperty: action((state, payload) => {
		const element = state.ControlProperties.filter(
			(item) => item.id === payload.id,
		);

		if (element.length === 0) {
			state.ControlProperties.push({
				...payload,
				workspace: state.currentWorkspaceID,
			});
		} else {
			state.ControlProperties = state.ControlProperties.map((item) =>
				item.id === payload.id
					? {
							id: payload.id,
							value: payload.value,
							workspace: state.currentWorkspaceID,
						}
					: item,
			);
		}
	}),
	setControlProperties: action((state, payload) => {
		state.ControlProperties = payload;
	}),
	setControls: action((state, items) => {
		/* state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, controls: items }
				: item,
		); */
		/* state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, controls: items }
				: item,
		); */
		// state.ControlsTree = items;
	}),

	setWorkspaceControls: action((state, items) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, controls: items }
				: item,
		);
		state.readyToSave = true;
	}),
	toggleControlVisibility: action((state, controlId) => {
		const currentWorkspace = state.currentWorkspace;
		const target = currentWorkspace?.controls.find((item) => item.id === controlId);

		if (currentWorkspace === undefined || target === undefined) return;

		const subtreeIds = new Set(getSubtreeIds(currentWorkspace.controls, controlId));
		const nextVisibility = !target.isVisible;
		const nextControls = currentWorkspace.controls.map((item) =>
			subtreeIds.has(item.id) ? { ...item, isVisible: nextVisibility } : item,
		);
		const nextSelection =
			!nextVisibility && subtreeIds.has(state.currentControlID)
				? ''
				: state.currentControlID;

		commitLayerMutation(state, nextControls, nextSelection);
	}),
	toggleControlLock: action((state, controlId) => {
		const currentWorkspace = state.currentWorkspace;
		const target = currentWorkspace?.controls.find((item) => item.id === controlId);

		if (currentWorkspace === undefined || target === undefined) return;

		const subtreeIds = new Set(getSubtreeIds(currentWorkspace.controls, controlId));
		const nextLocked = !target.locked;
		const nextControls = currentWorkspace.controls.map((item) =>
			subtreeIds.has(item.id) ? { ...item, locked: nextLocked } : item,
		);

		commitLayerMutation(state, nextControls);
	}),
	renameControl: action((state, payload) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const nextName = payload.name.trim();
		if (nextName === '') return;

		const nextControls = currentWorkspace.controls.map((item) =>
			item.id === payload.id ? { ...item, name: nextName } : item,
		);

		commitLayerMutation(state, nextControls);
	}),
	deleteControl: action((state, controlId) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const subtreeIds = new Set(getSubtreeIds(currentWorkspace.controls, controlId));
		const nextControls = currentWorkspace.controls.map((item) =>
			subtreeIds.has(item.id)
				? { ...item, isDeleted: true, isVisible: false }
				: item,
		);
		const nextSelection = subtreeIds.has(state.currentControlID)
			? ''
			: state.currentControlID;

		commitLayerMutation(state, nextControls, nextSelection);
	}),
	duplicateControl: action((state, controlId) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const subtreeIds = getSubtreeIds(currentWorkspace.controls, controlId);
		const subtreeItems = currentWorkspace.controls.filter((item) =>
			subtreeIds.includes(item.id),
		);
		if (subtreeItems.length === 0) return;

		const idMap = new Map<string, string>();
		subtreeItems.forEach((item) => {
			idMap.set(item.id, `${item.type}-${getRandomNumber()}`);
		});

		const duplicatedItems = subtreeItems.map((item) => {
			const nextId = idMap.get(item.id) ?? item.id;
			const isRoot = item.id === controlId;
			const mappedParentId = item.parentId ? idMap.get(item.parentId) : null;

			return {
				...item,
				id: nextId,
				name: isRoot ? `${item.name} copy` : item.name,
				parentId: mappedParentId ?? item.parentId ?? null,
				collapsed: item.type === 'group' ? false : item.collapsed,
			};
		});

		const subtreeIdSet = new Set(subtreeIds);
		const targetIndex =
			currentWorkspace.controls.reduce(
				(acc, item, index) => (subtreeIdSet.has(item.id) ? index : acc),
				-1,
			) + 1;
		const nextControls = [
			...currentWorkspace.controls.slice(0, targetIndex),
			...duplicatedItems,
			...currentWorkspace.controls.slice(targetIndex),
		];

		state.ControlProperties = [
			...state.ControlProperties,
			...state.ControlProperties.flatMap((property) => {
				const [type, originalId, propName] = property.id.split('-');
				const originalControlId = `${type}-${originalId}`;
				const nextControlId = idMap.get(originalControlId);

				if (nextControlId === undefined || propName === undefined) return [];

				return [
					{
						...property,
						id: `${nextControlId}-${propName}`,
						workspace: state.currentWorkspaceID,
					},
				];
			}),
		];

		commitLayerMutation(
			state,
			nextControls,
			idMap.get(controlId) ?? state.currentControlID,
		);
	}),
	addGroup: action((state, payload) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const children = payload?.childIds ?? [];
		const groupId = `group-${getRandomNumber()}`;
		const firstChildId = children[0];
		const firstChildIndex = currentWorkspace.controls.findIndex(
			(item) => item.id === firstChildId,
		);
		const group: Item = {
			id: groupId,
			type: 'group',
			name: payload?.name?.trim() || `Group ${getRandomNumber()}`,
			isSelectable: false,
			isVisible: true,
			isDeleted: false,
			locked: false,
			parentId: payload?.parentId ?? null,
			collapsed: false,
		};

		let nextControls = cloneControls(currentWorkspace.controls);

		if (children.length > 0) {
			nextControls = nextControls.map((item) =>
				children.includes(item.id) ? { ...item, parentId: groupId } : item,
			);
		}

		if (firstChildIndex >= 0) {
			nextControls = [
				...nextControls.slice(0, firstChildIndex),
				group,
				...nextControls.slice(firstChildIndex),
			];
		} else {
			nextControls = [...nextControls, group];
		}

		commitLayerMutation(state, nextControls, groupId);
	}),
	groupControl: action((state, controlId) => {
		const currentWorkspace = state.currentWorkspace;
		const target = currentWorkspace?.controls.find((item) => item.id === controlId);
		if (currentWorkspace === undefined || target === undefined) return;

		const groupId = `group-${getRandomNumber()}`;
		const targetIndex = currentWorkspace.controls.findIndex(
			(item) => item.id === controlId,
		);
		const group: Item = {
			id: groupId,
			type: 'group',
			name: `${target.name} group`,
			isSelectable: false,
			isVisible: true,
			isDeleted: false,
			locked: false,
			parentId: target.parentId ?? null,
			collapsed: false,
		};

		const updatedControls = currentWorkspace.controls.map((item) =>
			item.id === controlId ? { ...item, parentId: groupId } : item,
		);
		const nextControls = [
			...updatedControls.slice(0, targetIndex),
			group,
			...updatedControls.slice(targetIndex),
		];

		commitLayerMutation(state, nextControls, groupId);
	}),
	ungroupControl: action((state, groupId) => {
		const currentWorkspace = state.currentWorkspace;
		const group = currentWorkspace?.controls.find((item) => item.id === groupId);
		if (
			currentWorkspace === undefined ||
			group === undefined ||
			group.type !== 'group'
		)
			return;

		const nextControls = currentWorkspace.controls
			.filter((item) => item.id !== groupId)
			.map((item) =>
				item.parentId === groupId ? { ...item, parentId: group.parentId ?? null } : item,
			);
		const nextSelection = state.currentControlID === groupId ? '' : state.currentControlID;

		commitLayerMutation(state, nextControls, nextSelection);
	}),
	toggleGroupCollapsed: action((state, controlId) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const nextControls = currentWorkspace.controls.map((item) =>
			item.id === controlId && item.type === 'group'
				? { ...item, collapsed: !item.collapsed }
				: item,
		);

		commitLayerMutation(state, nextControls, state.currentControlID);
	}),
	moveControlLayer: action((state, payload) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const nextControls = moveItemBlock(
			currentWorkspace.controls,
			payload.draggedId,
			payload.targetId,
			payload.position,
		);

		if (nextControls !== currentWorkspace.controls) {
			commitLayerMutation(state, nextControls);
		}
	}),
	moveControlByStep: action((state, payload) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const nextControls = reorderAmongSiblings(
			currentWorkspace.controls,
			payload.id,
			payload.direction,
		);

		if (nextControls !== currentWorkspace.controls) {
			commitLayerMutation(state, nextControls);
		}
	}),
	moveControlToEdge: action((state, payload) => {
		const currentWorkspace = state.currentWorkspace;
		if (currentWorkspace === undefined) return;

		const nextControls = moveToSiblingEdge(
			currentWorkspace.controls,
			payload.id,
			payload.position,
		);

		if (nextControls !== currentWorkspace.controls) {
			commitLayerMutation(state, nextControls);
		}
	}),
	controlsClass: computed((state) => {
		const controlsClass: string[] = [];

		state.currentWorkspace?.controls.forEach((item) => {
			if (item.id !== state.currentControlID)
				controlsClass.push('.block-' + item.id);
		});

		return controlsClass;
	}),

	visibleControls: computed((state) => {
		return (
			state.currentWorkspace?.controls?.filter((item) => !item.isDeleted) ?? []
		);
	}),

	/* History System */
	controlState: null,
	futureHistory: [],
	pastHistory: [],

	setControlState: action((state, payload) => {
		state.controlState = payload;
	}),
	addToHistory: action((state, payload) => {
		state.History = [payload, ...state.History];
	}),
	setHistorySignal: action((state, payload) => {
		state.historySignal = payload;
	}),
	redo: action((state) => {
		if (state.futureHistory.length > 0) {
			const next = state.futureHistory[0];
			const newFuture = state.futureHistory.slice(1);
			const item: History = {
				id: state.controlState?.id as unknown as string,
				value: state.controlState?.value,
			};
			state.pastHistory = [...state.pastHistory, item];
			state.futureHistory = newFuture;
			state.controlState = next;
			if (next.id === getWorkspaceHistoryId(state.currentWorkspaceID)) {
				applyLayerSnapshot(
					state,
					state.currentWorkspaceID,
					next.value as LayerSnapshot,
				);
			}
			state.editing = true;
		}
	}),
	undo: action((state) => {
		if (state.pastHistory.length > 0) {
			const previous = state.pastHistory[state.pastHistory.length - 1];

			const newPast = state.pastHistory.slice(0, state.pastHistory.length - 1);

			/* if (
				state.pastHistory[state.pastHistory.length - 1] &&
				state.pastHistory[state.pastHistory.length - 2] &&
				state.pastHistory[state.pastHistory.length - 1].value !==
					state.pastHistory[state.pastHistory.length - 2].value
			) {
				newPast = state.pastHistory.slice(0, state.pastHistory.length - 1);
			} else {
				newPast = state.pastHistory.slice(0, state.pastHistory.length - 2);
				previous = state.pastHistory[state.pastHistory.length - 2];
			}

			if (
				state.pastHistory[state.pastHistory.length - 3] &&
				(state.pastHistory[state.pastHistory.length - 1].value ===
					state.pastHistory[state.pastHistory.length - 2].value) ===
					state.pastHistory[state.pastHistory.length - 3].value
			) {
				previous = state.pastHistory[state.pastHistory.length - 3];
			} */

			state.pastHistory = newPast;

			const item: History = {
				id: state.controlState?.id as unknown as string,
				value: state.controlState?.value,
			};
			state.futureHistory = [item, ...state.futureHistory];
			state.controlState = previous;
			if (previous.id === getWorkspaceHistoryId(state.currentWorkspaceID)) {
				applyLayerSnapshot(
					state,
					state.currentWorkspaceID,
					previous.value as LayerSnapshot,
				);
			}
			state.editing = true;
		}
	}),

	setPast: action((state, payload) => {
		state.pastHistory = payload;
	}),
	setFuture: action((state, payload) => {
		state.futureHistory = payload;
	}),

	/* Drawing System  */
	isDrawing: false,
	strokeColor: '#4582ba',
	lineWidth: 20,
	setIsDrawing: action((state, payload) => {
		state.isDrawing = payload;
	}),
	isErasing: false,
	setIsErasing: action((state, payload) => {
		state.isErasing = payload;
	}),
	setLineWidth: action((state, payload) => {
		state.lineWidth = payload;
	}),
	setStrokeColor: action((state, payload) => {
		state.strokeColor = payload;
	}),
	/* Tabs */
	selectedTab: 'hierarchy',
	setSelectedTab: action((state, payload) => {
		state.selectedTab = payload;
	}),

	workspaceMode: 'zen',
	setWorkspaceMode: action((state, payload) => {
		state.workspaceMode = payload;
	}),

	/* Workspace */
	workspaceName: 'karbonized-image',
	workspaceType: 'color', // Color or Texture
	workspaceColor: '#ffffff',
	workspaceColorMode: 'Single', // Single or Gradient
	workspaceHeight: '512',
	workspaceWidth: '512',

	textureName: 'grayrate',
	textureColors: { color1: '#409ccf', color2: '#136179' },

	setTextureColors: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, textureColors: payload }
				: item,
		);
	}),
	setTextureName: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, textureName: payload }
				: item,
		);
	}),

	setWorkspaceType: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceType: payload }
				: item,
		);
	}),

	setWorkspaceGradient: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceGradientSettings: payload }
				: item,
		);
	}),

	setWorkspaceDynamic: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceDynamicSettings: payload }
				: item,
		);
	}),

	setWorkspaceDynamicType: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceDynamicType: payload }
				: item,
		);
	}),

	setWorkspaceBlur: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceBlur: payload }
				: item,
		);
	}),

	setWorkspaceNoise: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceNoise: payload }
				: item,
		);
	}),

	generateDynamicSeed: action((state) => {
		const newSeed = Math.floor(Math.random() * 10000);
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? {
						...item,
						workspaceDynamicSettings: {
							...item.workspaceDynamicSettings,
							seed: newSeed,
						},
					}
				: item,
		);
	}),

	setWorkspaceColorMode: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceColorMode: payload }
				: item,
		);
	}),

	setLockAspect: action((state, payload) => {
		state.lockAspect = payload;
	}),

	setControlSize: action((state, payload) => {
		state.controlSize = payload;
	}),

	setControlPosition: action((state, payload) => {
		state.controlPosition = payload;
	}),

	setControlTransform: action((state, payload) => {
		state.controlTransform = payload;
	}),

	setEditing: action((state, payload) => {
		state.editing = payload;
	}),
	setReadyToSave: action((state, payload) => {
		state.readyToSave = payload;
	}),

	setWorkspaceColor: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceColor: payload }
				: item,
		);
	}),
	setWorkspaceName: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, workspaceName: payload }
				: item,
		);
	}),
	setWorkspaceSize: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? {
						...item,
						workspaceHeight: payload.height,
						workspaceWidth: payload.width,
					}
				: item,
		);
	}),
	addControl: action((state, payload) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? {
						...item,
						controls: [
							...item.controls,
							{
								locked: false,
								parentId: null,
								collapsed: false,
								...payload,
							},
						],
				  }
				: item,
		);
		state.readyToSave = true;
	}),

	cleanWorkspace: action((state, payload) => {
		state.currentControlID = '';
		state.ControlProperties = [];
		state.ControlProperties = state.ControlProperties.filter(
			(item) => item.workspace !== state.currentWorkspaceID,
		);

		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID ? { ...item, controls: [] } : item,
		);
	}),

	setcurrentControlID: action((state, payload) => {
		state.currentControlID = payload;
	}),
});
