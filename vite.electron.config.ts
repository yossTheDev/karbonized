import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		electron({
			entry: 'src-electron/main.ts',

			vite: {
				publicDir: 'src-electron/assets/',
				build: {
					rollupOptions: {
						input: {
							main: 'src-electron/main.ts',
							preload: 'src-electron/preload.ts',
						},
					},
				},
			},
		}),
	],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
