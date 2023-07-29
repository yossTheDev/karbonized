import React, { useEffect, useState, useTransition } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { getRandomNumber } from '../../utils/getRandom';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { IconReload, IconSearch } from '@tabler/icons-react';
import { Input } from 'react-daisyui';

export const ExtensionPanel: React.FC = () => {
	/* Component State */
	const [extension, setExtensions] = useState<Extension[]>([]);
	const [query, setQuery] = useState('');
	const [controls, setControls] = useState<any>([]);
	const [isPending, startTransition] = useTransition();

	/* App Store */
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

	useEffect(() => {
		startTransition(() => {
			if (query !== '') {
				const all: any[] = [];
				extension.forEach((ext) => {
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
		});
	}, [query]);

	useEffect(() => {
		startTransition(() => {
			(window as any).electron.ipcRenderer.on(
				'extensions_loaded',
				(event: any, extensions: any) => {
					setExtensions(extensions);
				},
			);
		});

		/* Load Extension and App Data */
		(window as any).electron.ipcRenderer.sendMessage('getAppData', '');
	}, []);

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

	return (
		<div className='mt-1 flex flex-auto flex-col overflow-hidden'>
			{/* Header */}
			<div className='flex'>
				<div className='mb-2 flex'>
					<label className='my-auto ml-3 h-full select-none  text-xl font-bold'>
						Extensions
					</label>
					<label className='poppins-font-family my-auto ml-2 rounded bg-primary p-1 text-xs text-white'>
						Beta
					</label>
				</div>

				<div
					className='mb-1 ml-auto rounded-xl p-2 hover:cursor-pointer  hover:bg-neutral'
					onClick={() => {
						/* Reload Extension and App Data */
						(window as any).electron.ipcRenderer.sendMessage('getAppData', '');
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

			{extension.length > 0 ? (
				<>
					{query === '' ? (
						<div className='mt-2 flex flex-col gap-1 overflow-y-auto'>
							{extension.map((item) => (
								<CustomCollapse
									key={item.info.name}
									menu={
										<label className='my-auto p-2 hover:cursor-pointer'>
											{item.info.name}
										</label>
									}
								>
									<div className='flex h-64 flex-wrap gap-2 overflow-y-auto overflow-x-hidden'>
										{item.components.map((control) => (
											<div
												key={control.properties.name}
												onClick={() => {
													handleAddItem(control.code, control.properties.name);
												}}
												className='flex w-20 flex-auto flex-col rounded-xl bg-base-100 p-2 hover:cursor-pointer hover:bg-neutral'
											>
												<img
													className={`mx-auto my-auto max-h-12 text-white ${
														control.image.startsWith(
															'data:image/svg+xml;base64,',
														) && 'dark:invert'
													}`}
													src={control.image}
												></img>
												<label className='mx-auto my-auto mt-2 text-xs  hover:cursor-pointer'>
													{control.properties?.name}
												</label>
											</div>
										))}
									</div>
								</CustomCollapse>
							))}
						</div>
					) : (
						<div className='mt-2 flex flex-wrap gap-2 overflow-y-auto overflow-x-hidden'>
							{controls.map((control: any) => (
								<div
									onClick={() => {
										handleAddItem(control.code, control.properties.name);
									}}
									className='flex w-20 flex-auto flex-col rounded-xl bg-base-100 p-2 hover:cursor-pointer hover:bg-neutral'
								>
									<img
										className={`mx-auto my-auto max-h-12 text-white ${
											control.image.startsWith('data:image/svg+xml;base64,') &&
											'dark:invert'
										}`}
										src={control.image}
									></img>
									<label className='mx-auto my-auto mt-2 text-xs  hover:cursor-pointer'>
										{control.properties?.name}
									</label>
								</div>
							))}
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
		</div>
	);
};
