import { FileUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WizardActionsProps {
	onCreateNewProject: () => void;
	onAddUserTemplate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WizardActions: React.FC<WizardActionsProps> = ({
	onCreateNewProject,
	onAddUserTemplate,
}) => {
	return (
		<div className='flex w-full gap-4'>
			<Button
				onClick={onCreateNewProject}
				variant='outline'
				size='lg'
				className='h-28 flex-col gap-2 rounded-2xl'
			>
				<Plus size={28} />
				<span className='text-xs'>New Project</span>
			</Button>

			<input
				onInput={onAddUserTemplate}
				id='input'
				name='input'
				accept='.json'
				hidden
				type='file'
			/>

			<label htmlFor='input'>
				<Button
					variant='outline'
					size='lg'
					className='h-28 flex-col gap-2 rounded-2xl'
					asChild
				>
					<div>
						<FileUp size={28} />
						<span className='text-xs'>Import Template</span>
					</div>
				</Button>
			</label>
		</div>
	);
};
