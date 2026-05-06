import React, { Suspense, useRef, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import './App.css';
import { AppContext } from './AppContext';
import { useScreenDirection } from './hooks/useScreenDirection';
import { useTheme } from './hooks/useTheme';
import './utils.css';
import { isElectron } from './utils/isElectron';
import { Spinner } from '@/components/ui/spinner';
import { KarbonizedLogoFlat } from './components/Icons/Icons';

const Editor = React.lazy(async () => await import('./pages/Editor'));
const NewProject = React.lazy(async () => await import('./pages/NewProject'));
const BlockEditor = React.lazy(async () => await import('./pages/BlockEditor'));
const TitleBar = React.lazy(
	async () => await import('./components/Base/TitleBar'),
);
const MenuBar = React.lazy(
	async () => await import('./components/Base/MenuBar'),
);

const App: React.FC = () => {
	const [theme, toggleTheme] = useTheme();
	const isHorizontal = useScreenDirection();
	const viewerRef = useRef(null);

	return (
		<Router>
			<AppContext.Provider
				value={{
					viewerRef,
					theme,
					toggleTheme,
				}}
			>
				<div
					onContextMenu={(event) => {
						event.preventDefault();
					}}
					className='grid-background flex h-screen w-screen flex-auto flex-col overflow-hidden bg-background text-foreground transition-all ease-in-out'
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
							{isElectron() ? (
								Boolean(
									(window as any).electron.ipcRenderer.isLinuxOrWindows(),
								) && (
									<Suspense>
										<TitleBar></TitleBar>
									</Suspense>
								)
							) : (
								<div className='my-1 flex items-center'>
									<Suspense>
										<KarbonizedLogoFlat className='size-6 ml-4 mr-2' />

										<MenuBar></MenuBar>
									</Suspense>
								</div>
							)}

							{/* Body */}
							<div
								className='relative flex h-full w-full flex-auto overflow-hidden'
								id='body'
							>
								<Routes>
									<Route
										path='/new'
										element={
											<Suspense
												fallback={
													<div className='flex items-center justify-center'>
														<Spinner className='h-8 w-8' />
													</div>
												}
											>
												<NewProject />
											</Suspense>
										}
									/>
									<Route
										path='/editor'
										element={
											<Suspense
												fallback={
													<div className='flex items-center justify-center'>
														<Spinner className='h-8 w-8' />
													</div>
												}
											>
												<Editor />
											</Suspense>
										}
									/>
									<Route
										path='/block-editor'
										element={
											<Suspense
												fallback={
													<div className='flex items-center justify-center'>
														<Spinner className='h-8 w-8' />
													</div>
												}
											>
												<BlockEditor />
											</Suspense>
										}
									/>
									<Route path='*' element={<Navigate to='/new' replace />} />
								</Routes>
							</div>
						</>
					) : (
						<div
							className='relative flex h-full w-full flex-auto flex-col overflow-hidden'
							id='body'
						>
							<p>Open In Desktop</p>
						</div>
					)}
				</div>
			</AppContext.Provider>
		</Router>
	);
};

export default App;
