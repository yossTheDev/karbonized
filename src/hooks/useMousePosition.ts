import React from 'react';
const useMousePosition = (): {
    x: number;
    y: number;
} => {
    const [
        mousePosition,
        setMousePosition
    ] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const workspace = document.getElementById("workspace");

        const updateMousePosition = (ev: { clientX: number; clientY: number; }): void => {
            const workspace = document.getElementById("workspace");

            if (workspace == null) {
                return;
            }

            const bounds = workspace.getBoundingClientRect();

            if (bounds == null) {
                return;
            }

            const x = ev.clientX - bounds.left;
            const y = ev.clientY - bounds.top;

            setMousePosition({ x, y });
        };

        workspace?.addEventListener('mousemove', updateMousePosition);
        return () => {
            workspace?.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
export default useMousePosition;