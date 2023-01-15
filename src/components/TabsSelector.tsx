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
					? 'text-black dark:text-white font-bold text-xs delay-75 transition-all'
					: ' text-gray-500'
			}
			onClick={onClick}
		>
			{children}

			<div className={isActive ? `bg-primary  p-0.5 rounded ` : ''}></div>
		</button>
	);
};
