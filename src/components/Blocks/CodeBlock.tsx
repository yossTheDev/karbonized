import { IconCode, IconDots, IconPalette } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Checkbox, Input, Select, Textarea } from 'react-daisyui';
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

	return (
		<>
			<ControlTemplate
				color={color}
				border={6}
				defaultHeight='140px'
				defaultWidth='300px'
				minHeight='100px'
				maxWidth='1020px'
				maxHeight='850px'
				menu={
					<>
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
								color={color}
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
				<div className='flex flex-auto flex-col p-2 overflow-hidden select-none'>
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
