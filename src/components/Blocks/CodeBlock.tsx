import {
	IconAppWindow,
	IconBorderStyle,
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconCode,
	IconDots,
	IconHome,
	IconMenu2,
	IconMinus,
	IconPlus,
	IconSearch,
	IconSquare,
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
import { Checkbox } from '../ui/checkbox';

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

	/* Handle Window Style Change - Set color for paper style */
	useEffect(() => {
		if (windowStyle === 'paper') {
			setColor('#fbfaf7');
		}
	}, [windowStyle]);

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
									<IconBorderStyle
										size={18}
										className='text-muted-foreground'
									/>
									<Label className='text-sm font-semibold'>Borders</Label>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto p-2'>
									<Label className='my-auto p-2 text-xs text-muted-foreground'>
										Radius:
									</Label>
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
							<Label className='text-xs text-muted-foreground'>
								Window Style
							</Label>
							<Select value={windowStyle} onValueChange={setWindowStyle}>
								<SelectTrigger className='h-8 text-sm'>
									<SelectValue placeholder='Select window style' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={'mac'}>macOS</SelectItem>
									<SelectItem value={'windows'}>Windows 11</SelectItem>
									<SelectItem value={'retro'}>Retro</SelectItem>
									<SelectItem value={'paper'}>Paper</SelectItem>
									<SelectItem value={'GTK'}>GTK</SelectItem>
									<SelectItem value={'gnome'}>GNOME</SelectItem>
									<SelectItem value={'classic'}>Classic</SelectItem>
								</SelectContent>
							</Select>

							{/* Show Tabs */}
							<div className='m-2 flex flex-row gap-2'>
								<Label className='my-auto text-xs text-muted-foreground'>
									Show Tabs
								</Label>
								<Checkbox
									onCheckedChange={(checked) => {
										setShowTabs(checked as boolean);
									}}
									checked={showTabs}
								></Checkbox>
							</div>

							{/* Background */}
							{windowStyle !== 'paper' && (
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
							)}

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
									<Label className='my-auto text-xs text-muted-foreground'>
										Show Line Numbers
									</Label>
									<Checkbox
										onCheckedChange={(checked) => {
											setShowLineNumbers(checked as boolean);
										}}
										checked={showLineNumbers}
									></Checkbox>
								</div>
							</div>

							{/* Wrap Lines */}
							<div className='flex flex-col'>
								<div className='m-2 flex flex-row gap-2'>
									<Label className='my-auto text-xs text-muted-foreground'>
										Wrap Lines
									</Label>
									<Checkbox
										onCheckedChange={(checked) => {
											setWrapLines(checked as boolean);
										}}
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
							theme === 'paper'
								? '#fbfaf7'
								: colorMode === 'Single'
									? color
									: `linear-gradient(${gradientDeg}deg, ${gColor1},${gColor2})`,
					}}
					className={`flex flex-auto select-none flex-col overflow-hidden ${
						windowStyle === 'GTK'
							? 'shadow-lg'
							: windowStyle === 'gnome'
								? 'rounded-xl shadow-xl'
								: windowStyle === 'windows'
									? 'shadow-xl'
									: windowStyle === 'retro'
										? 'border-2 border-black'
										: ''
					}`}
				>
					{/* Title Bar */}
					{windowStyle === 'mac' && (
						<div className='flex max-h-12 flex-auto items-center p-3 pb-2'>
							<div className='mr-3 flex gap-2'>
								<div className='h-3 w-3 rounded-full bg-[#FF5F57] shadow-sm hover:opacity-80 transition-opacity cursor-pointer'></div>
								<div className='h-3 w-3 rounded-full bg-[#FEBC2E] shadow-sm hover:opacity-80 transition-opacity cursor-pointer'></div>
								<div className='h-3 w-3 rounded-full bg-[#28C840] shadow-sm hover:opacity-80 transition-opacity cursor-pointer'></div>
							</div>
							{!showTabs && (
								<p
									style={{ color: controlsColor }}
									className='flex-1 text-center text-sm font-medium opacity-70'
								>
									{title}
								</p>
							)}
							{showTabs && (
								<div className='flex-1 flex items-center justify-center gap-2 rounded-lg bg-black/10 px-3 py-1.5'>
									<LanguajeTabIcon languaje={language} />
									<span
										style={{ color: controlsColor }}
										className='text-sm font-medium'
									>
										{title}
									</span>
									<IconX
										style={{ color: controlsColor }}
										className='opacity-50 hover:opacity-100 cursor-pointer'
										size={14}
									/>
								</div>
							)}
						</div>
					)}

					{windowStyle === 'windows' && (
						<div className='flex max-h-12 flex-auto items-center px-4 py-2 border-b border-white/10'>
							{!showTabs && (
								<p
									style={{ color: controlsColor }}
									className='flex-1 text-sm font-medium pl-2 font-sans'
								>
									{title}
								</p>
							)}
							{showTabs && (
								<div className='flex-1 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 backdrop-blur-sm border border-white/10'>
									<LanguajeTabIcon languaje={language} />
									<span
										style={{ color: controlsColor }}
										className='text-sm font-sans'
									>
										{title}
									</span>
									<IconX
										style={{ color: controlsColor }}
										className='opacity-60 hover:opacity-100 cursor-pointer rounded p-0.5 hover:bg-white/10 transition-all'
										size={14}
									/>
								</div>
							)}
							<div className='flex items-center gap-0.5 ml-2'>
								<button className='p-2 hover:bg-white/10 transition-all duration-150 group'>
									<svg
										className='h-4 w-4 group-hover:scale-110 transition-transform'
										style={{ fill: controlsColor }}
										viewBox='0 0 16 16'
									>
										<path
											d='M2 8h12'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</button>
								<button className='p-2 hover:bg-white/10 transition-all duration-150 group'>
									<svg
										className='h-4 w-4 group-hover:scale-110 transition-transform'
										style={{ fill: controlsColor }}
										viewBox='0 0 16 16'
									>
										<rect
											x='3'
											y='4'
											width='10'
											height='8'
											rx='0.5'
											stroke='currentColor'
											strokeWidth='1.5'
											fill='none'
										/>
									</svg>
								</button>
								<button className='p-2 hover:bg-red-500/20 transition-all duration-150 group rounded-tr-lg'>
									<svg
										className='h-4 w-4 group-hover:scale-110 group-hover:stroke-red-500 transition-all'
										style={{ stroke: controlsColor }}
										viewBox='0 0 16 16'
										fill='none'
									>
										<path
											d='M12 4L4 12M4 4l8 8'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
							</div>
						</div>
					)}

					{windowStyle === 'retro' && (
						<div className='flex max-h-12 flex-auto items-center border-b-4 border-black p-2 gap-2'>
							{!showTabs && (
								<p
									style={{ color: controlsColor }}
									className='flex-1 font-bold text-sm uppercase tracking-wider'
								>
									{title}
								</p>
							)}
							{showTabs && (
								<div className='flex-1 flex items-center gap-2 border-2 border-black px-2 py-1 bg-white text-black'>
									<LanguajeTabIcon languaje={language} />
									<span className='font-bold text-sm uppercase'>{title}</span>
									<IconX className='ml-auto cursor-pointer' size={14} />
								</div>
							)}
							<div className='flex gap-1'>
								<div className='w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-gray-700'>
									_
								</div>
								<div className='w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-gray-700'>
									□
								</div>
								<div className='w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-red-700'>
									×
								</div>
							</div>
						</div>
					)}

					{windowStyle === 'paper' && (
						<>
							{/* Header */}
							<div className='flex max-h-12 flex-auto items-center p-4 pb-3 bg-linear-to-b from-amber-100/50 to-transparent border-b border-amber-200/50'>
								{!showTabs && (
									<p
										style={{ color: controlsColor }}
										className='flex-1 text-center text-sm font-serif italic text-amber-900'
									>
										{title}
									</p>
								)}
								{showTabs && (
									<div className='flex-1 flex items-center justify-center gap-2 px-4 py-2 border-b-2 border-dashed border-amber-400/60 opacity-80'>
										<LanguajeTabIcon languaje={language} />
										<span
											style={{ color: controlsColor }}
											className='text-sm font-serif text-amber-900'
										>
											{title}
										</span>
										<IconX
											style={{ color: controlsColor }}
											className='opacity-60 hover:opacity-100 cursor-pointer text-amber-700'
											size={14}
										/>
									</div>
								)}
								<div className='flex gap-2 opacity-70'>
									<div className='w-3 h-3 rounded-full border-2 border-amber-600 bg-amber-100'></div>
									<div className='w-3 h-3 rounded-full border-2 border-amber-600 bg-amber-100'></div>
								</div>
							</div>

							{/* Footer will be added after code */}
						</>
					)}

					{windowStyle === 'GTK' && (
						<div className='flex max-h-12 flex-auto items-center px-4 py-2 bg-linear-to-b from-white/10 to-white/5 border-b border-white/10'>
							{!showTabs && (
								<p
									style={{ color: controlsColor }}
									className='flex-1 text-sm font-medium text-center font-sans'
								>
									{title}
								</p>
							)}
							{showTabs && (
								<div className='flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-t-lg bg-white/8 backdrop-blur-sm border border-white/10 border-b-0'>
									<LanguajeTabIcon languaje={language} />
									<span
										style={{ color: controlsColor }}
										className='text-sm font-medium font-sans'
									>
										{title}
									</span>
									<IconX
										style={{ color: controlsColor }}
										className='opacity-60 hover:opacity-100 cursor-pointer rounded-full p-0.5 hover:bg-white/10 transition-all'
										size={14}
									/>
								</div>
							)}
							<div className='flex gap-1 ml-2'>
								<button className='p-1.5 hover:bg-white/10 rounded-lg transition-colors group'>
									<svg
										className='h-3.5 w-3.5 group-hover:scale-110 transition-transform'
										style={{ fill: controlsColor }}
										viewBox='0 0 16 16'
									>
										<path
											d='M4 8h8M4 8l3-3M4 8l3 3'
											stroke='currentColor'
											strokeWidth='1.5'
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
								<button className='p-1.5 hover:bg-white/10 rounded-lg transition-colors group'>
									<svg
										className='h-3.5 w-3.5 group-hover:scale-110 transition-transform'
										style={{ fill: controlsColor }}
										viewBox='0 0 16 16'
									>
										<rect
											x='3'
											y='4'
											width='10'
											height='8'
											rx='1'
											stroke='currentColor'
											strokeWidth='1.5'
											fill='none'
										/>
									</svg>
								</button>
								<button className='p-1.5 hover:bg-red-500/20 rounded-lg transition-colors group'>
									<svg
										className='h-3.5 w-3.5 group-hover:scale-110 group-hover:stroke-red-500 transition-all'
										style={{ stroke: controlsColor }}
										viewBox='0 0 16 16'
										fill='none'
									>
										<path
											d='M12 4L4 12M4 4l8 8'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
							</div>
						</div>
					)}

					{windowStyle === 'classic' && (
						<>
							{/* Header */}
							<div className='flex items-center px-4 py-2 bg-[#5C9DFF] border-b border-[#4A8CE6]'>
								<div className='flex gap-2'>
									<div className='w-3 h-3 rounded-full bg-[#FF5F57] border border-[#CC4A47] shadow-sm'></div>
									<div className='w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#CC9625] shadow-sm'></div>
									<div className='w-3 h-3 rounded-full bg-[#28C840] border border-[#20A032] shadow-sm'></div>
								</div>
								{!showTabs && (
									<p
										style={{ color: controlsColor }}
										className='flex-1 text-center text-sm font-medium text-white'
									>
										{title}
									</p>
								)}
								{showTabs && (
									<div className='flex-1 flex items-center justify-center gap-2 px-3 py-1 bg-white/10 rounded-full'>
										<LanguajeTabIcon languaje={language} />
										<span className='text-sm font-medium text-white'>
											{title}
										</span>
										<IconX
											className='opacity-70 hover:opacity-100 cursor-pointer text-white'
											size={14}
										/>
									</div>
								)}
								<div className='flex gap-1.5'>
									<button className='w-4 h-4 bg-white/20 rounded hover:bg-white/30 transition-colors'></button>
									<button className='w-4 h-4 bg-white/20 rounded hover:bg-white/30 transition-colors'></button>
								</div>
							</div>

							{/* Footer will be added after code */}
						</>
					)}

					{windowStyle === 'gnome' && (
						<div className='flex items-center justify-between px-3 py-1.5 bg-[#1e1e1e] border-b border-[#303030] rounded-t-xl select-none'>
							<div className='flex-1 flex items-center'>
								<div className='flex items-center gap-1 bg-[#2d2d2d] rounded-lg p-0.5 border border-[#3a3a3a]'>
									<button className='p-1.5 hover:bg-[#383838] rounded-md transition-all text-gray-400 hover:text-white'>
										<IconPlus size={14} stroke={2.5} />
									</button>
									<button className='p-1.5 hover:bg-[#383838] rounded-md transition-all text-gray-400 hover:text-white'>
										<IconChevronDown size={14} stroke={2.5} />
									</button>
								</div>
							</div>

							<div className='flex flex-col items-center flex-1'>
								<p
									style={{ color: controlsColor }}
									className='text-xs font-bold text-gray-200 font-sans tracking-wide mb-1'
								>
									{title || 'Terminal'}
								</p>
							</div>

							{/* Lado Derecho: Controles de Ventana */}
							<div className='flex-1 flex items-center justify-end gap-1.5'>
								<button className='w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#383838] text-gray-400 hover:text-white transition-colors'>
									<IconMinus size={12} stroke={3} />
								</button>
								<button className='w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#383838] text-gray-400 hover:text-white transition-colors'>
									<IconSquare size={10} stroke={3} />
								</button>
								{/* El botón de cerrar en GNOME suele ser gris, solo se vuelve rojo al pasar el mouse */}
								<button className='w-6 h-6 flex items-center justify-center rounded-full bg-[#2d2d2d] hover:bg-[#e01b24] text-gray-400 hover:text-white transition-all'>
									<IconX size={12} stroke={3} />
								</button>
							</div>
						</div>
					)}

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

					{windowStyle === 'paper' && (
						<div className='h-3 bg-linear-to-b from-amber-100 to-amber-200 relative border-t border-amber-200'>
							<div className='absolute bottom-0 left-0 right-0 h-1 bg-amber-300/50'></div>
						</div>
					)}
				</div>
			</ControlTemplate>
		</>
	);
};

export default CodeControl;
