import React from 'react';
import { Props } from './Backgrounds';

export const Vortex: React.FC<Props> = ({
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
				<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='vvvortex-grad'>
					<stop stop-color={color1} stop-opacity='1' offset='0%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='100%'></stop>
				</linearGradient>
			</defs>
			<g stroke='url(#vvvortex-grad)' fill='none' stroke-linecap='round'>
				<circle
					r='363'
					cx='400'
					cy='400'
					stroke-width='11'
					stroke-dasharray='44 46'
					stroke-dashoffset='25'
					transform='rotate(166, 400, 400)'
					opacity='0.05'
				></circle>
				<circle
					r='346.5'
					cx='400'
					cy='400'
					stroke-width='11'
					stroke-dasharray='52 24'
					stroke-dashoffset='25'
					transform='rotate(126, 400, 400)'
					opacity='0.10'
				></circle>
				<circle
					r='330'
					cx='400'
					cy='400'
					stroke-width='10'
					stroke-dasharray='40 39'
					stroke-dashoffset='25'
					transform='rotate(89, 400, 400)'
					opacity='0.14'
				></circle>
				<circle
					r='313.5'
					cx='400'
					cy='400'
					stroke-width='10'
					stroke-dasharray='41 20'
					stroke-dashoffset='25'
					transform='rotate(317, 400, 400)'
					opacity='0.19'
				></circle>
				<circle
					r='297'
					cx='400'
					cy='400'
					stroke-width='10'
					stroke-dasharray='42 45'
					stroke-dashoffset='25'
					transform='rotate(54, 400, 400)'
					opacity='0.23'
				></circle>
				<circle
					r='280.5'
					cx='400'
					cy='400'
					stroke-width='10'
					stroke-dasharray='24 15'
					stroke-dashoffset='25'
					transform='rotate(50, 400, 400)'
					opacity='0.28'
				></circle>
				<circle
					r='264'
					cx='400'
					cy='400'
					stroke-width='9'
					stroke-dasharray='13 21'
					stroke-dashoffset='25'
					transform='rotate(324, 400, 400)'
					opacity='0.32'
				></circle>
				<circle
					r='247.5'
					cx='400'
					cy='400'
					stroke-width='9'
					stroke-dasharray='43 52'
					stroke-dashoffset='25'
					transform='rotate(61, 400, 400)'
					opacity='0.37'
				></circle>
				<circle
					r='231'
					cx='400'
					cy='400'
					stroke-width='9'
					stroke-dasharray='37 54'
					stroke-dashoffset='25'
					transform='rotate(235, 400, 400)'
					opacity='0.41'
				></circle>
				<circle
					r='214.5'
					cx='400'
					cy='400'
					stroke-width='8'
					stroke-dasharray='32 46'
					stroke-dashoffset='25'
					transform='rotate(83, 400, 400)'
					opacity='0.46'
				></circle>
				<circle
					r='198'
					cx='400'
					cy='400'
					stroke-width='8'
					stroke-dasharray='39 51'
					stroke-dashoffset='25'
					transform='rotate(105, 400, 400)'
					opacity='0.50'
				></circle>
				<circle
					r='181.5'
					cx='400'
					cy='400'
					stroke-width='8'
					stroke-dasharray='44 47'
					stroke-dashoffset='25'
					transform='rotate(41, 400, 400)'
					opacity='0.55'
				></circle>
				<circle
					r='165'
					cx='400'
					cy='400'
					stroke-width='8'
					stroke-dasharray='14 38'
					stroke-dashoffset='25'
					transform='rotate(37, 400, 400)'
					opacity='0.59'
				></circle>
				<circle
					r='148.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='20 18'
					stroke-dashoffset='25'
					transform='rotate(81, 400, 400)'
					opacity='0.64'
				></circle>
				<circle
					r='132'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='14 45'
					stroke-dashoffset='25'
					transform='rotate(237, 400, 400)'
					opacity='0.68'
				></circle>
				<circle
					r='115.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='26 39'
					stroke-dashoffset='25'
					transform='rotate(163, 400, 400)'
					opacity='0.73'
				></circle>
				<circle
					r='99'
					cx='400'
					cy='400'
					stroke-width='6'
					stroke-dasharray='14 21'
					stroke-dashoffset='25'
					transform='rotate(54, 400, 400)'
					opacity='0.77'
				></circle>
				<circle
					r='82.5'
					cx='400'
					cy='400'
					stroke-width='6'
					stroke-dasharray='31 17'
					stroke-dashoffset='25'
					transform='rotate(259, 400, 400)'
					opacity='0.82'
				></circle>
				<circle
					r='66'
					cx='400'
					cy='400'
					stroke-width='6'
					stroke-dasharray='21 42'
					stroke-dashoffset='25'
					transform='rotate(203, 400, 400)'
					opacity='0.86'
				></circle>
				<circle
					r='49.5'
					cx='400'
					cy='400'
					stroke-width='6'
					stroke-dasharray='28 21'
					stroke-dashoffset='25'
					transform='rotate(50, 400, 400)'
					opacity='0.91'
				></circle>
				<circle
					r='33'
					cx='400'
					cy='400'
					stroke-width='5'
					stroke-dasharray='14 46'
					stroke-dashoffset='25'
					transform='rotate(28, 400, 400)'
					opacity='0.95'
				></circle>
				<circle
					r='16.5'
					cx='400'
					cy='400'
					stroke-width='5'
					stroke-dasharray='19 16'
					stroke-dashoffset='25'
					transform='rotate(327, 400, 400)'
					opacity='1.00'
				></circle>
			</g>
		</svg>
	);
};
export default Vortex;
