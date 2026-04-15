declare global {
	interface Window {
		process?: any;
	}
}

export const isElectron = (): boolean => {
	// Renderer process
	if (
		typeof window !== 'undefined' &&
		typeof window.process === 'object' &&
		window.process.type === 'renderer'
	) {
		return true;
	}

	// Main process
	if (
		typeof process !== 'undefined' &&
		typeof process.versions === 'object' &&
		process.versions.electron !== undefined
	) {
		return true;
	}

	// Detect the user agent when the `nodeIntegration` option is set to true
	if (
		typeof navigator === 'object' &&
		typeof navigator.userAgent === 'string' &&
		navigator.userAgent.includes('Electron')
	) {
		return true;
	}

	return false;
};
