import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { useState, type ReactNode } from 'react';

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
			<button
				onClick={() => {
					setOpen(!open);
				}}
				className={`text-base-content my-auto flex h-12 max-h-12 w-full flex-auto cursor-pointer select-none items-center rounded border-b-2 border-base-200 bg-base-200 px-2 transition-all ${open && 'border-b-2 border-primary'}`}
			>
				{menu}
				<div className='ml-auto'>
					{open ? (
						<motion.div
							initial={{ rotate: '0deg' }}
							animate={{ rotate: '90deg' }}
						>
							<IconChevronUp></IconChevronUp>
						</motion.div>
					) : (
						<motion.div
							initial={{ rotate: '180deg' }}
							animate={{ rotate: '0deg' }}
						>
							<IconChevronDown></IconChevronDown>
						</motion.div>
					)}
				</div>
			</button>
			{open && (
				<div className='mt-2 flex cursor-pointer select-none flex-col gap-4 p-2'>
					{children}
				</div>
			)}
		</div>
	);
};
