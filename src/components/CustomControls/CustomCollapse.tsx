import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { motion } from 'framer-motion';
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
			<button
				onMouseDown={() => setOpen(!open)}
				className='btn btn-ghost my-auto flex h-12 max-h-12 w-full flex-auto cursor-pointer select-none flex-row rounded-xl text-base-content'
			>
				{menu}
				<div className='my-auto ml-auto'>
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
				<div className='mt-2 flex flex-auto cursor-pointer select-none flex-col gap-4 p-2 text-base-content'>
					{children}
				</div>
			)}
		</div>
	);
};
