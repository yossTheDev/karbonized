import {
	IconAppWindow,
	IconBorderStyle,
	IconCode,
	IconDots,
	IconX,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Checkbox, Input, Select, Textarea, Range } from 'react-daisyui';
import { ControlTemplate } from './ControlTemplate';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismThemes from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CloseSvg, MiniminizeSvg } from '../General/Icons';
import { LanguajeTabIcon } from './LanguajeTabIcon';

interface Style {
	label: string;
	theme: {};
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

const CodeControl: React.FC = () => {
	/* Component States */
	const [theme, setTheme] = useState('coldarkDark');
	const [languaje, setLanguaje] = useState('jsx');
	const [code, setCode] = useState(
		`<pre><code class="language-${languaje}"></code></pre>`
	);
	const [color, setColor] = useState('#111b28');
	const [controlsColor, setControlsColor] = useState('#565656');
	const [showTabs, setShowTabs] = useState(true);
	const [title, setTitle] = useState('Code.jsx');
	const [showLineNumbers, setShowLineNumbers] = useState(false);
	const [wrapLines, setWrapLines] = useState(false);
	const [border, setBorder] = useState(8);
	const [windowStyle, setWindowStyle] = useState('mac');

	const [colorMode, setColorMode] = useState('Single');
	const [gColor1, setGColor1] = useState('#0da2e7');
	const [gColor2, setGColor2] = useState('#5895c8');
	const [gradientDeg, setGradientDeg] = useState(22);

	/* Handle Chage Theme */
	const handleChangeTheme = (theme: string) => {
		return themes.find((value) => value.label === theme)?.theme;
	};

	/* Handle Change Theme Colors */
	useEffect(() => {
		const newTheme = themes.find((value) => value.label === theme)?.theme;

		if (
			(newTheme as any)[':not(pre) > code[class*="language-"]'] !== undefined &&
			(newTheme as any)[':not(pre) > code[class*="language-"]'].background !==
				undefined &&
			(newTheme as any)[':not(pre) > code[class*="language-"]'].background
		)
			setColor(
				(newTheme as any)[':not(pre) > code[class*="language-"]'].background
			);
	}, [theme]);

	return (
		<>
			<ControlTemplate
				border={6}
				borderEditable={false}
				defaultHeight='140px'
				defaultWidth='460px'
				minHeight='100px'
				maxWidth='2050px'
				maxHeight='2050px'
				menu={
					<>
						{/* Border  */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className='font-bold my-auto'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto p-2'>
									<p className='p-2 my-auto'>Radius:</p>
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
								<div className='flex flex-row m-2 gap-2 '>
									<IconCode size={22}></IconCode>
									<p className='font-bold my-auto'>Code</p>
								</div>
							}
						>
							<p>Languaje</p>
							<Select
								tabIndex={0}
								value={languaje}
								onChange={(e) => {
									setLanguaje(e);
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
									setTheme(e);
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
								className=' h-32 resize-none flex flex-auto'
								value={code}
								onChange={(ev) => setCode(ev.target.value)}
							></Textarea>
						</CustomCollapse>

						{/* Window Settings */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2 '>
									<IconAppWindow size={22}></IconAppWindow>
									<p className='font-bold my-auto'>Window</p>
								</div>
							}
						>
							<p className='text-xs'>Window Style</p>
							<Select
								defaultValue={'mac'}
								tabIndex={0}
								value={windowStyle}
								onChange={(e) => setWindowStyle(e)}
							>
								<option value={'mac'}>mac</option>
								<option value={'window'}>window</option>
							</Select>

							{/* Show Tabs */}
							<div className='flex flex-row m-2 gap-2'>
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
								<div className='flex flex-row m-2 gap-2'>
									<IconDots size={22}></IconDots>
									<p className='font-bold my-auto'>Other Options</p>
								</div>
							}
						>
							{/* Show Line Numbers */}
							<div className='flex flex-col'>
								<div className='flex flex-row m-2 gap-2'>
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
								<div className='flex flex-row m-2 gap-2'>
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
					className='flex flex-auto flex-col p-2 overflow-hidden select-none '
				>
					{/* Title */}
					<div className='flex flex-auto max-h-12 p-1'>
						<div className='flex flex-auto flex-row w-1/3 my-auto'>
							{windowStyle === 'window' ? (
								<>
									{!showTabs && (
										<p
											style={{ color: controlsColor }}
											className='text-center mb-auto my-auto hover:border-none flex flex-auto w-20 overflow-hidden'
										>
											{title}
										</p>
									)}
								</>
							) : (
								<div className='my-auto flex  flex-row gap-1 mr-2'>
									<div className='p-1 w-4  h-4 rounded-full bg-red-500 my-auto'></div>
									<div className='p-1 w-4  h-4 rounded-full bg-yellow-300 my-auto'></div>
									<div className='p-1 w-4  h-4 rounded-full  bg-green-500 my-auto'></div>
								</div>
							)}

							{/* Tabs */}
							{showTabs && (
								<div className='bg-slate-500/5 p-1 rounded-box flex  flex-row gap-2 text-gray-400 max-h-10 h-10 w-40 overflow-hidden mr-auto'>
									<div className='my-auto flex flex-auto  flex-row gap-1'>
										<div className='text-xs mr-auto'></div>
										<LanguajeTabIcon languaje={languaje}></LanguajeTabIcon>

										<p className=''>{title}</p>
										<IconX className='mx-auto my-auto mr-2' size={15}></IconX>
									</div>
								</div>
							)}
						</div>

						{!showTabs && (
							<>
								<div className='flex flex-auto flex-row w-1/3 my-auto '>
									{windowStyle === 'mac' && !showTabs && (
										<p
											style={{ color: controlsColor }}
											className='text-center mx-auto my-auto'
										>
											{title}
										</p>
									)}
								</div>
							</>
						)}

						<div className='flex flex-auto flex-row w-1/3 my-auto'>
							{windowStyle === 'window' && (
								<div className='flex flex-row flex-auto w-1/3 my-auto'>
									<MiniminizeSvg
										style={{ fill: controlsColor }}
										className='h-4 w-4 ml-auto my-auto'
									></MiniminizeSvg>
									<CloseSvg
										style={{ fill: controlsColor }}
										className='h-4 w-4  ml-2 my-auto'
									></CloseSvg>
								</div>
							)}
						</div>
					</div>

					{/* Code */}
					<div className='flex flex-auto '>
						<SyntaxHighlighter
							customStyle={{
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
								background: color,
							}}
							wrapLongLines
							showLineNumbers={showLineNumbers}
							wrapLines={wrapLines}
							language={languaje}
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
