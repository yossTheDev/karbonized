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
			className={
				isActive
					? ' dark:text-white font-bold text-xs bg-base-100 p-4 rounded h-12'
					: ' text-gray-500 text-xs select-none p-4 rounded'
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
