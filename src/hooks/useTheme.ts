/* Simple hook to change app theme*/
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export const useTheme = (): [string, () => void] => {
	const [appTheme, setAppTheme] = useState(
		localStorage.getItem('theme') || 'dark',
	);

	const toggleTheme = () => {
		appTheme === 'light' ? setAppTheme('dark') : setAppTheme('light');
	};

	useEffect(() => {
		if (appTheme === 'dark') {
			document.documentElement.classList.add('dark');
			document.querySelector('html')?.setAttribute('data-theme', 'dark');

			if (Capacitor.isNativePlatform()) {
				StatusBar.setBackgroundColor({ color: '#242424' });
				StatusBar.setStyle({ style: Style.Dark });
			}
		} else {
			document.documentElement.classList.remove('dark');
			document.querySelector('html')?.setAttribute('data-theme', 'light');
			if (Capacitor.isNativePlatform()) {
				StatusBar.setBackgroundColor({ color: '#FFFFFF' });
				StatusBar.setStyle({ style: Style.Light });
			}
		}

		localStorage.setItem('theme', appTheme as string);
	}, [appTheme]);

	return [appTheme as string, toggleTheme];
};
