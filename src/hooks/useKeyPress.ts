/* Simple hook to manage Key Press */
import { useEffect, useState } from 'react';

export const useKeyPress = (keyToDown: string, func?: () => void) => {
	const [isPressed, setIsPressed] = useState(false);
	const [key, setKey] = useState('');

	// Key Down Handler
	const downHandler = ({ key }: { key: string }) => {
		setKey(key);
		//console.log(key);
		if (key === keyToDown) {
			//func();
			setIsPressed(true);
		}
	};

	// Key Up Handler
	const upHandler = ({ key }: { key: string }) => {
		//console.log(key);
		setIsPressed(false);
	};

	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		// Remove event listeners
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	useEffect(() => {
		if (key === keyToDown) func && func();
	}, [key]);

	return isPressed;
};
