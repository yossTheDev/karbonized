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

	controlSize?: { w: number; h: number };
	controlPosition?: { x: number; y: number };

	setControlPosition: Action<AppStoreModel, { x: number; y: number }>;
	setControlSize: Action<AppStoreModel, { w: number; h: number }>;

	setEditing: Action<AppStoreModel, boolean>;
	setReadyToSave: Action<AppStoreModel, boolean>;

	/* Workspace */
	workspaceName: string;
	workspaceColor: string;
	workspaceWidth: string;
	workspaceHeight: string;

	setWorkspaceName: Action<AppStoreModel, string>;
	setWorkspaceColor: Action<AppStoreModel, string>;
	setWorkspaceSize: Action<AppStoreModel, { height: string; width: string }>;
	addControl: Action<AppStoreModel, Item>;
	setcurrentControlID: Action<AppStoreModel, string>;
}

export const AppStore = createStore<AppStoreModel>({
	/* Store */
	ControlsTree: [{ type: 'code' }],
	readyToSave: false,
	currentControlID: '',
	editing: true,

	workspaceName: 'karbonized-code',
	workspaceColor: '#5895c8',
	workspaceHeight: '512',
	workspaceWidth: '512',

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

	setcurrentControlID: action((state, payload) => {
		state.currentControlID = payload;
	}),
});