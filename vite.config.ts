import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
			},
			registerType: 'autoUpdate',
			includeAssets: ['fonts/*.ttf', 'images/*.png'],
			manifest: {
				name: 'Karbonized',
				display: 'standalone',
				description: 'Image Generator for Code Snippets & Mockups',
				theme_color: '#141414',
				background_color: '#141414',
				icons: [
					{
						src: 'assets/icons/icon-72.webp',
						sizes: '72x72',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-96.webp',
						sizes: '96x96',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-128.webp',
						sizes: '128x128',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-192.webp',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-256.webp',
						sizes: '256x256',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'assets/icons/icon-512.webp',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable any',
					},
				],
				categories: ['personalization', 'photo', 'productivity', 'utilities'],
			},
		}),
	],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
