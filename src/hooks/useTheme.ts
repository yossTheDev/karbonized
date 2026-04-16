/* Simple hook to change app theme */
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export const useTheme = (): [string, () => void] => {
	const [appTheme, setAppTheme] = useState<string>(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
	});

	const toggleTheme = () => {
		setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		if (appTheme === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.setAttribute('data-theme', 'dark');

			if (Capacitor.isNativePlatform()) {
				StatusBar.setBackgroundColor({ color: '#242424' });
				StatusBar.setStyle({ style: Style.Dark });
			}
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.setAttribute('data-theme', 'light');
			if (Capacitor.isNativePlatform()) {
				StatusBar.setBackgroundColor({ color: '#FFFFFF' });
				StatusBar.setStyle({ style: Style.Light });
			}
		}

		localStorage.setItem('theme', appTheme);
	}, [appTheme]);

	return [appTheme, toggleTheme];
};
