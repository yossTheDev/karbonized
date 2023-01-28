import React from 'react';
import { Props } from './Backgrounds';

export const Oscilate: React.FC<Props> = ({
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
			viewBox='0 0 1422 800'
		>
			<defs>
				<linearGradient
					x1='50%'
					y1='0%'
					x2='50%'
					y2='100%'
					id='oooscillate-grad'
				>
					<stop stop-color={color1} stop-opacity='1' offset='0%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='100%'></stop>
				</linearGradient>
			</defs>
			<g
				stroke-width='2'
				stroke='url(#oooscillate-grad)'
				fill='none'
				stroke-linecap='round'
			>
				<path
					d='M 0 572 Q 355.5 -100 711 400 Q 1066.5 900 1422 572'
					opacity='0.17'
				></path>
				<path
					d='M 0 550 Q 355.5 -100 711 400 Q 1066.5 900 1422 550'
					opacity='0.31'
				></path>
				<path
					d='M 0 528 Q 355.5 -100 711 400 Q 1066.5 900 1422 528'
					opacity='0.57'
				></path>
				<path
					d='M 0 506 Q 355.5 -100 711 400 Q 1066.5 900 1422 506'
					opacity='0.47'
				></path>
				<path
					d='M 0 484 Q 355.5 -100 711 400 Q 1066.5 900 1422 484'
					opacity='0.38'
				></path>
				<path
					d='M 0 462 Q 355.5 -100 711 400 Q 1066.5 900 1422 462'
					opacity='0.24'
				></path>
				<path
					d='M 0 440 Q 355.5 -100 711 400 Q 1066.5 900 1422 440'
					opacity='0.68'
				></path>
				<path
					d='M 0 418 Q 355.5 -100 711 400 Q 1066.5 900 1422 418'
					opacity='0.28'
				></path>
				<path
					d='M 0 396 Q 355.5 -100 711 400 Q 1066.5 900 1422 396'
					opacity='0.61'
				></path>
				<path
					d='M 0 374 Q 355.5 -100 711 400 Q 1066.5 900 1422 374'
					opacity='0.14'
				></path>
				<path
					d='M 0 352 Q 355.5 -100 711 400 Q 1066.5 900 1422 352'
					opacity='0.32'
				></path>
				<path
					d='M 0 330 Q 355.5 -100 711 400 Q 1066.5 900 1422 330'
					opacity='0.72'
				></path>
				<path
					d='M 0 308 Q 355.5 -100 711 400 Q 1066.5 900 1422 308'
					opacity='0.95'
				></path>
				<path
					d='M 0 286 Q 355.5 -100 711 400 Q 1066.5 900 1422 286'
					opacity='0.26'
				></path>
				<path
					d='M 0 264 Q 355.5 -100 711 400 Q 1066.5 900 1422 264'
					opacity='0.90'
				></path>
				<path
					d='M 0 242 Q 355.5 -100 711 400 Q 1066.5 900 1422 242'
					opacity='0.34'
				></path>
				<path
					d='M 0 220 Q 355.5 -100 711 400 Q 1066.5 900 1422 220'
					opacity='0.97'
				></path>
				<path
					d='M 0 198 Q 355.5 -100 711 400 Q 1066.5 900 1422 198'
					opacity='0.22'
				></path>
				<path
					d='M 0 176 Q 355.5 -100 711 400 Q 1066.5 900 1422 176'
					opacity='0.45'
				></path>
				<path
					d='M 0 154 Q 355.5 -100 711 400 Q 1066.5 900 1422 154'
					opacity='0.77'
				></path>
				<path
					d='M 0 132 Q 355.5 -100 711 400 Q 1066.5 900 1422 132'
					opacity='0.57'
				></path>
				<path
					d='M 0 110 Q 355.5 -100 711 400 Q 1066.5 900 1422 110'
					opacity='0.88'
				></path>
				<path
					d='M 0 88 Q 355.5 -100 711 400 Q 1066.5 900 1422 88'
					opacity='0.21'
				></path>
				<path
					d='M 0 66 Q 355.5 -100 711 400 Q 1066.5 900 1422 66'
					opacity='0.52'
				></path>
				<path
					d='M 0 44 Q 355.5 -100 711 400 Q 1066.5 900 1422 44'
					opacity='0.09'
				></path>
			</g>
		</svg>
	);
};
export default Oscilate;
