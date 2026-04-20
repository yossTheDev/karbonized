import { IconChevronDown } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
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
				className='my-auto border-b text-muted-foreground font-heading flex h-12 max-h-12 w-full cursor-pointer select-none items-center px-3'
			>
				{menu}
				<div className='ml-auto'>
					<motion.div
						animate={{ rotate: open ? 90 : 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<IconChevronDown size={12}></IconChevronDown>
					</motion.div>
				</div>
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='overflow-hidden'
					>
						<div className='mt-2 flex cursor-pointer select-none flex-col gap-4 p-2'>
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
