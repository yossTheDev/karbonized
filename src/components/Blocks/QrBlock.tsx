import { IconQrcode } from '@tabler/icons';
import React, { useState } from 'react';
import { Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { QRCodeSVG } from 'qrcode.react';

export const QrControl: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */
	const [text, setText] = useState('hello');

	return (
		<>
			<ControlTemplate
				id={id}
				minHeight={'50px'}
				minWidth={'100px'}
				maxWidth={'100px'}
				maxHeight={'100px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconQrcode></IconQrcode>
									<p className='my-auto'>Qr</p>
								</div>
							}
						>
							<p>Value</p>
							<Input
								onChange={(ev) => setText(ev.target.value)}
								value={text}
							></Input>
						</CustomCollapse>
					</>
				}
			>
				<QRCodeSVG
					size={100}
					className='flex flex-auto'
					value={text}
				></QRCodeSVG>
			</ControlTemplate>
		</>
	);
};
