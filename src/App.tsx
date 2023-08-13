import React, { Suspense } from 'react';
import karbonized from './assets/karbonized.svg';
import { useScreenDirection } from './hooks/useScreenDirection';
import { isElectron } from './utils/isElectron';
import { useTheme } from './hooks/useTheme';

const Editor = React.lazy(() => import('./pages/Editor'));
const TitleBar = React.lazy(() => import('./components/Base/TitleBar'));
const MenuBar = React.lazy(() => import('./components/Base/MenuBar'));

const App: React.FC = () => {
	const theme = useTheme();
	const isHorizontal = useScreenDirection();

	return (
		<div
			onContextMenu={(event) => event.preventDefault()}
			className='flex h-screen w-screen flex-auto flex-col overflow-hidden bg-base-300 text-base-content transition-all ease-in-out'
		>
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
						<div className='my-1 flex flex-row'>
							<img className='my-auto ml-4 h-5' src={karbonized}></img>

							<MenuBar></MenuBar>
						</div>
					)}

					<Suspense
						fallback={
							<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
						}
					>
						<Editor></Editor>
					</Suspense>
				</>
			) : (
				<>
					<Suspense
						fallback={
							<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
						}
					>
						<Editor></Editor>
					</Suspense>
				</>
			)}
		</div>
	);
};

export default App;
