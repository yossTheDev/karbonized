import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import default_logo from '../assets/logo.svg';


export function useControlState<T>(
	initialState: T,
	id: string,
	manual: boolean = false,
): [T, (newState: T) => void] {
	const controlState = useStoreState((state) => state.controlState);
	const ControlProperties = useStoreState((state) => state.ControlProperties);
	const initialProperties = useStoreState((state) => state.initialProperties);
	const removeInitialProperty = useStoreActions(
		(state) => state.removeInitialProperty,
	);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setControlState = useStoreActions((state) => state.setControlState);
	const addControlProperty = useStoreActions(
		(state) => state.addControlProperty,
	);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);

	const hasInitialProperty = (id: string) => {
		for (const item of initialProperties) {
			if (item.id === id) return item.value;
		}
		return null;
	};

	const [state, setState] = useState(initialState);

	/* Set Initial Properties */
	useEffect(() => {
		const prop = hasInitialProperty(id);
		if (prop) {
			if (
				id.endsWith('-src') &&
				(prop === '/src/assets/logo.svg' ||
					prop === '/src/assets/karbonized.svg')
			) {
				setState(default_logo);
			} else {
				setState(prop);
			}

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
