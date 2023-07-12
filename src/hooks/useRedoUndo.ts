import { useEffect, useMemo, useState } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';

export const useRedoUndo = (initialState: any, id: string) => {
	const [state, setState] = useState(initialState);
	const [past, setPast] = useState<any[]>([]);
	const [future, setFuture] = useState<any[]>([]);

	const controlState = useStoreState((state) => state.controlState);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const futureHistory = useStoreState((state) => state.futureHistory);
	const setControlState = useStoreActions((state) => state.setControlState);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);

	const undo = () => {
		if (past.length > 0) {
			const previous = past[past.length - 1];
			const newPast = past.slice(0, past.length - 1);
			setPast(newPast);
			setFuture([state, ...future]);
			setState(previous);
		}
	};

	const redo = () => {
		if (future.length > 0) {
			const next = future[0];
			const newFuture = future.slice(1);
			setPast([...past, state]);
			setFuture(newFuture);
			setState(next);
		}
	};

	/*const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'z') {
			event.preventDefault();
			undo();
			console.log('undo');
		} else if (event.ctrlKey && event.key === 'y') {
			event.preventDefault();
			redo();
			console.log('redo');
		}
	};*/

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'z') {
			event.preventDefault();
			if (controlState?.id === id) {
				setState(controlState.value);
				setControlState(null);
			}
			console.log('undo');
		} else if (event.ctrlKey && event.key === 'y') {
			event.preventDefault();
			if (controlState?.id === id) {
				setState(controlState.value);
				setControlState(null);
			}
			console.log('redo');
		}
	};

	/*useEffect(() => {
		if (controlState?.id === id) {
			setState(controlState.value);
			setControlState(null);
		}
	});*/

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	const set = (newState: any) => {
		console.log('set new state');
		/*setPast([...past, state]);
		setState(newState);
		setFuture([]);*/

		console.log({ id: id, value: newState });

		setPastHistory([...pastHistory, { id: id, value: newState }]);
		setFutureHistory([]);
		setState(newState);
	};

	return [state, set, undo, redo];
};
