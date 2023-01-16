import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['fonts/*.ttf', 'images/*.png'],
			manifest: {
				name: 'Karbonized',
				display: 'standalone',
				description: 'Share your code with the World with Karbonized',
				theme_color: '#07090d',
				background_color: '#07090d',
				icons: [
					{
						src: 'assets/icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable any',
					},
				],
			},
			devOptions: { enabled: true },
		}),
	],
});
