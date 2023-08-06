import React from 'react';
import { Editor } from './pages/Editor';
import { TitleBar } from './components/Base/TitleBar';
import { useScreenDirection } from './hooks/useScreenDirection';
import { Home } from './pages/Home';
import { isElectron } from './utils/isElectron';
import { MenuBar } from './components/Base/MenuBar';

import karbonized from './assets/karbonized.svg';

const App: React.FC = () => {
	const isHorizontal = useScreenDirection();

	return (
		<div className='flex h-screen w-screen flex-auto flex-col overflow-hidden bg-base-200 p-1 transition-all ease-in-out'>
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
						colorInterpolationFilters='linearRGB'
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
							lightingColor='#1a1a18'
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

			{isHorizontal ? (
				<>
					{isElectron() &&
						(window as any).electron.ipcRenderer.isLinuxOrWindows() && (
							<TitleBar></TitleBar>
						)}

					{!isElectron() && (
						<div className='flex flex-row'>
							<img className='my-auto ml-4 h-5' src={karbonized}></img>

							<MenuBar></MenuBar>
						</div>
					)}
					<Editor></Editor>
				</>
			) : (
				<>
					<Home></Home>
				</>
			)}
		</div>
	);
};

export default App;
