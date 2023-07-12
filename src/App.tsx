import React from 'react';
import { Editor } from './pages/Editor';
import { TitleBar } from './components/Base/TitleBar';
import { useTauriPlatform } from './hooks/useTauriPlatform';
import Flux from './components/General/SvgBackgrounds/Flux';

const App: React.FC = () => {
	const isTauriPlatform = useTauriPlatform();

	return (
		<div className='flex h-screen w-screen flex-auto flex-col overflow-hidden transition-all ease-in-out'>
			{/* Noise Background */}
			<svg
				className='fixed'
				xmlns='http://www.w3.org/2000/svg'
				version='1.1'
				viewBox='0 0 700 700'
			>
				<defs>
					<filter
						id='nnnoise-filter'
						x='-20%'
						y='-20%'
						width='140%'
						height='140%'
						filterUnits='objectBoundingBox'
						primitiveUnits='userSpaceOnUse'
						color-interpolation-filters='linearRGB'
					>
						<feTurbulence
							type='fractalNoise'
							baseFrequency='0.102'
							numOctaves='4'
							seed='15'
							stitchTiles='stitch'
							x='0%'
							y='0%'
							width='100%'
							height='100%'
							result='turbulence'
						></feTurbulence>
						<feSpecularLighting
							surfaceScale='15'
							specularConstant='0.75'
							specularExponent='20'
							lighting-color='#1a1a18'
							x='0%'
							y='0%'
							width='100%'
							height='100%'
							in='turbulence'
							result='specularLighting'
						>
							<feDistantLight azimuth='3' elevation='100'></feDistantLight>
						</feSpecularLighting>
					</filter>
				</defs>
				<rect width='700' height='700' fill='transparent'></rect>
				<rect
					width='700'
					height='700'
					fill='#2D2D2A'
					filter='url(#nnnoise-filter)'
				></rect>
			</svg>

			{isTauriPlatform && <TitleBar></TitleBar>}
			<Editor></Editor>
		</div>
	);
};

export default App;
