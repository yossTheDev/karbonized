import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Karbonized',
				display: 'standalone',
				description: 'Share your code with the World with Karbonized',
				theme_color: '#07090d',
				icons: [
					{ src: 'pwa-192x192.png', size: '192x192', type: 'image/png' },
					{ src: 'pwa-512x512.png', size: '512x512', type: 'image/png' },
				],
			},
			devOptions: { enabled: true },
		}),
	],
});
