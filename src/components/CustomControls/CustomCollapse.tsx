import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import React, { ReactNode, useState } from 'react';
import { Collapse, Swap } from 'react-daisyui';

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
		<>
			<Collapse open={open} tabIndex={0} className=''>
				<Collapse.Title
					onClick={() => setOpen(!open)}
					className='text-xs font-bold hover:bg-slate-800/10 rounded flex-row p-1 cursor-pointer'
				>
					<div className='flex flex-auto flex-row my-auto'>
						{menu}
						<div className='ml-auto my-auto'>
							{open ? (
								<IconChevronUp></IconChevronUp>
							) : (
								<IconChevronDown></IconChevronDown>
							)}
						</div>
					</div>
				</Collapse.Title>
				<Collapse.Content>
					<div className='mt-2 flex flex-auto flex-col gap-2'>{children}</div>
				</Collapse.Content>
			</Collapse>
		</>
	);
};
