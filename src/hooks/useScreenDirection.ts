/* Simple hook to know if your app is running on a vertical or horizontal screen */
import { useEffect, useState } from 'react';

export const useScreenDirection = () => {
	// Initialize state with undefines Height and Width
	const [isHorizontal, setIsHorizontal] = useState(false);

	useEffect(() => {
		// Handler to call on Window Resize
		const handleResize = () => {
			// Set Window Size
			if (window.innerHeight < window.innerWidth) setIsHorizontal(true);
		};

		// Add event listener
		window.addEventListener('resize', handleResize);

		handleResize();

		//Remove event listener on Unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isHorizontal;
};
