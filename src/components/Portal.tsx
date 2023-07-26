import React, { ReactNode, useEffect, useState } from 'react';
import { Portal } from 'react-portal';

export const CustomPortal: React.FC<{ id: string; children: ReactNode }> = ({
	id,
	children,
}) => {
	const [element, setElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setElement(document.getElementById(id));
	}, []);

	return <>{element && <Portal node={element}>{children}</Portal>}</>;
};
