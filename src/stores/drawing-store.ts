import { create } from 'zustand';

interface DrawingState {
	isDrawing: boolean;
	isErasing: boolean;
	lineWidth: number;
	strokeColor: string;
}

interface DrawingActions {
	setIsDrawing: (isDrawing: boolean) => void;
	setIsErasing: (isErasing: boolean) => void;
	setLineWidth: (lineWidth: number) => void;
	setStrokeColor: (strokeColor: string) => void;
}

type DrawingStore = DrawingState & DrawingActions;

export const useDrawingStore = create<DrawingStore>((set) => ({
	isDrawing: false,
	isErasing: false,
	lineWidth: 20,
	strokeColor: '#4582ba',

	setIsDrawing: (isDrawing) => set({ isDrawing }),
	setIsErasing: (isErasing) => set({ isErasing }),
	setLineWidth: (lineWidth) => set({ lineWidth }),
	setStrokeColor: (strokeColor) => set({ strokeColor }),
}));
