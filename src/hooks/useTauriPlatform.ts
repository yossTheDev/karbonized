/* Simple hook to check if the app is running over Tauri Platfotm*/
import { useEffect, useState } from 'react';
import { platform } from '@tauri-apps/api/os';

export const useTauriPlatform = () => {
	const [isTauri, setIsTauri] = useState(false);

	useEffect(() => {
		const checkTauriPlatform = async () => {
			try {
				const platformName = await platform();
				if (platformName.toString() !== '') setIsTauri(true);
			} catch {
				setIsTauri(false);
			}
		};

		checkTauriPlatform();
	}, []);

	return isTauri;
};
