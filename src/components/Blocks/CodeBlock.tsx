import {
	IconAppWindow,
	IconBorderStyle,
	IconCode,
	IconDots,
	IconX,
} from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { Checkbox, Input, Select, Textarea, Range } from 'react-daisyui';
import { ControlTemplate } from './ControlTemplate';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismThemes from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CloseSvg, MinimizeSvg } from '../Misc/Icons';
import { LanguajeTabIcon } from './LanguajeTabIcon';
import { useControlState } from '../../hooks/useControlState';

interface Style {
	label: string;
	theme: {};
}

interface Props {
	id: string;
}

const themes: Style[] = [
	{ label: 'a11yDark', theme: prismThemes.a11yDark },
	{ label: 'atomDark', theme: prismThemes.atomDark },
	{
		label: 'base16AteliersulphurpoolLight',
		theme: prismThemes.base16AteliersulphurpoolLight,
	},
	{ label: 'cb', theme: prismThemes.cb },
	{ label: 'coldarkCold', theme: prismThemes.coldarkCold },
	{ label: 'coldarkDark', theme: prismThemes.coldarkDark },
	{ label: 'coy', theme: prismThemes.coy },
	{ label: 'darcula', theme: prismThemes.darcula },
	{ label: 'duotoneDark', theme: prismThemes.duotoneDark },
	{ label: 'duotoneEarth', theme: prismThemes.duotoneEarth },
	{ label: 'duotoneForest', theme: prismThemes.duotoneForest },
	{ label: 'duotoneLight', theme: prismThemes.duotoneLight },
	{ label: 'duotoneSea', theme: prismThemes.duotoneSea },
	{ label: 'duotoneSpace', theme: prismThemes.duotoneSpace },
	{ label: 'funky', theme: prismThemes.funky },
	{ label: 'ghcolors', theme: prismThemes.ghcolors },
	{ label: 'gruvboxDark', theme: prismThemes.gruvboxDark },
	{ label: 'gruvboxLight', theme: prismThemes.gruvboxLight },
	{ label: 'hopscotch', theme: prismThemes.hopscotch },
	{ label: 'materialDark', theme: prismThemes.materialDark },
	{ label: 'materialLight', theme: prismThemes.materialLight },
	{ label: 'materialOceanic', theme: prismThemes.materialOceanic },
	{ label: 'nord', theme: prismThemes.nord },
	{ label: 'okaidia', theme: prismThemes.okaidia },
	{ label: 'oneDark', theme: prismThemes.oneDark },
	{ label: 'oneLight', theme: prismThemes.oneLight },
	{ label: 'pojoaque', theme: prismThemes.pojoaque },
	{ label: 'prism', theme: prismThemes.prism },
	{ label: 'shadesOfPurple', theme: prismThemes.shadesOfPurple },
	{ label: 'solarizedlight', theme: prismThemes.solarizedlight },
	{ label: 'synthwave84', theme: prismThemes.synthwave84 },
	{ label: 'tomorrow', theme: prismThemes.tomorrow },
	{ label: 'twilight', theme: prismThemes.twilight },
	{ label: 'vs', theme: prismThemes.vs },
	{ label: 'vscDarkPlus', theme: prismThemes.vscDarkPlus },
	{ label: 'xonokai', theme: prismThemes.xonokai },
];

const CodeControl: React.FC<Props> = ({ id }) => {
	/* Component States */

	const [theme, setTheme] = useControlState('coldarkDark', `${id}-theme`);
	const [language, setLanguage] = useControlState('jsx', `${id}-lang`);
	const [code, setCode] = useControlState(
		`<pre><code class="language-${language}"></code></pre>`,
		`${id}-code`,
	);
	const [color, setColor] = useControlState('#111b28', `${id}-bgcolor`);
	const [controlsColor, setControlsColor] = useControlState(
		'#b4b4b4',
		`${id}-ccolor`,
	);
	const [showTabs, setShowTabs] = useControlState(true, `${id}-tabs`);
	const [title, setTitle] = useControlState('Code.jsx', `${id}-wintitle`);
	const [showLineNumbers, setShowLineNumbers] = useControlState(
		false,
		`${id}-linenumbers`,
	);
	const [wrapLines, setWrapLines] = useControlState(false, `${id}-wraplines`);
	const [border, setBorder] = useControlState(8, `${id}-border`);
	const [windowStyle, setWindowStyle] = useControlState(
		'mac',
		`${id}-winstyle`,
	);

	const [colorMode, setColorMode] = useControlState(
		'Single',
		`${id}-colormode`,
	);
	const [gColor1, setGColor1] = useControlState('#0da2e7', `${id}-gradientc1`);
	const [gColor2, setGColor2] = useControlState('#5895c8', `${id}-gradientc2`);
	const [gradientDeg, setGradientDeg] = useControlState(
		22,
		`${id}-gradientdeg`,
	);

	/* Handle Change Theme */
	const handleChangeTheme = (theme: string) => {
		return themes.find((value) => value.label === theme)?.theme;
	};

	/* Handle Change Theme Colors */
	useEffect(() => {
		const newTheme = themes.find((value) => value.label === theme)?.theme;

		setColor(
			(newTheme as any)[':not(pre) > code[class*="language-"]'].background ||
				(newTheme as any)[`code[class*="language-"]`].background,
		);
	}, [theme]);

	return (
		<>
			<ControlTemplate
				id={id}
				border={6}
				borderEditable={false}
				defaultHeight='140px'
				defaultWidth='460px'
				minWidth='415px'
				minHeight='140px'
				maxWidth='2050px'
				maxHeight='2050px'
				menu={
					<>
						{/* Border  */}
						<CustomCollapse
							menu={
								<div className='flex flex-row gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className='my-auto font-bold'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto p-2'>
									<p className='my-auto p-2'>Radius:</p>
									<Range
										className='my-auto'
										color='primary'
										onChange={(ev) =>
											setBorder(ev.target.value as unknown as number)
										}
										value={border}
										max={'22'}
									></Range>
								</div>
							</div>
						</CustomCollapse>

						{/* Code Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row gap-2 '>
									<IconCode size={22}></IconCode>
									<p className='my-auto font-bold'>Code</p>
								</div>
							}
						>
							<p>Language</p>
							<Select
								tabIndex={0}
								value={language}
								onChange={(e) => {
									setLanguage(e.currentTarget.value);
								}}
							>
								{SyntaxHighlighter.supportedLanguages.map((i) => {
									return (
										<option key={i} value={i}>
											{i}
										</option>
									);
								})}
							</Select>

							<p>Theme</p>
							<Select
								tabIndex={0}
								value={theme.toString()}
								onChange={(e) => {
									setTheme(e.currentTarget.value);
								}}
							>
								{themes.map((i) => {
									return (
										<option key={i.label} value={i.label}>
											{i.label}
										</option>
									);
								})}
							</Select>

							<p>Title</p>
							<Input
								value={title}
								onChange={(ev) => setTitle(ev.currentTarget.value)}
							></Input>

							<p>Code</p>
							<Textarea
								spellCheck={false}
								className=' flex h-32 flex-auto resize-none'
								value={code}
								onChange={(ev) => setCode(ev.target.value)}
							></Textarea>
						</CustomCollapse>

						{/* Window Settings */}
						<CustomCollapse
							menu={
								<div className='flex flex-row gap-2 '>
									<IconAppWindow size={22}></IconAppWindow>
									<p className='my-auto font-bold'>Window</p>
								</div>
							}
						>
							<p className='text-xs'>Window Style</p>
							<Select
								defaultValue={'mac'}
								tabIndex={0}
								value={windowStyle}
								onChange={(e) => setWindowStyle(e.currentTarget.value)}
							>
								<option value={'mac'}>mac</option>
								<option value={'window'}>window</option>
							</Select>

							{/* Show Tabs */}
							<div className='m-2 flex flex-row gap-2'>
								<p className='my-auto text-xs'>Show Tabs</p>
								<Checkbox
									color='primary'
									onChange={(ev) => setShowTabs(ev.currentTarget.checked)}
									checked={showTabs}
								></Checkbox>
							</div>

							{/* Background */}
							<ColorPicker
								label='Window Color'
								type='HexAlpha'
								onModeChange={(mode) => setColorMode(mode)}
								onGradientChange={(color1, color2) => {
									setGColor1(color1);
									setGColor2(color2);
								}}
								onGradientDegChange={(deg) => setGradientDeg(deg)}
								color={color}
								mode={colorMode}
								gradientDeg={gradientDeg}
								colorGradient1={gColor1}
								colorGradient2={gColor2}
								onColorChange={setColor}
							></ColorPicker>

							{/* Controls */}
							<ColorPicker
								color={controlsColor}
								onColorChange={setControlsColor}
								isGradientEnable={false}
								label='Controls Color'
							></ColorPicker>
						</CustomCollapse>

						{/* Other Options */}
						<CustomCollapse
							menu={
								<div className='flex flex-row gap-2'>
									<IconDots size={22}></IconDots>
									<p className='my-auto font-bold'>Other Options</p>
								</div>
							}
						>
							{/* Show Line Numbers */}
							<div className='flex flex-col'>
								<div className='m-2 flex flex-row gap-2'>
									<p className='my-auto text-xs'>Show Line Numbers</p>
									<Checkbox
										color='primary'
										onChange={(ev) =>
											setShowLineNumbers(ev.currentTarget.checked)
										}
										checked={showLineNumbers}
									></Checkbox>
								</div>
							</div>

							{/* Wrap Lines */}
							<div className='flex flex-col'>
								<div className='m-2 flex flex-row gap-2'>
									<p className='my-auto text-xs'> Wrap Lines</p>
									<Checkbox
										color='primary'
										onChange={(ev) => setWrapLines(ev.currentTarget.checked)}
										checked={wrapLines}
									></Checkbox>
								</div>
							</div>
						</CustomCollapse>
					</>
				}
			>
				<div
					style={{
						borderRadius: border + 'px',
						background:
							colorMode === 'Single'
								? color
								: `linear-gradient(${gradientDeg}deg, ${gColor1},${gColor2})`,
					}}
					className='flex flex-auto select-none flex-col overflow-hidden p-2 '
				>
					{/* Title */}
					<div className='flex max-h-12 flex-auto p-1'>
						<div className='my-auto flex w-1/3 flex-auto flex-row'>
							{windowStyle === 'window' ? (
								<>
									{!showTabs && (
										<p
											style={{ color: controlsColor }}
											className='my-auto mb-auto flex w-20 flex-auto overflow-hidden text-center hover:border-none'
										>
											{title}
										</p>
									)}
								</>
							) : (
								<div className='my-auto ml-1  mr-2 flex flex-row gap-1'>
									<div className='my-auto h-4  w-4 rounded-full bg-red-500 p-1'></div>
									<div className='my-auto h-4  w-4 rounded-full bg-yellow-300 p-1'></div>
									<div className='my-auto h-4  w-4 rounded-full  bg-green-500 p-1'></div>
								</div>
							)}

							{/* Tabs */}
							{showTabs && (
								<div className='rounded-box mr-auto flex h-10  max-h-10 w-40 flex-row gap-2 overflow-hidden bg-slate-500/5 p-1'>
									<div
										style={{ color: controlsColor }}
										className='my-auto flex flex-auto  flex-row gap-1'
									>
										<div className='mr-auto text-xs'></div>
										<LanguajeTabIcon languaje={language}></LanguajeTabIcon>

										<p style={{ color: controlsColor }} className=''>
											{title}
										</p>
										<IconX
											style={{ color: controlsColor }}
											className='mx-auto my-auto mr-2'
											size={15}
										></IconX>
									</div>
								</div>
							)}
						</div>

						{!showTabs && (
							<>
								<div className='my-auto flex w-1/3 flex-auto flex-row '>
									{windowStyle === 'mac' && !showTabs && (
										<p
											style={{ color: controlsColor }}
											className='mx-auto my-auto text-center'
										>
											{title}
										</p>
									)}
								</div>
							</>
						)}

						<div className='my-auto flex w-1/3 flex-auto flex-row'>
							{windowStyle === 'window' && (
								<div className='my-auto flex w-1/3 flex-auto flex-row'>
									<MinimizeSvg
										style={{ fill: controlsColor }}
										className='my-auto ml-auto h-4 w-4'
									></MinimizeSvg>
									<CloseSvg
										style={{ fill: controlsColor }}
										className='my-auto ml-2  h-4 w-4'
									></CloseSvg>
								</div>
							)}
						</div>
					</div>

					{/* Code */}
					<div className='flex flex-auto '>
						<SyntaxHighlighter
							customStyle={{
								cursor: 'default',
								display: 'flex',
								flex: '1 1 auto',
								textDecorationThickness: '0px',
								textEmphasisColor: 'darkolivegreen',
								textShadow: 'none',
								boxShadow: 'none',
								color: '#f25555',
								whiteSpace: 'pre-wrap',
								borderRadius: '0.25rem',
								overflow: 'hidden',
								background:
									colorMode === 'Single'
										? color
										: `linear-gradient(${gradientDeg}deg, ${gColor1},${gColor2})`,
							}}
							wrapLongLines
							showLineNumbers={showLineNumbers}
							wrapLines={wrapLines}
							language={language}
							style={handleChangeTheme(theme)}
						>
							{code}
						</SyntaxHighlighter>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};

export default CodeControl;
