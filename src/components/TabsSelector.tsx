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
					? ' dark:text-white text-black font-bold bg-base-100 max-h-12 md:max-h-full text-xs select-none w-11 rounded flex flex-auto'
					: ' text-gray-500 text-xs select-none max-h-12 md:max-h-full rounded flex flex-auto  w-11'
			}
			onClick={onClick}
		>
			<div className='mx-auto my-auto w-11'>{children}</div>
		</button>
	);
};
