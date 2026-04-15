import React from 'react';
import { type Props } from './Backgrounds';

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
					<stop stopColor={color1} stopOpacity='1' offset='0%'></stop>
					<stop stopColor={color2} stopOpacity='1' offset='100%'></stop>
				</linearGradient>
			</defs>
			<g stroke='url(#vvvortex-grad)' fill='none' strokeLinecap='round'>
				<circle
					r='363'
					cx='400'
					cy='400'
					strokeWidth='11'
					strokeDasharray='44 46'
					strokeDashoffset='25'
					transform='rotate(166, 400, 400)'
					opacity='0.05'
				></circle>
				<circle
					r='346.5'
					cx='400'
					cy='400'
					strokeWidth='11'
					strokeDasharray='52 24'
					strokeDashoffset='25'
					transform='rotate(126, 400, 400)'
					opacity='0.10'
				></circle>
				<circle
					r='330'
					cx='400'
					cy='400'
					strokeWidth='10'
					strokeDasharray='40 39'
					strokeDashoffset='25'
					transform='rotate(89, 400, 400)'
					opacity='0.14'
				></circle>
				<circle
					r='313.5'
					cx='400'
					cy='400'
					strokeWidth='10'
					strokeDasharray='41 20'
					strokeDashoffset='25'
					transform='rotate(317, 400, 400)'
					opacity='0.19'
				></circle>
				<circle
					r='297'
					cx='400'
					cy='400'
					strokeWidth='10'
					strokeDasharray='42 45'
					strokeDashoffset='25'
					transform='rotate(54, 400, 400)'
					opacity='0.23'
				></circle>
				<circle
					r='280.5'
					cx='400'
					cy='400'
					strokeWidth='10'
					strokeDasharray='24 15'
					strokeDashoffset='25'
					transform='rotate(50, 400, 400)'
					opacity='0.28'
				></circle>
				<circle
					r='264'
					cx='400'
					cy='400'
					strokeWidth='9'
					strokeDasharray='13 21'
					strokeDashoffset='25'
					transform='rotate(324, 400, 400)'
					opacity='0.32'
				></circle>
				<circle
					r='247.5'
					cx='400'
					cy='400'
					strokeWidth='9'
					strokeDasharray='43 52'
					strokeDashoffset='25'
					transform='rotate(61, 400, 400)'
					opacity='0.37'
				></circle>
				<circle
					r='231'
					cx='400'
					cy='400'
					strokeWidth='9'
					strokeDasharray='37 54'
					strokeDashoffset='25'
					transform='rotate(235, 400, 400)'
					opacity='0.41'
				></circle>
				<circle
					r='214.5'
					cx='400'
					cy='400'
					strokeWidth='8'
					strokeDasharray='32 46'
					strokeDashoffset='25'
					transform='rotate(83, 400, 400)'
					opacity='0.46'
				></circle>
				<circle
					r='198'
					cx='400'
					cy='400'
					strokeWidth='8'
					strokeDasharray='39 51'
					strokeDashoffset='25'
					transform='rotate(105, 400, 400)'
					opacity='0.50'
				></circle>
				<circle
					r='181.5'
					cx='400'
					cy='400'
					strokeWidth='8'
					strokeDasharray='44 47'
					strokeDashoffset='25'
					transform='rotate(41, 400, 400)'
					opacity='0.55'
				></circle>
				<circle
					r='165'
					cx='400'
					cy='400'
					strokeWidth='8'
					strokeDasharray='14 38'
					strokeDashoffset='25'
					transform='rotate(37, 400, 400)'
					opacity='0.59'
				></circle>
				<circle
					r='148.5'
					cx='400'
					cy='400'
					strokeWidth='7'
					strokeDasharray='20 18'
					strokeDashoffset='25'
					transform='rotate(81, 400, 400)'
					opacity='0.64'
				></circle>
				<circle
					r='132'
					cx='400'
					cy='400'
					strokeWidth='7'
					strokeDasharray='14 45'
					strokeDashoffset='25'
					transform='rotate(237, 400, 400)'
					opacity='0.68'
				></circle>
				<circle
					r='115.5'
					cx='400'
					cy='400'
					strokeWidth='7'
					strokeDasharray='26 39'
					strokeDashoffset='25'
					transform='rotate(163, 400, 400)'
					opacity='0.73'
				></circle>
				<circle
					r='99'
					cx='400'
					cy='400'
					strokeWidth='6'
					strokeDasharray='14 21'
					strokeDashoffset='25'
					transform='rotate(54, 400, 400)'
					opacity='0.77'
				></circle>
				<circle
					r='82.5'
					cx='400'
					cy='400'
					strokeWidth='6'
					strokeDasharray='31 17'
					strokeDashoffset='25'
					transform='rotate(259, 400, 400)'
					opacity='0.82'
				></circle>
				<circle
					r='66'
					cx='400'
					cy='400'
					strokeWidth='6'
					strokeDasharray='21 42'
					strokeDashoffset='25'
					transform='rotate(203, 400, 400)'
					opacity='0.86'
				></circle>
				<circle
					r='49.5'
					cx='400'
					cy='400'
					strokeWidth='6'
					strokeDasharray='28 21'
					strokeDashoffset='25'
					transform='rotate(50, 400, 400)'
					opacity='0.91'
				></circle>
				<circle
					r='33'
					cx='400'
					cy='400'
					strokeWidth='5'
					strokeDasharray='14 46'
					strokeDashoffset='25'
					transform='rotate(28, 400, 400)'
					opacity='0.95'
				></circle>
				<circle
					r='16.5'
					cx='400'
					cy='400'
					strokeWidth='5'
					strokeDasharray='19 16'
					strokeDashoffset='25'
					transform='rotate(327, 400, 400)'
					opacity='1.00'
				></circle>
			</g>
		</svg>
	);
};
export default Vortex;
