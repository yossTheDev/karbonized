import React, { useEffect, useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { getRandomNumber } from '../../utils/getRandom';
import { useStoreActions, useStoreState } from '../../stores/Hooks';

export const ExtensionPanel: React.FC = () => {
	const [extension, setExtensions] = useState<Extension[]>([]);

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
		(window as any).electron.ipcRenderer.on(
			'extensions_loaded',
			(event: any, extensions: any) => {
				setExtensions(extensions);
				console.log(extensions);
			},
		);

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
			{extension.length > 0 && (
				<div>
					{extension.map((item) => (
						<CustomCollapse
							menu={
								<label className='my-auto p-2 hover:cursor-pointer'>
									{item.info.name}
								</label>
							}
						>
							<div className='flex flex-wrap gap-2'>
								{item.components.map((control) => (
									<div
										onClick={() => {
											handleAddItem(control.code, control.properties.name);
										}}
										className='flex w-20 flex-col rounded-xl bg-base-100 p-2 hover:cursor-pointer'
									>
										<img className='mx-auto max-h-12' src={control.image}></img>
										<label className='mx-auto mt-2 text-xs  hover:cursor-pointer'>
											{control.properties?.name}
										</label>
									</div>
								))}
							</div>
						</CustomCollapse>
					))}
				</div>
			)}
		</div>
	);
};
