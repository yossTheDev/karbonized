import { useMemo } from 'react';

interface Props {
	colors: string[];
	blur: number;
	seed: number;
	width: number;
	height: number;
	className?: string;
}

interface LavaBlob {
	id: string;
	x: number;
	y: number;
	size: number;
	color: string;
	opacity: number;
	scale: number;
}

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const createSeededRandom = (seed: number) => {
	let state = Math.floor(seed * 99991) || 1;

	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 4294967296;
	};
};

const normalizeLavaColors = (colors: string[]) => {
	const filtered = colors.filter(
		(color) =>
			color &&
			color.trim() !== '' &&
			color.toLowerCase() !== '#ffffff' &&
			color.toLowerCase() !== '#fff',
	);

	if (filtered.length >= 2) {
		return filtered.slice(0, 5);
	}

	return ['#ff4d6d', '#ff8a5b', '#ffb347', '#ff5e78'];
};

const hexToRgb = (hex: string) => {
	const normalized = hex.replace('#', '');
	const value =
		normalized.length === 3
			? normalized
					.split('')
					.map((c) => c + c)
					.join('')
			: normalized;

	const num = parseInt(value, 16);

	return {
		r: (num >> 16) & 255,
		g: (num >> 8) & 255,
		b: num & 255,
	};
};

const rgba = (hex: string, alpha: number) => {
	const { r, g, b } = hexToRgb(hex);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const createLavaBlobs = (colors: string[], seed: number): LavaBlob[] => {
	const random = createSeededRandom(seed);
	const blobCount = Math.max(colors.length * 4, 15);

	return Array.from({ length: blobCount }, (_, index) => {
		const large = index % 3 === 0;
		const size = large ? 180 + random() * 250 : 100 + random() * 150;

		return {
			id: `lava-${index}`,
			x: random() * 100,
			y: random() * 100,
			size,
			color: colors[index % colors.length],
			opacity: 0.85 + random() * 0.15,
			scale: 0.8 + random() * 0.6,
		};
	});
};

const createBackgroundGradient = (colors: string[]) => {
	const [a, b, c = a] = colors;

	return `
        radial-gradient(circle at 20% 20%, ${rgba(a, 0.35)} 0%, transparent 50%),
        radial-gradient(circle at 80% 30%, ${rgba(b, 0.3)} 0%, transparent 60%),
        radial-gradient(circle at 50% 85%, ${rgba(c, 0.25)} 0%, transparent 55%),
        linear-gradient(180deg, #050505 0%, #0d0d0d 50%, #020202 100%)
    `;
};

export const LavaLampBackground: React.FC<Props> = ({
	colors,
	blur,
	seed,
	width,
	height,
	className = '',
}) => {
	const lavaColors = useMemo(() => normalizeLavaColors(colors), [colors]);

	const blobs = useMemo(
		() => createLavaBlobs(lavaColors, seed),
		[lavaColors, seed],
	);

	const background = useMemo(
		() => createBackgroundGradient(lavaColors),
		[lavaColors],
	);

	return (
		<div
			className={`absolute overflow-hidden ${className}`}
			style={{
				width,
				height,
				background,
				filter: `blur(${blur * 0.15}px)`,
			}}
		>
			<svg className='absolute w-0 h-0'>
				<defs>
					<filter id='lava-goo'>
						<feGaussianBlur
							in='SourceGraphic'
							stdDeviation='20'
							result='blur'
						/>
						<feColorMatrix
							in='blur'
							mode='matrix'
							values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10'
							result='goo'
						/>
						<feBlend in='SourceGraphic' in2='goo' />
					</filter>
				</defs>
			</svg>

			<div className='absolute inset-0 backdrop-blur-3xl' />

			<div className='absolute inset-0' style={{ filter: 'url(#lava-goo)' }}>
				{blobs.map((blob) => (
					<div
						key={blob.id}
						className='absolute'
						style={{
							left: `${blob.x}%`,
							top: `${blob.y}%`,
							width: blob.size,
							height: blob.size,
							background: `
                                radial-gradient(
                                    circle at 40% 40%,
                                    ${rgba(blob.color, 1)} 0%,
                                    ${rgba(blob.color, 0.9)} 40%,
                                    ${rgba(blob.color, 0.4)} 80%,
                                    transparent 100%
                                )
                            `,
							opacity: blob.opacity,
							mixBlendMode: 'screen',
							transform: `translate(-50%, -50%) scale(${blob.scale})`,
							borderRadius: '50%',
						}}
					/>
				))}
			</div>

			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background: `
                        linear-gradient(
                            135deg,
                            rgba(255,255,255,0.08) 0%,
                            transparent 25%,
                            transparent 75%,
                            rgba(255,255,255,0.04) 100%
                        )
                    `,
					mixBlendMode: 'overlay',
				}}
			/>

			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.45) 100%)',
				}}
			/>
		</div>
	);
};

export default LavaLampBackground;
