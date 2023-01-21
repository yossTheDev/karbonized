import React, { createElement, useEffect, useState } from 'react';
import { IconType as Icon } from 'react-icons';
import { IconType } from '../utils/FaIconList';

interface IconProps {
	icon: string;
	style?: React.CSSProperties;
	className?: string;
	size?: number;
	color?: string;
}

export const FaIcon: React.FC<IconProps> = ({
	icon,
	size,
	color,
	style,
	className,
}) => {
	const [faIcon, setFaIcon] = useState<IconType>();

	useEffect(() => {
		const getIcon = async () => {
			const icons = await import('../utils/FaIconList');

			function findIcon(): IconType {
				const iconSelected = icons.iconFaList.find((i) => i.label === icon);
				return iconSelected ? iconSelected : icons.iconFaList[0];
			}

			setFaIcon(findIcon());
		};

		getIcon();
	}, [icon]);
	return (
		<>
			{faIcon &&
				createElement(faIcon.icon, { className: className, style: style })}
		</>
	);
};
