import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { IconCopy } from '@tabler/icons';
import React, { useState } from 'react';
import { Textarea } from 'react-daisyui';
import { Clipboard } from '@capacitor/clipboard';

export const CustomTextArea: React.FC<
	Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>
> = ({ ...props }) => {
	const [tooltipVisibility, settooltipVisibility] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
	});

	return (
		<>
			<Textarea
				className='flex flex-auto resize-none'
				onContextMenu={(e) => {
					e.preventDefault();
					settooltipVisibility(!tooltipVisibility);
				}}
				ref={reference}
				{...props}
			></Textarea>

			{/* Tooltip */}
			{tooltipVisibility && (
				<div
					onMouseLeave={() => settooltipVisibility(false)}
					className='bg-slate-800 w-28 shadow   text-black h  p-1 rounded flex flex-auto  flex-row'
					ref={floating}
					style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
				>
					<div className='flex flex-row flex-auto gap-10'>
						<div
							onClick={async () => {
								await Clipboard.write({ string: props.value as string });
							}}
							className='flex flex-auto flex-row hover:bg-base-200 rounded p-3 text-white'
						>
							<IconCopy></IconCopy>
							<p className='ml-2'>Copy</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
