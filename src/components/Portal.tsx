import React, { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const CustomPortal: React.FC<{ id: string; children: ReactNode }> = ({
	id,
	children,
}) => {
	const [element, setElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setElement(document.getElementById(id));
	}, []);

	return <>{element != null && createPortal(children, element)}</>;
};
