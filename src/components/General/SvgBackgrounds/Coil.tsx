import React from 'react';
import { Props } from './Backgrounds';

export const Coil: React.FC<Props> = ({
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
				<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='cccoil-grad'>
					<stop stop-color={color1} stop-opacity='1' offset='0%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='100%'></stop>
				</linearGradient>
			</defs>
			<g stroke='url(#cccoil-grad)' fill='none' stroke-linecap='round'>
				<circle
					r='808.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='4318 5080'
					transform='rotate(360, 400, 400)'
					opacity='0.05'
				></circle>
				<circle
					r='792'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='4142 4976'
					transform='rotate(353, 400, 400)'
					opacity='0.07'
				></circle>
				<circle
					r='775.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3969 4873'
					transform='rotate(345, 400, 400)'
					opacity='0.09'
				></circle>
				<circle
					r='759'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3800 4769'
					transform='rotate(338, 400, 400)'
					opacity='0.11'
				></circle>
				<circle
					r='742.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3635 4665'
					transform='rotate(330, 400, 400)'
					opacity='0.13'
				></circle>
				<circle
					r='726'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3473 4562'
					transform='rotate(323, 400, 400)'
					opacity='0.15'
				></circle>
				<circle
					r='709.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3316 4458'
					transform='rotate(315, 400, 400)'
					opacity='0.17'
				></circle>
				<circle
					r='693'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3161 4354'
					transform='rotate(308, 400, 400)'
					opacity='0.19'
				></circle>
				<circle
					r='676.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='3011 4251'
					transform='rotate(300, 400, 400)'
					opacity='0.21'
				></circle>
				<circle
					r='660'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2864 4147'
					transform='rotate(293, 400, 400)'
					opacity='0.23'
				></circle>
				<circle
					r='643.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2721 4043'
					transform='rotate(285, 400, 400)'
					opacity='0.25'
				></circle>
				<circle
					r='627'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2581 3940'
					transform='rotate(278, 400, 400)'
					opacity='0.27'
				></circle>
				<circle
					r='610.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2445 3836'
					transform='rotate(270, 400, 400)'
					opacity='0.29'
				></circle>
				<circle
					r='594'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2313 3732'
					transform='rotate(263, 400, 400)'
					opacity='0.31'
				></circle>
				<circle
					r='577.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2185 3629'
					transform='rotate(255, 400, 400)'
					opacity='0.33'
				></circle>
				<circle
					r='561'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='2060 3525'
					transform='rotate(248, 400, 400)'
					opacity='0.35'
				></circle>
				<circle
					r='544.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1939 3421'
					transform='rotate(240, 400, 400)'
					opacity='0.37'
				></circle>
				<circle
					r='528'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1821 3318'
					transform='rotate(233, 400, 400)'
					opacity='0.39'
				></circle>
				<circle
					r='511.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1707 3214'
					transform='rotate(225, 400, 400)'
					opacity='0.41'
				></circle>
				<circle
					r='495'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1597 3110'
					transform='rotate(218, 400, 400)'
					opacity='0.43'
				></circle>
				<circle
					r='478.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1491 3007'
					transform='rotate(210, 400, 400)'
					opacity='0.45'
				></circle>
				<circle
					r='462'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1388 2903'
					transform='rotate(203, 400, 400)'
					opacity='0.47'
				></circle>
				<circle
					r='445.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1289 2799'
					transform='rotate(195, 400, 400)'
					opacity='0.49'
				></circle>
				<circle
					r='429'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1193 2695'
					transform='rotate(188, 400, 400)'
					opacity='0.51'
				></circle>
				<circle
					r='412.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1102 2592'
					transform='rotate(180, 400, 400)'
					opacity='0.53'
				></circle>
				<circle
					r='396'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='1013 2488'
					transform='rotate(173, 400, 400)'
					opacity='0.54'
				></circle>
				<circle
					r='379.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='929 2384'
					transform='rotate(165, 400, 400)'
					opacity='0.56'
				></circle>
				<circle
					r='363'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='848 2281'
					transform='rotate(158, 400, 400)'
					opacity='0.58'
				></circle>
				<circle
					r='346.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='771 2177'
					transform='rotate(150, 400, 400)'
					opacity='0.60'
				></circle>
				<circle
					r='330'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='698 2073'
					transform='rotate(143, 400, 400)'
					opacity='0.62'
				></circle>
				<circle
					r='313.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='628 1970'
					transform='rotate(135, 400, 400)'
					opacity='0.64'
				></circle>
				<circle
					r='297'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='562 1866'
					transform='rotate(128, 400, 400)'
					opacity='0.66'
				></circle>
				<circle
					r='280.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='499 1762'
					transform='rotate(120, 400, 400)'
					opacity='0.68'
				></circle>
				<circle
					r='264'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='441 1659'
					transform='rotate(113, 400, 400)'
					opacity='0.70'
				></circle>
				<circle
					r='247.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='386 1555'
					transform='rotate(105, 400, 400)'
					opacity='0.72'
				></circle>
				<circle
					r='231'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='334 1451'
					transform='rotate(98, 400, 400)'
					opacity='0.74'
				></circle>
				<circle
					r='214.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='286 1348'
					transform='rotate(90, 400, 400)'
					opacity='0.76'
				></circle>
				<circle
					r='198'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='242 1244'
					transform='rotate(83, 400, 400)'
					opacity='0.78'
				></circle>
				<circle
					r='181.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='202 1140'
					transform='rotate(75, 400, 400)'
					opacity='0.80'
				></circle>
				<circle
					r='165'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='165 1037'
					transform='rotate(68, 400, 400)'
					opacity='0.82'
				></circle>
				<circle
					r='148.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='132 933'
					transform='rotate(60, 400, 400)'
					opacity='0.84'
				></circle>
				<circle
					r='132'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='103 829'
					transform='rotate(53, 400, 400)'
					opacity='0.86'
				></circle>
				<circle
					r='115.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='77 726'
					transform='rotate(45, 400, 400)'
					opacity='0.88'
				></circle>
				<circle
					r='99'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='55 622'
					transform='rotate(38, 400, 400)'
					opacity='0.90'
				></circle>
				<circle
					r='82.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='37 518'
					transform='rotate(30, 400, 400)'
					opacity='0.92'
				></circle>
				<circle
					r='66'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='22 415'
					transform='rotate(23, 400, 400)'
					opacity='0.94'
				></circle>
				<circle
					r='49.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='11 311'
					transform='rotate(15, 400, 400)'
					opacity='0.96'
				></circle>
				<circle
					r='33'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='4 207'
					transform='rotate(8, 400, 400)'
					opacity='0.98'
				></circle>
				<circle
					r='16.5'
					cx='400'
					cy='400'
					stroke-width='7'
					stroke-dasharray='0 104'
					opacity='1.00'
				></circle>
			</g>
		</svg>
	);
};

export default Coil;
