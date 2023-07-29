import { IconLetterT } from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import { Button, ButtonGroup, Input } from 'react-daisyui';

interface Props {
	id: string;
}

export const CustomBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [code, setCode] = useControlState('lorem', `${id}-text`);

	return (
		<>
			<ControlTemplate
				id={id}
				borderEditable={false}
				defaultHeight='45px'
				defaultWidth='85px'
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconLetterT></IconLetterT>
									<p className='my-auto'>Text</p>
								</div>
							}
						>
							<p>Text Style</p>
							{/* Text */}
						</CustomCollapse>
					</>
				}
			></ControlTemplate>
		</>
	);
};

export default CustomBlock;
function useControlState(arg0: string, arg1: string): [any, any] {
	throw new Error('Function not implemented.');
}
