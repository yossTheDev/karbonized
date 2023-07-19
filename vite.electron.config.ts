import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		electron({
			entry: 'src-electron/main.ts',
		}),
	],
});
