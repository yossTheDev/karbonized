import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import React, { ReactNode, useState } from 'react';
import { Portal } from 'react-portal';

interface Props {
	messsage?: string;
	className?: string;
	children: ReactNode;
}

export const Tooltip: React.FC<Props> = ({ children, messsage, className }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
		placement: 'right',
	});

	return (
		<>
			<>
				<div
					onMouseLeave={() => {
						setShowTooltip(false);
					}}
					
					onContextMenu={() => {
						setShowTooltip(true);
					}}
					ref={reference}
					className={className}
				>
					{children}
				</div>

				{/* Tooltip */}
				{showTooltip && (
					<Portal>
						<div
							onTouchEnd={() => setShowTooltip(false)}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
							className='z-50'
							ref={floating}
							style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						>
							<div className='flex flex-auto flex-col rounded-xl bg-base-100 p-2 text-xs shadow-xl dark:text-white'>
								{messsage}
							</div>
						</div>
					</Portal>
				)}
			</>
		</>
	);
};
