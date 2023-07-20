import React from 'react';
import { Props } from './Backgrounds';

export const Neon: React.FC<Props> = ({
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
			viewBox='0 0 800 800'
		>
			<defs>
				<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='nnneon-grad'>
					<stop stop-color={color1} stop-opacity='1' offset='0%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='100%'></stop>
				</linearGradient>
				<filter
					id='nnneon-filter'
					x='-100%'
					y='-100%'
					width='400%'
					height='400%'
					filterUnits='objectBoundingBox'
					primitiveUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'
				>
					<feGaussianBlur
						stdDeviation='17 8'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='SourceGraphic'
						edgeMode='none'
						result='blur'
					></feGaussianBlur>
				</filter>
				<filter
					id='nnneon-filter2'
					x='-100%'
					y='-100%'
					width='400%'
					height='400%'
					filterUnits='objectBoundingBox'
					primitiveUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'
				>
					<feGaussianBlur
						stdDeviation='10 17'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='SourceGraphic'
						edgeMode='none'
						result='blur'
					></feGaussianBlur>
				</filter>
			</defs>
			<g stroke-width='16' stroke='url(#nnneon-grad)' fill='none'>
				<polygon
					points='400,250 250,550 550,550'
					filter='url(#nnneon-filter)'
				></polygon>
				<polygon
					points='412,250 262,550 562,550'
					filter='url(#nnneon-filter2)'
					opacity='0.25'
				></polygon>
				<polygon
					points='388,250 238,550 538,550'
					filter='url(#nnneon-filter2)'
					opacity='0.25'
				></polygon>
				<polygon points='400,250 250,550 550,550'></polygon>
			</g>
		</svg>
	);
};
export default Neon;
