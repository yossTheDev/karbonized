import React from 'react';
import { Props } from './Backgrounds';

export const Flux: React.FC<Props> = ({
	className,
	style,
	color1 = '#409ccf',
	color2 = '#136179',
}) => {
	return (
		<svg
			style={style}
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			version='1.1'
			viewBox='0 0 700 700'
		>
			<defs>
				<linearGradient
					gradientTransform='rotate(204, 0.5, 0.5)'
					x1='50%'
					y1='0%'
					x2='50%'
					y2='100%'
					id='ffflux-gradient'
				>
					<stop stop-color={color1} stop-opacity='1' offset='0%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='100%'></stop>
				</linearGradient>
				<filter
					id='ffflux-filter'
					x='-20%'
					y='-20%'
					width='140%'
					height='140%'
					filterUnits='objectBoundingBox'
					primitiveUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'
				>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.005 0.003'
						numOctaves='2'
						seed='2'
						stitchTiles='stitch'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						result='turbulence'
					></feTurbulence>
					<feGaussianBlur
						stdDeviation='20 0'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='turbulence'
						edgeMode='duplicate'
						result='blur'
					></feGaussianBlur>
					<feBlend
						mode='color-dodge'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='SourceGraphic'
						in2='blur'
						result='blend'
					></feBlend>
				</filter>
			</defs>
			<rect
				width={'1280px'}
				height={'720px'}
				fill='url(#ffflux-gradient)'
				filter='url(#ffflux-filter)'
			></rect>
		</svg>
	);
};
export default Flux;
