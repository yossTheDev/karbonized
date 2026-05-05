import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ComponentsGallery } from '../Panels/ComponentsGallery';
import { KComponent } from '@/models/KComponent';

interface ComponentsGalleryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddToCanvas: (component: KComponent) => void;
}

export const ComponentsGalleryDialog: React.FC<ComponentsGalleryDialogProps> = ({
	open,
	onOpenChange,
	onAddToCanvas,
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
				<DialogHeader>
					<DialogTitle>Component Library</DialogTitle>
					<DialogDescription>
						Browse and add imported custom components to your canvas.
					</DialogDescription>
				</DialogHeader>
				<div className="flex-1 overflow-hidden">
					<ComponentsGallery onAddToCanvas={onAddToCanvas} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ComponentsGalleryDialog;
