import React from 'react';
import { Props } from './Backgrounds';

export const Circular: React.FC<Props> = ({
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
				<radialGradient id='cccircular-grad' r='50%' cx='50%' cy='50%'>
					<stop offset='15%' stop-color={color1} stop-opacity='0.5'></stop>
					<stop
						offset='75%'
						stop-color='hsl(341, 100%, 85%)'
						stop-opacity='1'
					></stop>
					<stop offset='100%' stop-color={color2} stop-opacity='1'></stop>
				</radialGradient>
			</defs>
			<g fill='url(#cccircular-grad)'>
				<circle r='352' cx='400' cy='400'></circle>
				<circle r='320' cx='400' cy='400'></circle>
				<circle r='288' cx='400' cy='400'></circle>
				<circle r='256' cx='400' cy='400'></circle>
				<circle r='224' cx='400' cy='400'></circle>
				<circle r='192' cx='400' cy='400'></circle>
				<circle r='160' cx='400' cy='400'></circle>
				<circle r='128' cx='400' cy='400'></circle>
				<circle r='96' cx='400' cy='400'></circle>
				<circle r='64' cx='400' cy='400'></circle>
			</g>
		</svg>
	);
};

export default Circular;
