import React from 'react';
import { Props } from './Backgrounds';

export const Horizon: React.FC<Props> = ({
	className,
	style,
	color1 = '#409ccf',
	color2 = '#136179',
}) => {
	return (
		<svg
			style={style}
			className={className}
			width='700'
			height='700'
			xmlns='http://www.w3.org/2000/svg'
			version='1.1'
			viewBox='0 0 800 800'
		>
			<defs>
				<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='hhhorizon-grad'>
					<stop stop-color={color1} stop-opacity='1' offset='25%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='100%'></stop>
				</linearGradient>
				<linearGradient
					x1='50%'
					y1='0%'
					x2='50%'
					y2='100%'
					id='hhhorizon-grad2'
				>
					<stop stop-color={color1} stop-opacity='1' offset='0%'></stop>
					<stop stop-color={color2} stop-opacity='1' offset='75%'></stop>
				</linearGradient>
				<clipPath id='SvgjsClipPath1000'>
					<rect width='800' height='35' x='0' y='0'></rect>
					<rect width='800' height='34' x='0' y='24'></rect>
					<rect width='800' height='33' x='0' y='47'></rect>
					<rect width='800' height='32' x='0' y='71'></rect>
					<rect width='800' height='31' x='0' y='94'></rect>
					<rect width='800' height='30' x='0' y='118'></rect>
					<rect width='800' height='29' x='0' y='141'></rect>
					<rect width='800' height='28' x='0' y='165'></rect>
					<rect width='800' height='27' x='0' y='188'></rect>
					<rect width='800' height='26' x='0' y='212'></rect>
					<rect width='800' height='25' x='0' y='235'></rect>
					<rect width='800' height='24' x='0' y='259'></rect>
					<rect width='800' height='23' x='0' y='282'></rect>
					<rect width='800' height='22' x='0' y='306'></rect>
					<rect width='800' height='21' x='0' y='329'></rect>
					<rect width='800' height='20' x='0' y='353'></rect>
					<rect width='800' height='19' x='0' y='376'></rect>
					<rect width='800' height='18' x='0' y='400'></rect>
					<rect width='800' height='17' x='0' y='424'></rect>
					<rect width='800' height='16' x='0' y='447'></rect>
					<rect width='800' height='15' x='0' y='471'></rect>
					<rect width='800' height='14' x='0' y='494'></rect>
					<rect width='800' height='13' x='0' y='518'></rect>
					<rect width='800' height='12' x='0' y='541'></rect>
					<rect width='800' height='11' x='0' y='565'></rect>
					<rect width='800' height='10' x='0' y='588'></rect>
					<rect width='800' height='9' x='0' y='612'></rect>
					<rect width='800' height='8' x='0' y='635'></rect>
					<rect width='800' height='7' x='0' y='659'></rect>
					<rect width='800' height='6' x='0' y='682'></rect>
					<rect width='800' height='5' x='0' y='706'></rect>
					<rect width='800' height='4' x='0' y='729'></rect>
					<rect width='800' height='3' x='0' y='753'></rect>
					<rect width='800' height='2' x='0' y='776'></rect>
					<rect width='800' height='1' x='0' y='800'></rect>
				</clipPath>
				<clipPath>
					<rect width='800' height='1' x='0' y='35'></rect>
					<rect width='800' height='2' x='0' y='70'></rect>
					<rect width='800' height='3' x='0' y='105'></rect>
					<rect width='800' height='4' x='0' y='140'></rect>
					<rect width='800' height='5' x='0' y='175'></rect>
					<rect width='800' height='6' x='0' y='210'></rect>
					<rect width='800' height='7' x='0' y='245'></rect>
					<rect width='800' height='8' x='0' y='280'></rect>
					<rect width='800' height='9' x='0' y='315'></rect>
					<rect width='800' height='10' x='0' y='350'></rect>
					<rect width='800' height='11' x='0' y='385'></rect>
					<rect width='800' height='12' x='0' y='420'></rect>
					<rect width='800' height='13' x='0' y='455'></rect>
					<rect width='800' height='14' x='0' y='490'></rect>
					<rect width='800' height='15' x='0' y='525'></rect>
					<rect width='800' height='16' x='0' y='560'></rect>
					<rect width='800' height='17' x='0' y='595'></rect>
					<rect width='800' height='18' x='0' y='630'></rect>
					<rect width='800' height='19' x='0' y='665'></rect>
					<rect width='800' height='20' x='0' y='700'></rect>
					<rect width='800' height='21' x='0' y='735'></rect>
					<rect width='800' height='22' x='0' y='770'></rect>
					<rect width='800' height='23' x='0' y='805'></rect>
				</clipPath>
			</defs>
			<rect
				fill='url(#hhhorizon-grad)'
				clip-path='url("#SvgjsClipPath1000")'
			></rect>
			<circle
				r='400'
				cx='400'
				cy='0'
				fill='url(#hhhorizon-grad)'
				clip-path='url("#SvgjsClipPath1000")'
			></circle>
			<circle
				r='400'
				cx='400'
				cy='800'
				fill='url(#hhhorizon-grad)'
				clip-path='url("#SvgjsClipPath1000")'
			></circle>
		</svg>
	);
};
export default Horizon;
