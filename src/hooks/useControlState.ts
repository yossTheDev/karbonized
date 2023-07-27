import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';

export const useControlState = (
	initialState: any,
	id: string,
	manual: boolean = false,
) => {
	const controlState = useStoreState((state) => state.controlState);
	const ControlsTree = useStoreState((state) => state.ControlsTree);
	const ControlProperties = useStoreState((state) => state.ControlProperties);
	const initialProperties = useStoreState((state) => state.initialProperties);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);
	const removeInitialProperty = useStoreActions(
		(state) => state.removeInitialProperty,
	);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setControlState = useStoreActions((state) => state.setControlState);
	const addControlProperty = useStoreActions(
		(state) => state.addControlProperty,
	);
	const setControlProperties = useStoreActions(
		(state) => state.setControlProperties,
	);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);

	const hasInitialProperty = (id: string) => {
		for (const item of initialProperties) {
			if (item.id === id) return item.value;
		}
		return null;
	};

	const hasProperty = (id: string) => {
		for (const item of ControlProperties) {
			if (item.id === id) return item.value;
		}
		return null;
	};

	const [state, setState] = useState(initialState);

	/* Set Initial Properties */
	useEffect(() => {
		const prop = hasInitialProperty(id);
		if (prop) {
			setState(prop);
			removeInitialProperty(id);
		}
	}, [initialProperties]);

	/* Look at Current Controls Properties for Changes */
	useEffect(() => {
		if (controlState?.id === id) {
			setState(controlState.value);
		}
	}, [controlState]);

	/* Save Control Property in Store */
	useEffect(() => {
		addControlProperty({ id: id, value: state });
	}, [state]);

	const set = (newState: any) => {
		if (!manual) {
			setPastHistory([...pastHistory, { id: id, value: state }]);
			setState(newState);
			setControlState({ id: id, value: newState });

			/* Clean Future */
			setFutureHistory([]);
		}
	};

	return [state, set];
};
