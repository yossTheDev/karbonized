import { Search } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Templates } from './Templates';

interface CommunityTemplatesSectionProps {
	communityTemplates: any;
	communityTemplateType: string;
	setCommunityTemplateType: (value: string) => void;
	current: any;
	setCurrent: (item: any) => void;
	handleDownloadTemplate: (template: any) => void;
}

export const CommunityTemplatesSection: React.FC<
	CommunityTemplatesSectionProps
> = ({
	communityTemplates,
	communityTemplateType,
	setCommunityTemplateType,
	current,
	setCurrent,
	handleDownloadTemplate,
}) => {
	return (
		<div className='flex h-full w-full flex-col gap-4 overflow-hidden'>
			{communityTemplates !== null ? (
				<>
					{/* Header */}
					<div className='mt-1 flex w-full flex-auto flex-row gap-2 p-1'>
						<div className='mr-2 flex flex-auto flex-row'>
							<Search className='my-auto mr-2 dark:text-white'></Search>
							<div className='flex w-full' id='search_bar'></div>
						</div>

						<p className='my-auto text-xs'>Type</p>
						<Select
							value={communityTemplateType}
							onValueChange={setCommunityTemplateType}
						>
							<SelectTrigger className='w-32'>
								<SelectValue placeholder='Type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='code'>Code</SelectItem>
								<SelectItem value='devices'>Devices</SelectItem>
								<SelectItem value='window'>Window</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{communityTemplateType === 'code' && (
						<Templates
							current={current}
							setCurrent={setCurrent}
							handleDownloadTemplate={handleDownloadTemplate}
							templates={communityTemplates.code}
						></Templates>
					)}

					{communityTemplateType === 'window' && (
						<Templates
							current={current}
							setCurrent={setCurrent}
							handleDownloadTemplate={handleDownloadTemplate}
							templates={communityTemplates.window}
						></Templates>
					)}

					{communityTemplateType === 'devices' && (
						<Templates
							current={current}
							setCurrent={setCurrent}
							handleDownloadTemplate={handleDownloadTemplate}
							templates={communityTemplates.devices}
						></Templates>
					)}
				</>
			) : (
				<p className='text-muted-foreground mx-6 my-auto text-center text-xs md:mx-auto'>
					No templates available go online to get new templates created by the
					community
				</p>
			)}
		</div>
	);
};
