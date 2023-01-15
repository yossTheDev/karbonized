import { Action, action, createStore, persist } from 'easy-peasy';
import React, { ReactElement } from 'react';

interface Item {
	type: string;
}

export interface AppStoreModel {
	/* App States and Actions */
	ControlsTree: Item[];
	currentControlID: string;
	workspaceColor: string;

	setWorkspaceColor: Action<AppStoreModel, string>;
	addControl: Action<AppStoreModel, Item>;
	setcurrentControlID: Action<AppStoreModel, string>;
}

export const AppStore = createStore<AppStoreModel>({
	/* Store */
	ControlsTree: [{ type: 'code' }],
	currentControlID: '',
	workspaceColor: '#5895c8',

	setWorkspaceColor: action((state, payload) => {
		state.workspaceColor = payload;
	}),
	addControl: action((state, payload) => {
		state.ControlsTree.push(payload);
	}),

	setcurrentControlID: action((state, payload) => {
		state.currentControlID = payload;
	}),
});
