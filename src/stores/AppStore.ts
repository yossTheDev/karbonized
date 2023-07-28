import { Action, action, createStore, Computed, computed } from 'easy-peasy';
import { getRandomNumber } from '../utils/getRandom';

export interface Item {
	id: string;
	type: string;
	name: string;
	isSelectable: boolean;
	isVisible: boolean;
	isDeleted: boolean;
}

interface History {
	id: string;
	value: any;
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
	textureName: string;
	textureColors: { color1: string; color2: string };
}

export interface AppStoreModel {
	/* App States and Actions */
	ControlsTree: Item[];
	History: History[];
	historySignal: 'redo' | 'undo' | '';
	currentControlID: string;
	readyToSave: boolean;
	editing: boolean;
	lockAspect: boolean;
	setLockAspect: Action<AppStoreModel, boolean>;

	/* Workspace System */
	currentWorkspaceID: string;
	currentWorkspace: Computed<AppStoreModel, Workspace>;
	setCurrentWorkspace: Action<AppStoreModel, string>;
	deleteWorkspace: Action<AppStoreModel, string>;
	workspaces: Workspace[];
	addWorkspace: Action<AppStoreModel, string>;
	setWorkspaceControls: Action<AppStoreModel, Item[]>;

	/* Controls System */
	initialProperties: History[];
	ControlProperties: History[];
	currentControlProperties: Computed<AppStoreModel, History[]>;
	setControlProperties: Action<AppStoreModel, History[]>;
	addControlProperty: Action<AppStoreModel, History>;
	addInitialProperty: Action<AppStoreModel, History>;
	removeInitialProperty: Action<AppStoreModel, string>;
	setControls: Action<AppStoreModel, Item[]>;
	controlsClass: Computed<AppStoreModel, string[]>;
	visibleControls: Computed<AppStoreModel, Item[]>;

	controlSize?: { w: number; h: number };
	controlPosition?: { x: number; y: number };

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
	selectedTab: 'hierarchy' | 'control' | 'workspace';
	setSelectedTab: Action<AppStoreModel, 'hierarchy' | 'control' | 'workspace'>;

	/* Workspace */
	workspaceName: string;
	workspaceColor: string;
	workspaceColorMode: string;
	workspaceType: string; // Color or Texture
	workspaceWidth: string;
	workspaceHeight: string;
	workspaceGradientSettings: { color1: string; color2: string; deg: number };
	setWorkspaceGradient: Action<
		AppStoreModel,
		{ color1: string; color2: string; deg: number }
	>;
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

	workspaceGradientSettings: { color1: '#00B4DB', color2: '#0083B0', deg: 98 },

	/* Workspace System */
	workspaces: [
		{
			id: '----',
			controls: [],
			workspaceColor: '#019091',
			workspaceHeight: '512',
			workspaceWidth: '512',
			workspaceColorMode: 'Gradient',
			workspaceName: 'Workspace 1',
			workspaceType: 'color',
			workspaceGradientSettings: {
				color1: '#00B4DB',
				color2: '#0083B0',
				deg: 98,
			},
			textureName: 'grayrate',
			textureColors: { color1: '#409ccf', color2: '#136179' },
		},
	],
	currentWorkspaceID: '----',
	addWorkspace: action((state, payload) => {
		state.workspaces = [
			...state.workspaces,
			{
				id: getRandomNumber().toString(),
				controls: [],
				workspaceColor: '#019091',
				workspaceHeight: '512',
				workspaceWidth: '512',
				workspaceColorMode: 'Gradient',
				workspaceName: 'Workspace ' + (state.workspaces.length + 1),
				workspaceType: 'color',
				workspaceGradientSettings: {
					color1: '#00B4DB',
					color2: '#0083B0',
					deg: 98,
				},
				textureName: 'grayrate',
				textureColors: { color1: '#409ccf', color2: '#136179' },
			},
		];
	}),
	setCurrentWorkspace: action((state, payload) => {
		state.currentWorkspaceID = payload;
		state.currentControlID = '';
	}),
	deleteWorkspace: action((state, payload) => {
		state.currentWorkspaceID = '----';
		state.currentWorkspace = state.workspaces[0];
		state.workspaces = state.workspaces.filter((item) => item.id !== payload);
	}),

	currentWorkspace: computed((state) => {
		return state.workspaces.find(
			(item) => item.id === state.currentWorkspaceID,
		) as any;
	}),

	/* Controls System */
	initialProperties: [],
	addInitialProperty: action((state, payload) => {
		state.initialProperties.push(payload);
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
	addControlProperty: action((state, payload) => {
		const element = state.ControlProperties.filter(
			(item) => item.id === payload.id,
		);

		if (element.length === 0) {
			state.ControlProperties.push(payload);
		} else {
			state.ControlProperties = state.ControlProperties.map((item) =>
				item.id === payload.id
					? { id: payload.id, value: payload.value }
					: item,
			);
		}
	}),
	setControlProperties: action((state, payload) => {
		state.ControlProperties = payload;
	}),
	setControls: action((state, items) => {
		/*state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, controls: items }
				: item,
		);*/
		/*state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, controls: items }
				: item,
		);*/
		//state.ControlsTree = items;
	}),

	setWorkspaceControls: action((state, items) => {
		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID
				? { ...item, controls: items }
				: item,
		);
	}),
	controlsClass: computed((state) => {
		const controlsClass: string[] = [];

		state.ControlsTree.forEach((item) => {
			if (item.id !== state.currentControlID)
				controlsClass.push('.block-' + item.id);
		});

		return controlsClass;
	}),

	visibleControls: computed((state) => {
		return state.currentWorkspace.controls.filter((item) => !item.isDeleted);
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
			state.editing = true;
		}
	}),
	undo: action((state) => {
		if (state.pastHistory.length > 0) {
			let previous = state.pastHistory[state.pastHistory.length - 1];

			let newPast = state.pastHistory.slice(0, state.pastHistory.length - 1);

			/*if (
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
			}*/

			state.pastHistory = newPast;

			const item: History = {
				id: state.controlState?.id as unknown as string,
				value: state.controlState?.value,
			};
			state.futureHistory = [item, ...state.futureHistory];
			state.controlState = previous;
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
	workspaceColor: '#6ebb45',
	workspaceColorMode: 'Gradient', // Single or Gradient
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
				? { ...item, controls: [...item.controls, payload] }
				: item,
		);
	}),

	cleanWorkspace: action((state, payload) => {
		state.currentControlID = '';

		state.workspaces = state.workspaces.map((item) =>
			item.id === state.currentWorkspaceID ? { ...item, controls: [] } : item,
		);
	}),

	setcurrentControlID: action((state, payload) => {
		state.currentControlID = payload;
	}),
});
