import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { ReactNode, useState } from 'react';
interface Props {
	isOpen?: boolean;
	menu?: ReactNode;
	children?: ReactNode;
}

export const CustomCollapse: React.FC<Props> = ({
	children,
	menu,
	isOpen = false,
}) => {
	const [open, setOpen] = useState(isOpen);

	return (
		<div>
			<div
				onMouseDown={() => setOpen(!open)}
				className='my-auto flex h-12 max-h-12 flex-auto cursor-pointer select-none flex-row rounded-xl p-1 text-xs font-bold text-black hover:bg-neutral dark:text-gray-400'
			>
				{menu}
				<div className='my-auto ml-auto'>
					{open ? (
						<IconChevronUp></IconChevronUp>
					) : (
						<IconChevronDown></IconChevronDown>
					)}
				</div>
			</div>
			{open && (
				<div className='mt-2 flex flex-auto select-none flex-col gap-4 p-2'>
					{children}
				</div>
			)}
		</div>
	);
};
