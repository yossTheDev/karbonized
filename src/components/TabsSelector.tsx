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
					? ' dark:text-white font-bold text-xs'
					: ' text-gray-500 text-xs select-none'
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
