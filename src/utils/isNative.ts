import { platform } from '@tauri-apps/api/os';

export const isNative = async (): Promise<boolean> => {
	try {
		const platformName = await platform();
		if (platformName.toString() !== '') return true;
		return true;
	} catch {
		return false;
	}
};
