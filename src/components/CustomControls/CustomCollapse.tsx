import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { ReactNode, useEffect, useState } from 'react';
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
				className='flex flex-auto hover:bg-slate-800/20 flex-row my-auto text-xs text-black dark:text-gray-400 font-bold select-none cursor-pointer h-12 max-h-12 p-1 rounded'
			>
				{menu}
				<div className='ml-auto my-auto'>
					{open ? (
						<IconChevronUp></IconChevronUp>
					) : (
						<IconChevronDown></IconChevronDown>
					)}
				</div>
			</div>
			{open && (
				<div className='mt-2 flex flex-auto flex-col gap-4 p-2 select-none'>
					{children}
				</div>
			)}
		</div>
	);
};
