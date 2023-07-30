import {
	flip,
	offset,
	Placement,
	shift,
	useFloating,
} from '@floating-ui/react-dom';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from 'react-portal';

interface Props {
	id?: string;
	show?: boolean;
	position?: Placement;
	label: string;
	menu: ReactNode;
	showOnEnter?: boolean;
}

export const MenuContext = createContext({
	isOpen: false,
	setIsOpen: (value: boolean) => {},
});

export const DropMenu: React.FC<Props> = ({ id, position, label, menu }) => {
	const [show, setShow] = useState(false);
	const [isInside, setIsInside] = useState(false);

	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(4), shift(), flip()],
		placement: 'bottom-start',
	});

	return (
		<MenuContext.Provider value={{ isOpen: show, setIsOpen: setShow }}>
			<div
				className={`select-none rounded px-3 py-0.5  hover:cursor-pointer hover:bg-neutral active:bg-base-100 ${
					show && 'bg-base-100'
				}`}
				tabIndex={1}
				onBlur={() => {
					if (!isInside) {
						setShow(false);
					}
				}}
				onClick={() => {
					setShow(true);
				}}
				ref={reference}
			>
				<label className='poppins-font-family-regular my-auto text-xs hover:cursor-pointer '>
					{label}
				</label>
			</div>

			<AnimatePresence>
				{show && (
					<Portal>
						<motion.div
							id={id}
							tabIndex={1}
							onBlur={() => !isInside && setShow(false)}
							onMouseEnter={() => setIsInside(true)}
							onMouseLeave={() => setIsInside(false)}
							className={`z-30 ${
								show ? 'flex' : 'hidden'
							} poppins-font-family-regular w-52 flex-auto  flex-col gap-2 rounded-xl border border-neutral bg-base-200 p-1 py-2 shadow-2xl dark:text-gray-300`}
							ref={floating}
							style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						>
							{menu}
						</motion.div>
					</Portal>
				)}
			</AnimatePresence>
		</MenuContext.Provider>
	);
};

interface MenuItemProps {
	icon: ReactNode;
	label: string;
	shortcut?: string;
	click: () => void;
}
export const MenuItem: React.FC<MenuItemProps> = ({
	icon,
	label,
	click,
	shortcut,
}) => {
	const { isOpen, setIsOpen } = useContext(MenuContext);

	return (
		<div
			className='flex flex-auto cursor-pointer select-none rounded p-2 text-xs hover:cursor-pointer hover:bg-neutral active:bg-base-100'
			onMouseDown={() => {
				click();
				setIsOpen(false);
			}}
		>
			<div className='my-auto flex flex-auto flex-row gap-2 hover:cursor-pointer'>
				{icon}
				<p className='my-auto hover:cursor-pointer'>{label}</p>

				<p className='my-auto ml-auto hover:cursor-pointer'>{shortcut}</p>
			</div>
		</div>
	);
};

export const MenuSeparator: React.FC = () => {
	return <div className='mx-6 flex w-full rounded bg-base-100/30 p-0.5'></div>;
};
