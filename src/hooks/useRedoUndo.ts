import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';

export const useRedoUndo = (
	initialState: any,
	id: string,
	manual: boolean = false,
) => {
	const [state, setState] = useState(initialState);

	const controlState = useStoreState((state) => state.controlState);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setControlState = useStoreActions((state) => state.setControlState);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);

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
