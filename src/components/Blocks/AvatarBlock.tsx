import { IconLetterT, IconPhoto } from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import example from '../../assets/example-user.png';

interface Props {
	id: string;
}

export const AvatarBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [src, setSrc] = useState(example);

	return (
		<>
			<ControlTemplate
				id={id}
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'500px'}
				maxHeight={'500px'}
				defaultHeight={'100px'}
				defaultWidth={'100px'}
				borderEditable={false}
				lockAspectRatio
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex items-center gap-2 text-foreground'>
									<IconPhoto size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Image</Label>
								</div>
							}
						>
							{/* Source */}
							<Label className='text-xs text-muted-foreground'>Source</Label>
							<Input
								type='file'
								accept='image/*'
								className='h-8 text-sm'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (e.target.files && e.target.files.length > 0) {
										const reader = new FileReader();
										reader.addEventListener('load', () => {
											setSrc(reader.result?.toString() || '');
										});
										reader.readAsDataURL(e.target.files[0]);
									}
								}}
							></Input>
						</CustomCollapse>
					</>
				}
			>
				<img
					className={`flex h-full w-full flex-auto rounded-full `}
					src={src}
				></img>
			</ControlTemplate>
		</>
	);
};
export default AvatarBlock;
