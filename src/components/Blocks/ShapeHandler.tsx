import { IconHeartFilled, IconHexagonFilled } from '@tabler/icons-react';
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
	StarSvg,
	Trianglevg,
} from '../Misc/Icons';

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
					className='flex h-full w-full flex-auto border-none'
				></ArrowSvg>
			);

		case 'arrow2':
			return (
				<Arrow2Svg
					style={{ fill: color }}
					className='flex h-full  w-full flex-auto border-none'
				></Arrow2Svg>
			);
		case 'arrow3':
			return (
				<Arrow3Svg
					style={{ fill: color }}
					className='flex h-full  w-full flex-auto border-none'
				></Arrow3Svg>
			);
		case 'arrow4':
			return (
				<Arrow4Svg
					style={{ fill: color }}
					className='flex h-full  w-full flex-auto border-none'
				></Arrow4Svg>
			);
		case 'arrow5':
			return (
				<Arrow5Svg
					style={{ fill: color }}
					className='flex h-full  w-full flex-auto border-none'
				></Arrow5Svg>
			);

		case 'arrow6':
			return (
				<Arrow6Svg
					style={{ fill: color }}
					className='flex h-full  w-full flex-auto border-none'
				></Arrow6Svg>
			);
		case 'line':
			return (
				<LineSvg
					style={{ stroke: color }}
					className='flex h-full w-full flex-auto border-none'
				></LineSvg>
			);
		case 'poligon':
			return (
				<PoligonSvg
					style={{ fill: color }}
					className='flex h-full w-full flex-auto border-none'
				></PoligonSvg>
			);
		case 'rectangle':
			return (
				<div
					style={{ background: color }}
					className='flex h-full w-full flex-auto border-none'
				></div>
			);
		case 'triangle':
			return (
				<Trianglevg
					style={{ fill: color }}
					className='flex h-full w-full flex-auto border-none'
				></Trianglevg>
			);
		case 'oval':
			return (
				<OvalSvg
					style={{ fill: color }}
					className='flex h-full w-full flex-auto border-none'
				></OvalSvg>
			);
		case 'star':
			return (
				<StarSvg
					style={{ fill: color }}
					className='flex h-full w-full flex-auto border-none'
				></StarSvg>
			);

		case 'heart':
			return (
				<IconHeartFilled
					style={{ color: color }}
					className='mx-auto flex h-full w-full flex-auto border-none'
				></IconHeartFilled>
			);

		case 'hexagon':
			return (
				<IconHexagonFilled
					style={{ color: color }}
					className='mx-auto flex h-full w-full flex-auto border-none'
				></IconHexagonFilled>
			);

		default:
			return <></>;
	}
};
