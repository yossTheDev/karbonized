import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';

export const useRedoUndo = (
	initialState: any,
	id: string,
	manual: boolean = false,
) => {
	const controlState = useStoreState((state) => state.controlState);
	const ControlsTree = useStoreState((state) => state.ControlsTree);
	const initialProperties = useStoreState((state) => state.initialProperties);
	const removeInitialProperty = useStoreActions(
		(state) => state.removeInitialProperty,
	);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setControlState = useStoreActions((state) => state.setControlState);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);

	const hasProperty = (id: string) => {
		for (const item of initialProperties) {
			if (item.id === id) return item.value;
		}
		return null;
	};

	const [state, setState] = useState(initialState);

	/* Set Initial Properties */
	useEffect(() => {
		if (hasProperty(id)) {
			setState(hasProperty(id));
			removeInitialProperty(id);
		}
	}, [initialProperties]);

	/* Look at Current Controls Properties for Changes */
	useEffect(() => {
		if (controlState?.id === id) {
			setState(controlState.value);
		}
	}, [controlState]);

	const set = (newState: any) => {
		if (!manual) {
			setPastHistory([...pastHistory, { id: id, value: state }]);
			setState(newState);
			setControlState({ id: id, value: newState });

			setFutureHistory([]);
		}
	};

	return [state, set];
};
