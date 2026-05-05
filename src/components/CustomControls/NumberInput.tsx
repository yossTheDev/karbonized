import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
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
				className='flex w-full flex-auto flex-col rounded bg-base-100 text-center'
				onChange={(e) => {
					onChange(parseInt(e.currentTarget.value));
				}}
				value={number || 0}
			></Input>

			<div className='ml-2 flex flex-auto flex-col'>
				<div className='mx-auto flex flex-auto flex-col '>
					<IconCaretUp
						className='flex flex-auto hover:text-neutral-800'
						onMouseDown={() => {
							onChange(number + 1);
						}}
					></IconCaretUp>
					<IconCaretDown
						className='flex flex-auto hover:text-neutral-900'
						onMouseDown={() => {
							onChange(number - 1);
						}}
					></IconCaretDown>
				</div>
			</div>
		</div>
	);
};
