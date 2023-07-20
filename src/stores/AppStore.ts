import { Action, action, createStore ,Computed, computed} from 'easy-peasy';

interface Item {
	id: string;
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
	controlsClass: Computed<AppStoreModel,string[]>
	setLockAspect: Action<AppStoreModel, boolean>;

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
	ControlsTree: [{ type: 'code', id: 'code-0000' }],
	History: [{ id: '-', value: '-' }],
	historySignal: '',
	readyToSave: false,
	currentControlID: '',
	editing: true,
	lockAspect: false,
	controlsClass: computed((state) => {
		const controlsClass: string[] = [];

		state.ControlsTree.forEach((item) => {
			if (item.id !== state.currentControlID) controlsClass.push('.block-' + item.id);
		});

		return controlsClass;
	}),
	workspaceGradientSettings: { color1: '#00B4DB', color2: '#0083B0', deg: 98 },

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
