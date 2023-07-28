import {
	Placement,
	flip,
	offset,
	shift,
	useFloating,
} from '@floating-ui/react-dom';
import React, { ReactNode, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import { useScreenDirection } from '../../hooks/useScreenDirection';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
	message?: string;
	className?: string;
	children: ReactNode;
	placement?: Placement;
}

export const Tooltip: React.FC<Props> = ({
	children,
	message,
	className,
	placement = 'right',
}) => {
	const isHorizontal = useScreenDirection();
	const [showTooltip, setShowTooltip] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
		placement: placement,
	});

	useEffect(() => {
		if (showTooltip) setTimeout(() => setShowTooltip(false), 1000);
	}, [showTooltip]);

	return (
		<>
			<>
				<div
					onMouseLeave={() => {
						setShowTooltip(false);
					}}
					onMouseEnter={() => isHorizontal && setShowTooltip(true)}
					onContextMenu={() => {
						!isHorizontal && setShowTooltip(true);
					}}
					ref={reference}
					className={className}
				>
					{children}
				</div>

				{/* Tooltip */}
				<AnimatePresence>
					{showTooltip && (
						<Portal>
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								className='z-50'
								ref={floating}
								style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
							>
								<div className='flex flex-auto select-none flex-col rounded-xl border border-neutral bg-base-200 p-2 px-4 text-xs shadow-xl dark:text-white'>
									{message}
								</div>
							</motion.div>
						</Portal>
					)}
				</AnimatePresence>
			</>
		</>
	);
};
