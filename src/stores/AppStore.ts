import { Action, action, createStore, persist } from 'easy-peasy';

interface Item {
	type: string;
}

export interface AppStoreModel {
	/* App States and Actions */
	ControlsTree: Item[];
	currentControlID: string;
	readyToSave: boolean;

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

	workspaceName: 'karbonized-code',
	workspaceColor: '#5895c8',
	workspaceHeight: '512',
	workspaceWidth: '512',

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
