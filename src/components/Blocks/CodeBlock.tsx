import {
	IconAppWindow,
	IconBorderStyle,
	IconCode,
	IconDots,
	IconX,
} from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { ControlTemplate } from './ControlTemplate';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CloseSvg, MinimizeSvg } from '../Misc/Icons';
import { LanguajeTabIcon } from './LanguajeTabIcon';
import { useControlState } from '../../hooks/useControlState';
import { themes } from '../../utils/PrismThemes';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Slider } from '../ui/slider';

interface Props {
	id: string;
}

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
								<div className='flex items-center gap-2 text-foreground'>
									<IconBorderStyle size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Borders</Label>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto p-2'>
									<Label className='my-auto p-2 text-xs text-muted-foreground'>Radius:</Label>
									<Slider
										className='my-auto flex-1'
										onValueChange={(ev) => {
											setBorder(ev[0]);
										}}
										value={[border]}
										max={22}
									></Slider>
								</div>
							</div>
						</CustomCollapse>

						{/* Code Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconCode size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Code</Label>
								</div>
							}
						>
							<Label className='text-xs text-muted-foreground'>Language</Label>
							<Select value={language} onValueChange={setLanguage}>
								<SelectTrigger className='h-8 text-sm'>
									<SelectValue placeholder='Select language' />
								</SelectTrigger>
								<SelectContent>
									{SyntaxHighlighter.supportedLanguages.map((i) => {
										return (
											<SelectItem key={i} value={i}>
												{i}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>

							<Label className='text-xs text-muted-foreground'>Theme</Label>
							<Select value={theme.toString()} onValueChange={setTheme}>
								<SelectTrigger className='h-8 text-sm'>
									<SelectValue placeholder='Select theme' />
								</SelectTrigger>
								<SelectContent>
									{themes.map((i) => {
										return (
											<SelectItem key={i.label} value={i.label}>
												{i.label}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>

							<Label className='text-xs text-muted-foreground'>Title</Label>
							<Input
								className='h-8 text-sm'
								value={title}
								onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
									setTitle(ev.currentTarget.value);
								}}
							></Input>

							<Label className='text-xs text-muted-foreground'>Code</Label>
							<textarea
								spellCheck={false}
								className='flex h-32 flex-auto resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
								value={code}
								onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
									setCode(ev.target.value);
								}}
							></textarea>
						</CustomCollapse>

						{/* Window Settings */}
						<CustomCollapse
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconAppWindow size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Window</Label>
								</div>
							}
						>
							<Label className='text-xs text-muted-foreground'>Window Style</Label>
							<Select value={windowStyle} onValueChange={setWindowStyle}>
								<SelectTrigger className='h-8 text-sm'>
									<SelectValue placeholder='Select window style' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={'mac'}>mac</SelectItem>
									<SelectItem value={'window'}>window</SelectItem>
								</SelectContent>
							</Select>

							{/* Show Tabs */}
							<div className='m-2 flex flex-row gap-2'>
								<Label className='my-auto text-xs text-muted-foreground'>Show Tabs</Label>
								<input
									type='checkbox'
									className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
									onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
										setShowTabs(ev.currentTarget.checked);
									}}
									checked={showTabs}
								></input>
							</div>

							{/* Background */}
							<ColorPicker
								label='Window Color'
								type='HexAlpha'
								onModeChange={(mode) => {
									setColorMode(mode);
								}}
								onGradientChange={(color1, color2) => {
									setGColor1(color1);
									setGColor2(color2);
								}}
								onGradientDegChange={(deg) => {
									setGradientDeg(deg);
								}}
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
								<div className='flex items-center gap-2 text-foreground'>
									<IconDots size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Other Options</Label>
								</div>
							}
						>
							{/* Show Line Numbers */}
							<div className='flex flex-col'>
								<div className='m-2 flex flex-row gap-2'>
									<Label className='my-auto text-xs text-muted-foreground'>Show Line Numbers</Label>
									<input
										type='checkbox'
										className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
										onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
											setShowLineNumbers(ev.currentTarget.checked);
										}}
										checked={showLineNumbers}
									></input>
								</div>
							</div>

							{/* Wrap Lines */}
							<div className='flex flex-col'>
								<div className='m-2 flex flex-row gap-2'>
									<Label className='my-auto text-xs text-muted-foreground'>Wrap Lines</Label>
									<input
										type='checkbox'
										className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
										onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
											setWrapLines(ev.currentTarget.checked);
										}}
										checked={wrapLines}
									></input>
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
						{/* @ts-ignore */}
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
