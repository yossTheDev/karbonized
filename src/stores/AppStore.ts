import { Action, action, createStore, persist } from 'easy-peasy';

interface Item {
	type: string;
}

export interface AppStoreModel {
	/* App States and Actions */
	ControlsTree: Item[];
	currentControlID: string;
	currentControlSize: { w: string; h: string };

	/* Workspace */
	workspaceName: string;
	workspaceColor: string;
	workspaceWidth: string;
	workspaceHeight: string;

	setControlSize: Action<AppStoreModel, { w: string; h: string }>;

	setWorkspaceName: Action<AppStoreModel, string>;
	setWorkspaceColor: Action<AppStoreModel, string>;
	setWorkspaceSize: Action<AppStoreModel, { height: string; width: string }>;
	addControl: Action<AppStoreModel, Item>;
	setcurrentControlID: Action<AppStoreModel, string>;
}

export const AppStore = createStore<AppStoreModel>({
	/* Store */
	ControlsTree: [{ type: 'code' }],
	currentControlID: '',
	currentControlSize: { w: '0', h: '0' },
	workspaceName: 'karbonized-code',
	workspaceColor: '#5895c8',
	workspaceHeight: '512',
	workspaceWidth: '512',

	setControlSize: action((state, payload) => {
		state.currentControlSize = payload;
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
