import { Action, action, createStore, persist } from 'easy-peasy';

interface Item {
	type: string;
}

export interface AppStoreModel {
	/* App States and Actions */
	ControlsTree: Item[];
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
	readyToSave: false,
	currentControlID: '',
	editing: true,
	lockAspect: false,
	workspaceGradientSettings: { color1: '#bf86da', color2: '#144ab4', deg: 98 },

	/* Tabs */
	selectedTab: 'control',
	setSelectedTab: action((state, payload) => {
		state.selectedTab = payload;
	}),

	/* Workspace */
	workspaceName: 'karbonized-image',
	workspaceType: 'color', // Color or Texture
	workspaceColor: '#6ebb45',
	workspaceColorMode: 'Single', // Single or Gradient
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
