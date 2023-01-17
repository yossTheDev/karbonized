import React, { ReactNode } from 'react';

interface Props {
	isActive: boolean;
	children: ReactNode;
	onClick: () => void;
}

export const TabSelector: React.FC<Props> = ({
	isActive,
	children,
	onClick,
}) => {
	return (
		<button
			style={{ height: '240px' }}
			className={
				isActive
					? ' dark:text-white font-bold bg-base-100 text-xs select-none p-1 rounded  w-8'
					: ' text-gray-500 text-xs select-none p-1 rounded  w-8'
			}
			onClick={onClick}
		>
			<div className='mx-auto my-auto'>{children}</div>
		</button>
	);
};
