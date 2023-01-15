import { IconCode, IconDots, IconPalette } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Checkbox, Input, Select, Textarea } from 'react-daisyui';
import { ControlTemplate } from './ControlTemplate';
import { refractor } from 'refractor/lib/all';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CustomCollapse } from '../CustomControls/CustomCollapse';

export const CodeControl: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */
	const [languaje, setLanguaje] = useState('html');
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
				id={id}
				color={color}
				minHeight='100px'
				maxWidth='620px'
				maxHeight='450px'
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
								{refractor.listLanguages().map((i) => {
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
								className=' h-22 resize-none flex flex-auto'
								value={code}
								onChange={(ev) => setCode(ev.target.value)}
							></Textarea>
						</CustomCollapse>

						{/* Background Color Picker */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconPalette size={22}></IconPalette>
									<p className='font-bold my-auto'>Background Color</p>
								</div>
							}
						>
							<HexColorPicker
								color={color}
								onChange={setColor}
								className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
							></HexColorPicker>
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
				<div className='flex flex-auto flex-col p-2 overflow-hidden shadow-2xl'>
					{/* Title */}
					<div className='flex flex-auto max-h-8'>
						<div
							spellCheck={false}
							className='text-gray-600 text-center mb-auto mt-auto m-2 hover:border-none'
						>
							{title}
						</div>

						<div className='ml-auto flex flex-row'>
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
