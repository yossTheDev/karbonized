import React, { useMemo } from 'react';

interface Props {
	colors: string[];
	blur: number;
	seed: number;
	width: number;
	height: number;
	className?: string;
}

const generatePositions = (seed: number, count: number) => {
	const positions: Array<{
		x: number;
		y: number;
		size: number;
		opacity: number;
	}> = [];
	for (let i = 0; i < count; i++) {
		const random = (offset: number) => {
			const x = Math.sin(seed * 9999 + i * 777 + offset) * 10000;
			return x - Math.floor(x);
		};
		const progress = 1 - i / (count - 1 || 1);
		const baseSize = 50 + progress * 30;
		const baseOpacity = 0.95 - i * 0.15;
		positions.push({
			x: random(1) * 100 - 50,
			y: random(2) * 100 - 50,
			size: baseSize + random(3) * 15,
			opacity: Math.max(0.3, baseOpacity),
		});
	}
	return positions;
};

export const DynamicBackground: React.FC<Props> = ({
	colors,
	blur,
	seed,
	width,
	height,
	className = '',
}) => {
	const filteredColors = useMemo(
		() =>
			colors.filter((c) => c && c !== '#ffffff' && c !== '#FFFFFF').slice(0, 5),
		[colors],
	);
	const positions = useMemo(
		() => generatePositions(seed, filteredColors.length),
		[seed, filteredColors.length],
	);

	return (
		<div
			className={`absolute overflow-hidden ${className}`}
			style={{ width, height }}
		>
			<div
				className='absolute inset-0'
				style={{
					background: filteredColors[0] || '#050508',
					opacity: 0.8,
				}}
			/>
			{filteredColors.map((color, index) => {
				const pos = positions[index];
				if (!pos) return null;
				return (
					<div
						key={index}
						className='absolute rounded-full'
						style={{
							width: `${pos.size}%`,
							height: `${pos.size}%`,
							left: `calc(50% + ${pos.x}% - ${pos.size / 2}%)`,
							top: `calc(50% + ${pos.y}% - ${pos.size / 2}%)`,
							background: color,
							filter: 'blur(60px)',
							mixBlendMode: 'normal',
							opacity: pos.opacity,
						}}
					/>
				);
			})}
		</div>
	);
};

export default DynamicBackground;
