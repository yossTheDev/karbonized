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

export const Arrow2Svg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='800px'
			height='800px'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				clip-rule='evenodd'
				d='m8.46967 5.46967c.29289-.29289.76776-.29289 1.06066 0 .29289.29289.29289.76777 0 1.06066l-2.60589 2.60589c-.60278.60277-1.02255 1.02338-1.32295 1.37728-.26948.3174-.40585.5396-.4796.7365h15.87811c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-15.87811c.07375.1969.21012.4191.4796.7365.3004.3539.72017.7745 1.32295 1.3773l2.60589 2.6059c.29289.2929.29289.7677 0 1.0606-.2929.2929-.76777.2929-1.06066 0l-2.60589-2.6059-.02271-.0227h-.00002c-.57476-.5747-1.03834-1.0383-1.38307-1.4444-.35495-.4181-.62774-.8243-.7818-1.2985-.24472-.7531-.24472-1.5645 0-2.3176.15406-.4742.42685-.8804.7818-1.29852.34474-.40608.80833-.86967 1.3831-1.44443h.00001l.02269-.02269z'
				fill-rule='evenodd'
			/>
		</svg>
	);
};

export const Arrow3Svg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='800px'
			height='800px'
			viewBox='0 0 48 48'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g id='Layer_2' data-name='Layer 2'>
				<g id='invisible_box' data-name='invisible box'>
					<rect width='48' height='48' fill='none' />
				</g>
				<g id='Q3_icons' data-name='Q3 icons'>
					<path d='M16.8,14.2v7.4l3.6.3c7.4.7,13.1,3.7,16.7,7.5C33,28,27.8,27.3,21,27l-4.2-.2v7.1L7,24.1l9.8-9.9M19.7,6a.9.9,0,0,0-.8.4L2.4,23.1a1.5,1.5,0,0,0,0,2L18.9,41.6a.9.9,0,0,0,.8.4,1.2,1.2,0,0,0,1.1-1.3V31c15.7.7,21.1,3.8,23.5,9.2.4.8.8,1.1,1.1,1.1s.6-.4.6-1c-.2-10.5-10-20.9-25.2-22.4V7.3A1.2,1.2,0,0,0,19.7,6Z' />
				</g>
			</g>
		</svg>
	);
};

export const Arrow4Svg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			height='800px'
			width='800px'
			version='1.1'
			id='_x32_'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
		>
			<g>
				<polygon
					points='380.141,162.138 481.76,166.699 512,136.474 381.402,130.59 375.534,0.007 345.31,30.233 
		349.854,131.867 347.301,134.42 319.337,162.384 314.792,60.75 284.56,90.983 289.112,192.609 257.527,224.195 251.166,124.376 
		221.342,154.201 227.71,254.012 90.698,391.031 56.097,356.431 0,511.993 155.57,455.911 120.969,421.31 257.665,284.614 
		361.152,287.321 390.14,258.319 390.47,256.627 288.328,253.943 319.392,222.872 421.025,227.44 451.25,197.216 349.624,192.655 
		377.573,164.706 	'
				/>
			</g>
		</svg>
	);
};

export const Arrow5Svg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			width='800px'
			height='800px'
			viewBox='0 0 22 22'
			xmlns='http://www.w3.org/2000/svg'
			id='memory-arrow-top-right'
		>
			<path d='M8 5H17V14H15V9H14V10H13V11H12V12H11V13H10V14H9V15L8 15V16H7V15H6V14L7 14V13H8V12H9V11H10V10H11V9H12V8H13V7H8V5Z' />
		</svg>
	);
};

export const Arrow6Svg: React.FC<Props> = ({ className, style }) => {
	return (
		<svg
			style={style}
			className={className}
			version='1.1'
			id='Layer_1'
			xmlns='http://www.w3.org/2000/svg'
			width='800px'
			height='800px'
			viewBox='0 0 70 70'
			enable-background='new 0 0 70 70'
		>
			<g>
				<path
					d='M63.042,7.269L49.18,59.007L34.279,44.105L15.652,62.731L6.958,54.04l18.627-18.627l-14.28-14.281L63.042,7.269
		 M63.042,3.269c-0.346,0-0.693,0.045-1.035,0.137L10.271,17.269c-1.38,0.369-2.458,1.447-2.829,2.828
		c-0.37,1.38,0.025,2.853,1.035,3.863l11.452,11.453L4.13,51.212c-0.75,0.75-1.172,1.768-1.172,2.828
		c0,1.062,0.421,2.078,1.172,2.829l8.693,8.691c0.781,0.78,1.805,1.171,2.828,1.171c1.024,0,2.047-0.391,2.828-1.172l15.799-15.797
		l12.073,12.072c0.76,0.76,1.781,1.172,2.828,1.172c0.346,0,0.693-0.045,1.035-0.137c1.381-0.369,2.459-1.447,2.828-2.828
		L66.905,8.304c0.37-1.381-0.024-2.854-1.035-3.863C65.11,3.681,64.089,3.269,63.042,3.269L63.042,3.269z'
				/>
				<g>
					<path
						d='M42.435,18.491c-0.438,0-0.839-0.288-0.963-0.729c-0.149-0.532,0.16-1.084,0.692-1.233l2.788-0.783
			c0.533-0.147,1.084,0.16,1.233,0.692s-0.161,1.084-0.692,1.233l-2.788,0.783C42.614,18.479,42.523,18.491,42.435,18.491z'
					/>
				</g>
				<g>
					<path
						d='M20.618,24.616c-0.437,0-0.838-0.288-0.962-0.729c-0.149-0.532,0.161-1.084,0.693-1.233l16.143-4.531
			c0.531-0.15,1.084,0.16,1.232,0.692c0.149,0.532-0.16,1.084-0.692,1.233l-16.143,4.531C20.798,24.604,20.707,24.616,20.618,24.616
			z'
					/>
				</g>
			</g>
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

export const MinimizeSvg: React.FC<Props> = ({ className, style }) => {
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
