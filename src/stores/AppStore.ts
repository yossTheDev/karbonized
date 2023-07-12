import { Action, action, createStore } from 'easy-peasy';

interface Item {
	type: string;
}

interface History {
	id: string;
	value: any;
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

	controlSize?: { w: number; h: number };
	controlPosition?: { x: number; y: number };

	setControlPosition: Action<AppStoreModel, { x: number; y: number }>;
	setControlSize: Action<AppStoreModel, { w: number; h: number }>;

	setEditing: Action<AppStoreModel, boolean>;
	setReadyToSave: Action<AppStoreModel, boolean>;

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
	selectedTab: 'workspace' | 'control';
	setSelectedTab: Action<AppStoreModel, 'workspace' | 'control'>;

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
	ControlsTree: [{ type: 'code' }],
	History: [{ id: '-', value: '-' }],
	historySignal: '',
	readyToSave: false,
	currentControlID: '',
	editing: true,
	lockAspect: false,
	workspaceGradientSettings: { color1: '#ff9a9e', color2: '#ff26ba', deg: 98 },

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
			state.pastHistory = [...state.pastHistory, state.controlState?.value];
			state.futureHistory = newFuture;
			state.controlState = next;
		}
	}),
	undo: action((state, payload) => {
		if (state.pastHistory.length > 0) {
			const previous = state.pastHistory[state.pastHistory.length - 1];
			const newPast = state.pastHistory.slice(0, state.pastHistory.length - 1);
			state.pastHistory = newPast;
			state.futureHistory = [state.controlState?.value, ...state.futureHistory];
			state.controlState = previous;
			// setState(previous);
		}
	}),

	setPast: action((state, payload) => {
		state.pastHistory = payload;
	}),
	setFuture: action((state, payload) => {
		state.futureHistory = payload;
	}),
	/* Tabs */
	selectedTab: 'control',
	setSelectedTab: action((state, payload) => {
		state.selectedTab = payload;
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
		state.textureColors = payload;
	}),
	setTextureName: action((state, payload) => {
		state.textureName = payload;
	}),

	setWorkspaceType: action((state, payload) => {
		state.workspaceType = payload;
	}),

	setWorkspaceGradient: action((state, payload) => {
		state.workspaceGradientSettings = payload;
	}),

	setWorkspaceColorMode: action((state, payload) => {
		state.workspaceColorMode = payload;
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
		state.workspaceColor = payload;
	}),
	setWorkspaceName: action((state, payload) => {
		state.workspaceName = payload;
	}),
	setWorkspaceSize: action((state, payload) => {
		state.workspaceHeight = payload.height;
		state.workspaceWidth = payload.width;
	}),
	addControl: action((state, payload) => {
		state.ControlsTree.push(payload);
	}),

	cleanWorkspace: action((state, payload) => {
		state.ControlsTree = [];
	}),

	setcurrentControlID: action((state, payload) => {
		state.currentControlID = payload;
	}),
});
