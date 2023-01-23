import { useEffect, useState } from 'react';

/* Simple hook to get Window Size */

export const useWindowsSize = () => {
	// Initialize state with undefines Height and Width
	const [windowSize, setWindowSize] = useState<{
		height: undefined | number;
		width: undefined | number;
	}>({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useEffect(() => {
		// Handler to call on Window Resize
		const handleResize = () => {
			// Set Window Size
			setWindowSize({ height: window.innerHeight, width: window.innerWidth });
			console.log('resize');
		};

		// Add event listener
		window.addEventListener('resize', handleResize);

		handleResize();

		//Remove event listener on Unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};
