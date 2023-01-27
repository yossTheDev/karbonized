import { IconHeart, IconHeartFilled, IconHexagon, IconHexagonFilled } from '@tabler/icons-react';
import React from 'react';
import {
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
