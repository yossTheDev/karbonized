import React, { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FC<{ children: ReactNode }> = ({ children }) => {
	return ReactDOM.createPortal(
		<>{children}</>,
		document.getElementById('hola') as Element
	);
};
