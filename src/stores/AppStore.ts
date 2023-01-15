import { Action, action, createStore, persist } from 'easy-peasy';
import React, { ReactElement } from 'react';

interface Item {
	type: string;
}

export interface AppStoreModel {
	/* Calculator States and Actions */
	ControlsTree: Item[];
	currentControlID: string;

	addControl: Action<AppStoreModel, Item>;
	setcurrentControlID: Action<AppStoreModel, string>;
}

export const AppStore = createStore<AppStoreModel>({
	/* Store */
	ControlsTree: [{ type: 'code' }],
	currentControlID: '',

	addControl: action((state, payload) => {
		state.ControlsTree.push(payload);
	}),

	setcurrentControlID: action((state, payload) => {
		state.currentControlID = payload;
	}),
});
