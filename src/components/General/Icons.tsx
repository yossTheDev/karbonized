import React from 'react';

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const ArrowSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='152.28125px'
			height='122.44992px'
			viewBox='0 0 152.28125 122.44992'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M16.3865 28.4281C16.3865 28.4281 29.1225 29.4755 42.362 27.2692C55.6014 25.0629 69.3443 19.6029 69.3443 19.6029C69.3443 19.6029 60.3313 26.2799 56.9668 32.2267C53.6024 38.1735 54.4485 42.5398 54.4485 42.5398C54.4485 42.5398 61.4049 61.497 88.808 75.4596C116.211 89.4222 144.114 77.1999 144.114 77.1999L144.254 77.6151C144.254 77.6151 110.366 105.58 82.8476 91.0638C55.3296 76.5472 46.3237 55.051 46.3237 55.051C46.3237 55.051 43.5168 59.0133 41.5917 65.1986C39.6666 71.3839 38.4728 80.1913 38.4728 80.1913C38.4728 80.1913 34.1036 63.3704 28.582 50.4296C23.0604 37.4887 16.3865 28.4281 16.3865 28.4281Z'
				id='Rectangle'
				stroke='none'
			/>
		</svg>
	);
};

export const StarSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='512px'
			height='512px'
			viewBox='0 0 512 512'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M256 0L331.236 152.446L499.47 176.891L377.735 295.554L406.473 463.108L256 384L105.528 463.109L134.265 295.555L12.5292 176.893L180.763 152.446L256 0Z'
				id='Star'
				fill-rule='evenodd'
				stroke='none'
			/>
		</svg>
	);
};

export const PoligonSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='512px'
			height='512px'
			viewBox='0 0 512 512'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M256 0L499.47 176.891L406.473 463.108L105.528 463.109L12.5292 176.893L256 0Z'
				id='Polygon'
				fill-rule='evenodd'
				stroke='none'
			/>
		</svg>
	);
};

export const Trianglevg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='512px'
			height='512px'
			viewBox='0 0 512 512'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M256 0L512 512L0 512L256 0Z'
				id='Triangle'
				fill-rule='evenodd'
				stroke='none'
			/>
		</svg>
	);
};

export const LineSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='15px'
			height='512px'
			viewBox='0 0 15 512'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M7.5 0L7.5 512'
				id='Line'
				fill='none'
				fill-rule='evenodd'
				stroke-width='13'
				stroke-linecap='square'
			/>
		</svg>
	);
};

export const RectangleSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='512px'
			height='512px'
			viewBox='0 0 512 512'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0 0L512 0L512 512L0 512L0 0Z'
				id='Rectangle'
				fill-rule='evenodd'
				stroke='none'
			/>
		</svg>
	);
};

export const OvalSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='512px'
			height='512px'
			viewBox='0 0 512 512'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256Z'
				id='Oval'
				fill-rule='evenodd'
				stroke='none'
			/>
		</svg>
	);
};

export const MiniminizeSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='256px'
			height='256px'
			viewBox='0 0 256 256'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<defs>
				<rect width='256' height='256' id='artboard_1' />
			</defs>
			<g id='Artboard-15' clip-path='url(#clip_1)'>
				<path d='M22 216L234 216L234 226L22 226L22 216Z' id='Rectangle' />
			</g>
		</svg>
	);
};

export const CloseSvg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='256px'
			height='256px'
			viewBox='0 0 256 256'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<defs>
				<rect width='256' height='256' id='artboard_1' />
			</defs>
			<g id='Artboard-17' clip-path='url(#clip_1)'>
				<path
					d='M55.2231 50.7695L207.723 198.037L200.777 205.23L48.2766 57.9629L55.2231 50.7695Z'
					id='Rectangle'
					fill-rule='evenodd'
					stroke='none'
				/>
				<path
					d='M201.053 51.2L48.5534 198.467L55.4999 205.661L208 58.3934L201.053 51.2Z'
					id='Rectangle-2'
					fill-rule='evenodd'
					stroke='none'
				/>
			</g>
		</svg>
	);
};
