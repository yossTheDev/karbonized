import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomPortal } from '../Portal';
import { useState, useEffect } from 'react';

const TEMPLATE_SYSTEM_ROOT = 'https://karbon-apps.github.io/templates/';

interface TemplateItem {
	user: string;
	name: string;
	path: string;
	data: any;
}

interface TemplatesProps {
	templates: any;
	current: any;
	setCurrent: (item: any) => void;
	handleDownloadTemplate: (id: string) => void;
}

export const Templates: React.FC<TemplatesProps> = ({
	templates,
	current,
	setCurrent,
	handleDownloadTemplate,
}) => {
	const [items, setItems] = useState<TemplateItem[]>([]);
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async (): Promise<void> => {
			setLoading(true);
			const copy = [];

			for (const item of templates) {
				const data = await (
					await fetch(TEMPLATE_SYSTEM_ROOT + 'templates/' + item.path)
				).json();

				copy.push({ ...item, data });
			}

			setItems(copy);
			setLoading(false);
		};

		void load();
	}, []);

	useEffect(() => {
		setCurrent(null);
	}, [query, setCurrent]);

	return (
		<div className='flex h-full w-full flex-row flex-wrap gap-4 overflow-auto'>
			{!loading ? (
				<>
					{items.length > 0 ? (
						<>
							{items
								?.filter((item) =>
									item.name.toUpperCase().includes(query.toUpperCase()),
								)
								.map((item: any) => (
									<button
										key={item.data.workspace.id}
										onClick={() => {
											setCurrent(item.data);
										}}
										className={`relative flex h-fit w-fit min-w-fit flex-col rounded-2xl border-2 bg-muted  p-2 transition-all active:scale-90 ${
											current?.workspace.id === item.data.workspace.id
												? 'border-border shadow-xl'
												: 'border-border'
										}`}
									>
										<img
											className='mx-auto flex h-20 w-full rounded-2xl md:h-36'
											src={item.data.thumb}
											alt={item.name}
										/>

										<p className='poppins-font-family mt-2 text-foreground'>
											{item.name}
										</p>
										<p className='text-xs'>{item.user}</p>

										{current?.workspace.id === item.data.workspace.id && (
											<Button
												size='icon'
												variant='outline'
												className='absolute -left-1 -top-1 h-8 w-8 rounded-full border-none bg-muted'
												onClick={() => {
													handleDownloadTemplate(item.data);
												}}
											>
												<Download size={16} />
											</Button>
										)}
									</button>
								))}
						</>
					) : (
						<p className='text-muted-foreground mx-6 my-auto text-center text-xs md:mx-auto'>
							No templates available go online to get new templates created by
							the community
						</p>
					)}
				</>
			) : (
				<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
			)}

			<CustomPortal id='search_bar'>
				<Input
					onChange={(ev) => {
						setQuery(ev.currentTarget.value);
					}}
					value={query}
					placeholder='Search templates...'
					className='flex w-full flex-auto'
				></Input>
			</CustomPortal>
		</div>
	);
};
