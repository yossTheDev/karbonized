import {
	IconHeart,
	IconHeartFilled,
	IconHexagon,
	IconHexagonFilled,
} from '@tabler/icons-react';
import React from 'react';
import {
	Arrow2Svg,
	Arrow3Svg,
	Arrow4Svg,
	Arrow5Svg,
	Arrow6Svg,
	ArrowSvg,
	LineSvg,
	OvalSvg,
	PoligonSvg,
	RectangleSvg,
	StarSvg,
	Trianglevg,
} from '../General/Icons';

interface Props {
	type: string;
	color: string;
}
export const ShapeHandler: React.FC<Props> = ({ type, color }) => {
	// Store Actions
	switch (type) {
		case 'arrow':
			return (
				<ArrowSvg
					style={{ fill: color }}
					className='flex flex-auto w-full h-full'
				></ArrowSvg>
			);

		case 'arrow2':
			return (
				<Arrow2Svg
					style={{ fill: color }}
					className='flex flex-auto  w-full h-full'
				></Arrow2Svg>
			);
		case 'arrow3':
			return (
				<Arrow3Svg
					style={{ fill: color }}
					className='flex flex-auto  w-full h-full'
				></Arrow3Svg>
			);
		case 'arrow4':
			return (
				<Arrow4Svg
					style={{ fill: color }}
					className='flex flex-auto  w-full h-full'
				></Arrow4Svg>
			);
		case 'arrow5':
			return (
				<Arrow5Svg
					style={{ fill: color }}
					className='flex flex-auto  w-full h-full'
				></Arrow5Svg>
			);

		case 'arrow6':
			return (
				<Arrow6Svg
					style={{ fill: color }}
					className='flex flex-auto  w-full h-full'
				></Arrow6Svg>
			);
		case 'line':
			return (
				<LineSvg
					style={{ stroke: color }}
					className='flex flex-auto w-full h-full'
				></LineSvg>
			);
		case 'poligon':
			return (
				<PoligonSvg
					style={{ fill: color }}
					className='flex flex-auto w-full h-full'
				></PoligonSvg>
			);
		case 'rectangle':
			return (
				<div
					style={{ background: color }}
					className='flex flex-auto w-full h-full'
				></div>
			);
		case 'triangle':
			return (
				<Trianglevg
					style={{ fill: color }}
					className='flex flex-auto w-full h-full'
				></Trianglevg>
			);
		case 'oval':
			return (
				<OvalSvg
					style={{ fill: color }}
					className='flex flex-auto w-full h-full'
				></OvalSvg>
			);
		case 'star':
			return (
				<StarSvg
					style={{ fill: color }}
					className='flex flex-auto w-full h-full'
				></StarSvg>
			);

		case 'heart':
			return (
				<IconHeartFilled
					style={{ color: color }}
					className='flex flex-auto mx-auto w-full h-full'
				></IconHeartFilled>
			);

		case 'hexagon':
			return (
				<IconHexagonFilled
					style={{ color: color }}
					className='flex flex-auto mx-auto w-full h-full'
				></IconHexagonFilled>
			);

		default:
			return <></>;
	}
};
