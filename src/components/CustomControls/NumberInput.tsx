import { IconCaretDown, IconCaretUp } from '@tabler/icons';
import React, { useState } from 'react';
import { Input } from 'react-daisyui';

interface Props {
	number: number;
	onChange?: (number: number) => void;
}

export const NumberInput: React.FC<Props> = ({
	number = 0,
	onChange = () => {},
}) => {
	return (
		<div className='flex flex-auto flex-row'>
			<Input
				contentEditable
				className='flex flex-auto flex-col w-full bg-base-100 rounded text-center'
				onChange={(e) => {
					onChange(parseInt(e.currentTarget.value));
				}}
				value={number}
			></Input>

			<div className='flex flex-auto flex-col ml-2'>
				<div className='mx-auto flex flex-auto flex-col '>
					<IconCaretUp
						className='flex flex-auto hover:text-gray-800'
						onMouseDown={() => {
							onChange(number + 1);
						}}
					></IconCaretUp>
					<IconCaretDown
						className='flex flex-auto hover:text-gray-900'
						onMouseDown={() => {
							onChange(number - 1);
						}}
					></IconCaretDown>
				</div>
			</div>
		</div>
	);
};
