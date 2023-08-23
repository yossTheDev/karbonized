import React, { Suspense, useRef, useState } from 'react';
import { AppContext } from './AppContext';
import { useScreenDirection } from './hooks/useScreenDirection';
import { useTheme } from './hooks/useTheme';
import { isElectron } from './utils/isElectron';
import { useStoreState } from './stores/Hooks';
import './utils.css';
import './App.css';
import { NavBarMobile } from './components/Mobile/NavBarMobileEditor';
import ProjectWizard from './components/Modals/ProjectWizard';

const Editor = React.lazy(() => import('./pages/Editor'));
const TitleBar = React.lazy(() => import('./components/Base/TitleBar'));
const MenuBar = React.lazy(() => import('./components/Base/MenuBar'));

const App: React.FC = () => {
	const theme = useTheme();
	const isHorizontal = useScreenDirection();
	let viewerRef = useRef(null);
	const [showWizard, setShowWizard] = useState(true);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	return (
		<AppContext.Provider
			value={{
				viewerRef: viewerRef,
				showWizard: showWizard,
				setShowWizard: setShowWizard,
			}}
		>
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
								<Suspense>
									<TitleBar></TitleBar>
								</Suspense>
							)}

						{isElectron() && (window as any).electron.ipcRenderer.isMac() && (
							<div className='my-1 flex flex-row'>
								<Suspense>
									<svg
										className='my-auto ml-2 flex h-6 w-6 fill-base-content dark:fill-white'
										viewBox='0 0 451.31622 451.31616'
										version='1.1'
										xmlns='http://www.w3.org/2000/svg'
									>
										<defs>
											<path
												d='M251.114 10.5456C237.053 -3.5152 214.263 -3.5152 200.202 10.5456L10.5456 200.202C-3.51519 214.263 -3.51519 237.053 10.5456 251.114L200.202 440.771C214.263 454.831 237.053 454.831 251.114 440.771L440.771 251.114C454.831 237.053 454.831 214.263 440.771 200.202L251.114 10.5456ZM251.151 18.1452C237.091 4.08441 214.3 4.08443 200.24 18.1452L18.2403 200.145C4.17954 214.205 4.17954 236.995 18.2403 251.056L200.24 433.056C214.3 447.116 237.091 447.116 251.151 433.056L433.151 251.056C447.212 236.995 447.212 214.205 433.151 200.145L251.151 18.1452Z'
												id='path_1'
											/>
										</defs>
										<g id='Group-3'>
											<g id='Rec-Subtract'>
												<g clip-path='url(#clip_1)'>
													<use fill='none' stroke-width='12' />
												</g>
											</g>
											<path
												d='M203.05 47.5693C215.56 35.0586 235.838 35.0586 248.349 47.5693L403.75 202.971C416.261 215.482 416.261 235.759 403.75 248.27L248.349 403.672C244.634 407.387 240.234 409.999 235.556 411.507C235.585 398.816 232.019 400.749 239.573 374.964C247.126 349.179 255.652 338.375 265.771 308.368C275.89 278.36 275.179 275.842 280.05 254.932C284.92 234.023 281.278 201.52 258.561 169.564C233.034 133.656 192.433 98.9087 169.001 81.618L203.05 47.5693L203.05 47.5693ZM88.4009 288.828C88.3898 288.882 88.3787 288.936 88.3677 288.99L47.6482 248.27C35.1375 235.759 35.1375 215.482 47.6482 202.971L162.022 86.373C165.225 101.533 178.6 131.78 169.14 158.04C150.072 210.97 99.9601 233.004 88.4009 288.828L88.4009 288.828Z'
												id='Vector'
												fill-rule='evenodd'
												stroke='none'
											/>
										</g>
									</svg>

									<MenuBar></MenuBar>
								</Suspense>
							</div>
						)}

						{!isElectron() && (
							<div
								className={`my-1 ${showWizard ? 'hidden' : 'flex'} flex-row`}
							>
								<Suspense>
									<svg
										className='my-auto ml-2 flex h-6 w-6 fill-base-content dark:fill-white'
										viewBox='0 0 451.31622 451.31616'
										version='1.1'
										xmlns='http://www.w3.org/2000/svg'
									>
										<defs>
											<path
												d='M251.114 10.5456C237.053 -3.5152 214.263 -3.5152 200.202 10.5456L10.5456 200.202C-3.51519 214.263 -3.51519 237.053 10.5456 251.114L200.202 440.771C214.263 454.831 237.053 454.831 251.114 440.771L440.771 251.114C454.831 237.053 454.831 214.263 440.771 200.202L251.114 10.5456ZM251.151 18.1452C237.091 4.08441 214.3 4.08443 200.24 18.1452L18.2403 200.145C4.17954 214.205 4.17954 236.995 18.2403 251.056L200.24 433.056C214.3 447.116 237.091 447.116 251.151 433.056L433.151 251.056C447.212 236.995 447.212 214.205 433.151 200.145L251.151 18.1452Z'
												id='path_1'
											/>
										</defs>
										<g id='Group-3'>
											<g id='Rec-Subtract'>
												<g clip-path='url(#clip_1)'>
													<use fill='none' stroke-width='12' />
												</g>
											</g>
											<path
												d='M203.05 47.5693C215.56 35.0586 235.838 35.0586 248.349 47.5693L403.75 202.971C416.261 215.482 416.261 235.759 403.75 248.27L248.349 403.672C244.634 407.387 240.234 409.999 235.556 411.507C235.585 398.816 232.019 400.749 239.573 374.964C247.126 349.179 255.652 338.375 265.771 308.368C275.89 278.36 275.179 275.842 280.05 254.932C284.92 234.023 281.278 201.52 258.561 169.564C233.034 133.656 192.433 98.9087 169.001 81.618L203.05 47.5693L203.05 47.5693ZM88.4009 288.828C88.3898 288.882 88.3787 288.936 88.3677 288.99L47.6482 248.27C35.1375 235.759 35.1375 215.482 47.6482 202.971L162.022 86.373C165.225 101.533 178.6 131.78 169.14 158.04C150.072 210.97 99.9601 233.004 88.4009 288.828L88.4009 288.828Z'
												id='Vector'
												fill-rule='evenodd'
												stroke='none'
											/>
										</g>
									</svg>

									<MenuBar></MenuBar>
								</Suspense>
							</div>
						)}

						{/* Body */}
						<div
							className='relative flex h-full w-full flex-auto overflow-hidden'
							id='body'
						>
							<div className={`flex h-full w-full flex-auto`}>
								<Suspense
									fallback={
										<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
									}
								>
									{currentWorkspace && <Editor></Editor>}
								</Suspense>
							</div>
						</div>
					</>
				) : (
					<div
						className='relative flex h-full w-full flex-auto flex-col overflow-hidden'
						id='body'
					>
						<Suspense
							fallback={
								<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
							}
						>
							{currentWorkspace && <Editor></Editor>}
							{showWizard && <ProjectWizard open={showWizard}></ProjectWizard>}
						</Suspense>
					</div>
				)}
			</div>
		</AppContext.Provider>
	);
};

export default App;
