import React, { useMemo } from 'react';

interface Props {
	colors: string[];
	blur: number;
	seed: number;
	width: number;
	height: number;
	className?: string;
}

interface MeshLayer {
	x: number;
	y: number;
	size: number;
	opacity: number;
	color: string;
	focusX: number;
	focusY: number;
	blur: number;
	blendMode: React.CSSProperties['mixBlendMode'];
}

const HARD_BLUR = 72;
const BLEND_MODES: Array<React.CSSProperties['mixBlendMode']> = [
	'screen',
	'overlay',
	'soft-light',
	'lighten',
	'plus-lighter',
];
const MESH_ANCHORS = [
	{ x: 12, y: 14, weight: 1.2, opacity: 0.95 },
	{ x: 84, y: 18, weight: 1.05, opacity: 0.88 },
	{ x: 50, y: 42, weight: 1.3, opacity: 0.72 },
	{ x: 18, y: 78, weight: 1, opacity: 0.82 },
	{ x: 78, y: 74, weight: 0.95, opacity: 0.78 },
	{ x: 54, y: 92, weight: 0.88, opacity: 0.7 },
	{ x: -10, y: 46, weight: 0.92, opacity: 0.65 },
	{ x: 108, y: 54, weight: 0.92, opacity: 0.62 },
];

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const createSeededRandom = (seed: number) => {
	let state = Math.floor(seed * 9973) ^ 0x6d2b79f5;
	if (state === 0) state = 0x12345678;

	return () => {
		state |= 0;
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

const normalizeColors = (colors: string[]) => {
	const filtered = colors.filter(
		(color) => color && color !== '#ffffff' && color !== '#FFFFFF',
	);

	if (filtered.length >= 4) {
		return filtered.slice(0, 8);
	}

	const fallback = ['#050508', '#3f2a78', '#127a88', '#f26f5b', '#ffd166'];
	return [...filtered, ...fallback].slice(0, 6);
};

const createMeshLayers = (colors: string[], seed: number): MeshLayer[] => {
	const random = createSeededRandom(seed);
	const layerCount = Math.max(colors.length + 2, 6);

	return Array.from({ length: layerCount }, (_, index) => {
		const anchor = MESH_ANCHORS[index % MESH_ANCHORS.length];
		const color = colors[index % colors.length];
		const isAccent = index >= colors.length;
		const offsetRange = isAccent ? 24 : 16;
		const sizeBase = isAccent ? 34 : 52;
		const size = clamp(
			sizeBase + anchor.weight * 22 + random() * 24 + (isAccent ? -8 : 8),
			30,
			94,
		);
		const x = anchor.x + (random() - 0.5) * offsetRange;
		const y = anchor.y + (random() - 0.5) * offsetRange;

		return {
			x,
			y,
			size,
			opacity: clamp(
				anchor.opacity - index * 0.035 + random() * 0.12,
				isAccent ? 0.2 : 0.35,
				0.96,
			),
			color,
			focusX: clamp(25 + random() * 50, 18, 82),
			focusY: clamp(25 + random() * 50, 18, 82),
			blur: HARD_BLUR + Math.round(random() * 22) + (isAccent ? 8 : 0),
			blendMode: BLEND_MODES[index % BLEND_MODES.length],
		};
	});
};

const createBaseGradient = (colors: string[], seed: number) => {
	const random = createSeededRandom(seed * 13 + 17);
	const primary = colors[0] || '#050508';
	const secondary = colors[1] || primary;
	const tertiary = colors[2] || secondary;

	return `
		radial-gradient(circle at ${18 + random() * 18}% ${18 + random() * 18}%, ${primary} 0%, transparent 58%),
		radial-gradient(circle at ${70 + random() * 18}% ${14 + random() * 20}%, ${secondary} 0%, transparent 52%),
		radial-gradient(circle at ${45 + random() * 16}% ${72 + random() * 18}%, ${tertiary} 0%, transparent 56%),
		linear-gradient(${120 + Math.round(random() * 120)}deg, ${primary} 0%, ${secondary} 44%, ${tertiary} 100%)
	`.replace(/\s+/g, ' ');
};

const createAtmosphereGradient = (colors: string[], seed: number) => {
	const random = createSeededRandom(seed * 29 + 5);
	const primary = colors[0] || '#050508';
	const accent = colors[colors.length - 1] || primary;

	return `
		radial-gradient(circle at ${30 + random() * 40}% ${24 + random() * 36}%, rgba(255,255,255,0.10) 0%, transparent 42%),
		radial-gradient(circle at ${10 + random() * 80}% ${6 + random() * 84}%, ${accent} 0%, transparent 46%),
		linear-gradient(${200 + Math.round(random() * 90)}deg, transparent 0%, rgba(255,255,255,0.08) 52%, ${primary} 100%)
	`.replace(/\s+/g, ' ');
};

export const DynamicBackground: React.FC<Props> = ({
	colors,
	blur,
	seed,
	width,
	height,
	className = '',
}) => {
	void blur;

	const meshColors = useMemo(() => normalizeColors(colors), [colors]);
	const meshLayers = useMemo(
		() => createMeshLayers(meshColors, seed),
		[meshColors, seed],
	);
	const baseGradient = useMemo(
		() => createBaseGradient(meshColors, seed),
		[meshColors, seed],
	);
	const atmosphereGradient = useMemo(
		() => createAtmosphereGradient(meshColors, seed),
		[meshColors, seed],
	);

	return (
		<div
			className={`absolute overflow-hidden ${className}`}
			style={{ width, height }}
		>
			<div
				className='absolute inset-0'
				style={{
					background: baseGradient,
					transform: 'scale(1.08)',
					transformOrigin: 'center',
				}}
			/>

			{meshLayers.map((layer, index) => (
				<div
					key={`${layer.color}-${index}`}
					className='absolute rounded-full'
					style={{
						width: `${layer.size}%`,
						height: `${layer.size}%`,
						left: `calc(${layer.x}% - ${layer.size / 2}%)`,
						top: `calc(${layer.y}% - ${layer.size / 2}%)`,
						background: `radial-gradient(circle at ${layer.focusX}% ${layer.focusY}%, ${layer.color} 0%, ${layer.color} 28%, transparent 74%)`,
						filter: `blur(${layer.blur}px)`,
						mixBlendMode: layer.blendMode,
						opacity: layer.opacity,
						transform: `scale(${1 + (index % 3) * 0.08})`,
					}}
				/>
			))}

			<div
				className='absolute inset-0'
				style={{
					background: atmosphereGradient,
					mixBlendMode: 'soft-light',
					opacity: 0.8,
				}}
			/>

			<div
				className='absolute inset-0'
				style={{
					background:
						'radial-gradient(circle at center, transparent 0%, rgba(5, 5, 8, 0.08) 68%, rgba(5, 5, 8, 0.32) 100%)',
				}}
			/>
		</div>
	);
};

export default DynamicBackground;
