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

type Props = {
	id?: string;
	show?: boolean;
	position?: Placement;
	label: string;
	menu: ReactNode;
	showOnEnter?: boolean;
};

const MenuContext = createContext({
	isOpen: false,
	setIsOpen: (value: boolean) => {},
	setIsInside: (value: boolean) => {},
});

export const DropMenu: React.FC<Props> = ({ id, position, label, menu }) => {
	const [show, setShow] = useState(false);
	const [isInside, setIsInside] = useState(false);

	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(4), shift(), flip()],
		placement: 'bottom-start',
	});

	return (
		<MenuContext.Provider
			value={{ isOpen: show, setIsOpen: setShow, setIsInside: setIsInside }}
		>
			<button
				className={`btn btn-ghost btn-xs my-auto rounded ${
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
			</button>

			<AnimatePresence>
				{show && (
					<Portal>
						<motion.div
							id={id}
							tabIndex={1}
							onBlur={() => !isInside && setShow(false)}
							onMouseEnter={() => setIsInside(true)}
							onMouseLeave={() => setIsInside(false)}
							className={`poppins-font-family-regular z-30 
							 flex w-52 flex-auto flex-col gap-2 overflow-x-hidden rounded-xl border border-base-300 bg-base-200 px-1.5 py-2 text-base-content shadow-2xl`}
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

type MenuItemProps = {
	icon: ReactNode;
	label: string;
	shortcut?: string;
	click: () => void;
};

export const MenuItem: React.FC<MenuItemProps> = ({
	icon,
	label,
	click,
	shortcut,
}) => {
	const { setIsOpen, setIsInside } = useContext(MenuContext);

	return (
		<button
			className='flex flex-auto cursor-pointer select-none rounded p-2 text-xs hover:cursor-pointer hover:bg-base-300 active:bg-base-300'
			onMouseDown={() => {
				click();
				setIsOpen(false);
				setIsInside(false);
			}}
		>
			{icon}
			<p className='my-auto ml-2 hover:cursor-pointer'>{label}</p>

			<p className='my-auto ml-auto hover:cursor-pointer'>{shortcut}</p>
		</button>
	);
};

export const MenuSeparator: React.FC = () => {
	return <div className='mx-6 flex w-full rounded bg-base-100/30 p-0.5'></div>;
};
