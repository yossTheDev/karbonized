import {
	IconBorderStyle,
	IconCode,
	IconDots,
	IconPalette,
} from '@tabler/icons';
import React, { useState } from 'react';
import { Checkbox, Input, Select, Textarea, Range } from 'react-daisyui';
import { ControlTemplate } from './ControlTemplate';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ColorPicker } from '../CustomControls/ColorPicker';

const CodeControl: React.FC = () => {
	/* Component States */
	const [languaje, setLanguaje] = useState('tsx');
	const [code, setCode] = useState(
		`<pre><code class="language-${languaje}"></code></pre>`
	);
	const [color, setColor] = useState('#0f172a');
	const [title, setTitle] = useState('Code');
	const [showLineNumbers, setShowLineNumbers] = useState(false);
	const [wrapLines, setWrapLines] = useState(false);
	const [border, setBorder] = useState(4);

	const [colorMode, setColorMode] = useState('Single');
	const [gColor1, setGColor1] = useState('#0da2e7');
	const [gColor2, setGColor2] = useState('#5895c8');
	const [gradientDeg, setGradientDeg] = useState(22);

	return (
		<>
			<ControlTemplate
				border={6}
				borderEditable={false}
				defaultHeight='140px'
				defaultWidth='300px'
				minHeight='100px'
				maxWidth='1020px'
				maxHeight='850px'
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
								onChange={(e) => setLanguaje(e)}
							>
								{SyntaxHighlighter.supportedLanguages.map((i) => {
									return (
										<option key={i} value={i}>
											{i}
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

						{/* Background Color Picker */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconPalette size={22}></IconPalette>
									<p className='font-bold my-auto'>Colors</p>
								</div>
							}
						>
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
					className='flex flex-auto flex-col p-2 overflow-hidden select-none'
				>
					{/* Title */}
					<div className='flex flex-auto max-h-8'>
						<p className='text-gray-600 text-center mb-auto my-auto m-2 hover:border-none flex flex-auto w-20 overflow-hidden'>
							{title}
						</p>

						<div className='ml-auto my-auto flex flex-row'>
							<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
							<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
							<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
						</div>
					</div>

					{/* Code */}
					<div className='flex flex-auto'>
						<SyntaxHighlighter
							customStyle={{
								background: 'transparent',
								textDecorationThickness: '0px',
								textEmphasisColor: 'darkolivegreen',
								textShadow: 'none',
								boxShadow: 'none',
								color: '#f25555',
								whiteSpace: 'pre-wrap',
								overflow: 'hidden',
							}}
							wrapLongLines
							showLineNumbers={showLineNumbers}
							wrapLines={wrapLines}
							language={languaje}
							style={vscDarkPlus}
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
