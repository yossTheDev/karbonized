import React from 'react';

// Lazy imports for SVG background components
export const Coil = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Coil'),
);
export const Circular = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Circular'),
);
export const Horizon = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Horizon'),
);
export const Grayrate = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Grayrate'),
);
export const Hirl = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Hirl'),
);
export const Neon = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Neon'),
);
export const Undulate = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Undulate'),
);
export const Chaos = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Chaos'),
);
export const Oscilate = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Oscilate'),
);
export const Vortex = React.lazy(
	async () => await import('../components/Misc/SvgBackgrounds/Vortex'),
);

// Lazy imports for dynamic background components
export const MeshGradient = React.lazy(
	async () => await import('../components/Misc/MeshGradient'),
);
export const LavaLampBackground = React.lazy(
	async () => await import('../components/Misc/LavaLampBackground'),
);
export const StarfieldBackground = React.lazy(
	async () => await import('../components/Misc/StarfieldBackground'),
);
export const GalaxyBackground = React.lazy(
	async () => await import('../components/Misc/GalaxyBackground'),
);

// Textures array for SVG backgrounds
export const textures = [
	{ name: 'grayrate', component: Grayrate },
	{ name: 'coil', component: Coil },
	{ name: 'circular', component: Circular },
	{ name: 'horizon', component: Horizon },
	{ name: 'hirl', component: Hirl },
	{ name: 'neon', component: Neon },
	{ name: 'undulate', component: Undulate },
	{ name: 'chaos', component: Chaos },
	{ name: 'oscilate', component: Oscilate },
	{ name: 'vortex', component: Vortex },
];
