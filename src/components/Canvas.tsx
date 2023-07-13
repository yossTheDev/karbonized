import React, { useEffect, useRef, useState } from 'react';
import { useStoreState } from '../stores/Hooks';

export const Canvas: React.FC = ({}) => {
	const [isDrawing, setIsDrawing] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<any>(null);

	const canDraw = useStoreState((state) => state.isDrawing);
	const isErasing = useStoreState((state) => state.isErasing);

	const strokeColor = useStoreState((state) => state.strokeColor);
	const lineWidth = useStoreState((state) => state.lineWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);

	const startDrawing = (e: any) => {
		if (ctxRef) {
			ctxRef.current?.beginPath();
			ctxRef.current?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

			setIsDrawing(true);
		}
	};

	const endDrawing = () => {
		ctxRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = (e: any) => {
		if (!isDrawing) {
			return;
		}

		ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

		if (isErasing) {
			ctxRef.current.globalCompositeOperation = 'destination-out';
		} else {
			ctxRef.current.globalCompositeOperation = 'source-over';
		}

		ctxRef.current.stroke();
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');

		if (ctx) {
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			//ctx.globalAlpha = 0.1;
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeColor;
			ctxRef.current = ctx;
		}
	}, [lineWidth, strokeColor]);

	return (
		<>
			<canvas
				ref={canvasRef}
				width={workspaceWidth}
				height={workspaceHeight}
				className={`${
					canDraw || isErasing ? '' : 'pointer-events-none'
				} absolute z-50`}
				style={{ backgroundColor: '#4e4e4e00' }}
				onMouseDown={startDrawing}
				onMouseUp={endDrawing}
				onMouseMove={draw}
			></canvas>
		</>
	);
};
