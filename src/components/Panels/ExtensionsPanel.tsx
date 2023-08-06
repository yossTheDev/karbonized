import React, { useEffect, useState, useTransition } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { getRandomNumber } from '../../utils/getRandom';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { IconCircleDashed, IconReload, IconSearch } from '@tabler/icons-react';
import { Input } from 'react-daisyui';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

export const ExtensionPanel: React.FC = () => {
	/* Component State */
	const [extensions, setExtensions] = useState<Extension[]>([]);
	const [query, setQuery] = useState('');
	const [controls, setControls] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (query !== '') {
			const all: any[] = [];
			extensions.forEach((ext) => {
				ext.components.forEach((component) => {
					all.push(component);
				});
			});

			setControls(
				all.filter(
					(item) =>
						(item.properties.name as string)
							.toUpperCase()
							.indexOf(query.toUpperCase()) > -1,
				),
			);
		}
	}, [query]);

	useEffect(() => {
		(window as any).electron.ipcRenderer.on(
			'extension_loaded',
			(event: any, extension: any) => {
				console.log(extension);
				setExtensions([...extensions, extension]);
			},
		);

		(window as any).electron.ipcRenderer.on(
			'loading_extensions',
			(event: any, state: any) => {
				setLoading(state);
			},
		);
	}, [extensions]);

	useEffect(() => {
		(window as any).electron.ipcRenderer.on(
			'extensions_loaded',
			(event: any, extensions: any) => {
				setExtensions(extensions);
			},
		);
	}, []);

	return (
		<div className='mt-1 flex flex-auto flex-col overflow-hidden'>
			{/* Header */}
			<div className='flex'>
				<div className='mb-2 flex'>
					<label className='my-auto ml-3 h-full select-none  text-xl font-bold'>
						Extensions
					</label>
					<label className='poppins-font-family my-auto ml-2 rounded bg-primary px-2 py-0.5 text-xs text-white'>
						Beta
					</label>
				</div>

				<div
					className='mb-1 ml-auto rounded-xl p-2 hover:cursor-pointer  hover:bg-neutral'
					onClick={() => {
						setExtensions([]);

						/* Reload Extension and App Data */
						(window as any).electron.ipcRenderer.sendMessage(
							'reloadExtensions',
							'',
						);
					}}
				>
					<IconReload className='my-auto h-full' size={16}></IconReload>
				</div>
			</div>

			<div className='flex gap-1 p-2'>
				<label className='my-auto text-xs'>Need extensions?</label>
				<a
					className='text-xs hover:text-blue-400'
					href='https://github.com/yossTheDev/karbonized'
				>
					See the docs
				</a>
			</div>

			{/* Search */}
			<div className='flex h-12 shrink-0 flex-row gap-2'>
				<IconSearch className='my-auto ml-2 h-full' size={18}></IconSearch>
				<Input
					className='my-auto mb-2 flex  h-full w-full'
					onChange={(ev) => setQuery(ev.target.value)}
					value={query}
				></Input>
			</div>

			{loading && extensions.length === 0 ? (
				<div className=' my-auto  dark:text-gray-300'>
					<IconCircleDashed
						size={56}
						className='mx-auto my-auto animate-spin text-gray-600'
					></IconCircleDashed>
				</div>
			) : (
				<>
					{extensions.length > 0 ? (
						<>
							{query === '' ? (
								<div className='mt-2 flex flex-col gap-1 overflow-y-auto'>
									{extensions.map((item) => (
										<CustomCollapse
											key={item.info.name}
											menu={
												<>
													<img
														className='my-auto ml-1 h-8 rounded-xl'
														src={item.logo}
													></img>
													<label className='poppins-font-family my-auto p-2 hover:cursor-pointer '>
														{item.info.name}
													</label>
												</>
											}
										>
											<div className='flex h-96 max-h-full flex-wrap overflow-y-auto overflow-x-hidden'>
												<ItemsList data={item.components}></ItemsList>
											</div>
										</CustomCollapse>
									))}
								</div>
							) : (
								<div className='mt-2 flex h-full flex-wrap gap-2 overflow-y-auto overflow-x-hidden'>
									<div className='flex h-full w-full flex-col flex-wrap gap-2 overflow-y-auto overflow-x-hidden'>
										<ItemsList data={controls}></ItemsList>
									</div>
								</div>
							)}
						</>
					) : (
						<div className='flex flex-auto'>
							<p className='mx-auto my-auto select-none text-center text-xs text-gray-700'>
								No extensions installed
							</p>
						</div>
					)}
				</>
			)}

			{loading && extensions.length > 0 && (
				<div className='mt-2 dark:text-gray-300'>
					<IconCircleDashed
						size={26}
						className='mx-auto my-auto animate-spin text-gray-600'
					></IconCircleDashed>
				</div>
			)}
		</div>
	);
};

const ItemsList = ({ data }: { data: any }) => {
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const addControl = useStoreActions((state) => state.addControl);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);
	const getElementsByType = (type: string) => {
		return (
			currentWorkspace.controls.filter((item) => item.type === type).length + 1
		);
	};

	const handleAddItem = (code: string, name: string) => {
		const num = getRandomNumber();

		addInitialProperty({ id: `${name}-${num}-code`, value: code });

		addControl({
			type: 'custom',
			id: `${name}-${num}`,
			isSelectable: true,
			isDeleted: false,
			name: `${name} ${getElementsByType(name)}`,
			isVisible: true,
		});
	};
	const Row = ({ index, style }: { index: number; style: any }) => {
		return (
			<div
				onClick={() => {
					handleAddItem(data[index].code, data[index].properties.name);
				}}
				style={{ ...style, height: style.height - 5, top: style.top + 5 }}
				className='flex-r my-2 flex flex-auto rounded-xl bg-base-100  hover:cursor-pointer hover:bg-neutral'
			>
				{data[index].image.startsWith('data:image/') ? (
					<img
						className='my-auto ml-2 mr-auto h-6 w-6'
						src={data[index].image}
					></img>
				) : (
					<div
						className='my-auto ml-2 mr-auto h-6 w-6'
						dangerouslySetInnerHTML={{ __html: data[index].image }}
					></div>
				)}

				<label className='mx-auto my-auto text-xs  hover:cursor-pointer'>
					{data[index].properties?.name}
				</label>
			</div>
		);
	};

	return (
		<AutoSizer>
			{({ height, width }) => (
				<FixedSizeList
					height={height}
					width={width}
					className='flex gap-2'
					itemCount={data.length}
					itemSize={55}
				>
					{Row}
				</FixedSizeList>
			)}
		</AutoSizer>
	);
};
