import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CreateButtonOverlayProps {
	current: any;
	onCreateFromTemplate: () => void;
}

export const CreateButtonOverlay: React.FC<CreateButtonOverlayProps> = ({
	current,
	onCreateFromTemplate,
}) => {
	return (
		<AnimatePresence>
			{current !== null && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='pointer-events-none absolute inset-0 flex h-full w-full'
				>
					<div className='mt-auto flex h-fit w-full flex-auto gap-2 bg-linear-to-t from-muted to-transparent p-4'>
						<Button
							className='pointer-events-auto ml-auto rounded-3xl'
							onClick={onCreateFromTemplate}
						>
							Create
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
