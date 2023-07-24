import React, { ReactNode } from 'react';

interface Props {
	isActive: boolean;
	children: ReactNode;
	onClick: () => void;
	onDoubleClick?: () => void;
}

export const TabSelector: React.FC<Props> = ({
	isActive,
	children,
	onClick,
	onDoubleClick,
}) => {
	return (
		<button
			className={
				isActive
					? ' flex w-40 select-none rounded-xl bg-base-100/70 p-2 text-xs font-bold text-black dark:text-white md:max-h-full'
					: ' flex w-40 select-none rounded-xl p-2 text-xs text-gray-500  md:max-h-full'
			}
			onClick={onClick}
			onDoubleClick={onDoubleClick && onDoubleClick}
		>
			<div className='mx-auto my-auto'>{children}</div>
		</button>
	);
};
