/* Simple hook to change app theme*/
import { useEffect, useState } from 'react';

export const useTheme = (): [string, () => void] => {
	const [appTheme, setAppTheme] = useState(
		localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
	);

	const toggleTheme = () => {
		appTheme === 'light' ? setAppTheme('dark') : setAppTheme('light');
	};

	useEffect(() => {
		if (appTheme === 'dark') {
			document.documentElement.classList.add('dark');
			document.querySelector('html')?.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.querySelector('html')?.setAttribute('data-theme', 'light');
		}

		localStorage.setItem('theme', appTheme as string);
	}, [appTheme]);

	return [appTheme as string, toggleTheme];
};
