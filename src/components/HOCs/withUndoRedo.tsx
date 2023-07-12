import React, { useEffect, useState } from 'react';

const undoRedoState = {};
const undoRedoHistory: any[] = [];

export function withUndoRedo(Component: any) {
	return function WithUndoRedo(props: any) {
		const [state, setState] = useState(props.initialState);

		const id = props.id;

		useEffect(() => {
			undoRedoState[id] = state;
		}, [id, state]);

		const set = (newState: any) => {
			setState(newState);
		};

		const undo = () => {
			if (undoRedoHistory.length > 0) {
				const previousStates = undoRedoHistory.pop();
				previousStates.forEach((previousState) => {
					undoRedoState[previousState.id] = previousState.state;
				});

				setState(undoRedoState[id]);
			}
		};

		const redo = () => {
			if (undoRedoHistory.length > 0) {
				const nextStates = undoRedoHistory.pop();
				nextStates.forEach((nextState) => {
					undoRedoState[nextState.id] = nextState.state;
				});

				setState(undoRedoState[id]);
			}
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'z') {
				event.preventDefault();
				undo();
				console.log('undo');
				console.log(state);
			} else if (event.ctrlKey && event.key === 'y') {
				event.preventDefault();
				redo();
				console.log('redo');
			}
		};

		useEffect(() => {
			window.addEventListener('keydown', onKeyDown);

			return () => {
				window.removeEventListener('keydown', onKeyDown);
			};
		});

		return (
			<Component {...props} state={state} set={set} undo={undo} redo={redo} />
		);
	};
}
