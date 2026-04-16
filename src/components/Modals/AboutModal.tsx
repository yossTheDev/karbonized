import { ExternalLink, MessageCircle, Share2 } from 'lucide-react';
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import karbonized from '../../assets/logo.svg';

interface Props {
	open: boolean;
	onClose?: () => void;
}

export const AboutModal: React.FC<Props> = ({ open, onClose }) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='text-center'>About</DialogTitle>
					<DialogDescription className='text-center'>
						Learn more about Karbonized and the team behind it
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col items-center gap-4'>
					<div className='rounded-2xl bg-muted p-4 shadow-xl'>
						<img className='h-28 rounded-full' src={karbonized} alt='Karbonized' />
					</div>

					<h2 className='text-center text-2xl font-bold text-foreground'>
						Karbonized
					</h2>
					<p className='text-center text-sm text-muted-foreground'>
						Image Generator for Code Snippets & Mockups
					</p>

					<span className='text-center text-xs text-foreground'>
						Made by{' '}
						<a
							target='_blank'
							className='text-foreground underline'
							href='https://twitter.com/yossthedev'
							rel='noreferrer'
						>
							@yossthedev
						</a>
					</span>

					<div className='select-none rounded-full bg-muted px-4 py-2 text-foreground'>
						<span>v1.12.0</span>
					</div>

					{/* Social Networks */}
					<div className='flex gap-2'>
						<Button
							variant='outline'
							size='icon'
							asChild
						>
							<a
								target='_blank'
								href='https://twitter.com/karbonized_app'
								rel='noreferrer'
							>
								<Share2 size={20} />
							</a>
						</Button>

						<Button
							variant='outline'
							size='icon'
							asChild
						>
							<a
								target='_blank'
								href='https://t.me/karbonized'
								rel='noreferrer'
							>
								<MessageCircle size={20} />
							</a>
						</Button>

						<Button
							variant='outline'
							size='icon'
							asChild
						>
							<a
								target='_blank'
								href='https://github.com/yossthedev/karbonized'
								rel='noreferrer'
							>
								<ExternalLink size={20} />
							</a>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AboutModal;
