import {
	flip,
	offset,
	Placement,
	shift,
	useFloating,
} from '@floating-ui/react-dom';
import React, { ReactNode, useState } from 'react';
import { Portal } from 'react-portal';

interface Props {
	show?: boolean;
	position?: Placement;
	children: ReactNode;
	menu: ReactNode;
	showOnEnter: boolean;
}
export const ContextMenu: React.FC<Props> = ({
	children,
	position,
	menu,
	showOnEnter = false,
}) => {
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), shift(), flip()],
		placement: position,
	});
	const [show, setShow] = useState(false);

	return (
		<>
			<div onMouseEnter={() => setShow(true)} ref={reference}>
				{children}
			</div>

			{show && (
				<Portal>
					<div
						className='flex flex-col flex-auto gap-2 bg-base-100 rounded-2xl p-2 w-52 shadow-2xl dark:text-gray-400 z-50'
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						onMouseLeave={() => {}}
					>
						{menu}
					</div>
				</Portal>
			)}
		</>
	);
};
