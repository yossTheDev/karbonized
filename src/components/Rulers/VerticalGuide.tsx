import Guides from '@scena/react-guides';
import { IconRuler } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';

export const VerticalGuide: React.FC = () => {
	const ref = useRef<Guides>(null);
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		ref.current?.resize();
	}, [ref, enabled]);

	return (
		<div className='flex flex-auto flex-col max-w-xs grow-0 w-9 rounded-2xl mr-0.2 p-1 bg-base-200'>
			{enabled && (
				<Guides
					ref={ref}
					type='vertical'
					backgroundColor='#090b11'
					textColor='#525863'
					lineColor='#525863'
					zoom={1}
					unit={50}
					textOffset={[250, 250]}
					dragPosFormat={(v) => `${v}cm`}
					textFormat={(v) => `${v}px`}
					rulerStyle={{
						height: 'calc(100%)',
						width: '100%',
					}}
					displayDragPos={true}
					onChangeGuides={({ guides }) => {
						console.log('vertical', guides);
					}}
					onDragStart={(e) => {
						console.log('dragStart', e);
					}}
					onDrag={(e) => {
						console.log('drag', e);
					}}
					onDragEnd={(e) => {
						console.log('dragEnd', e);
					}}
				/>
			)}

			<div
				onClick={() => setEnabled(!enabled)}
				className='rounded p-1 hover:bg-base-100'
			>
				<IconRuler className='text-gray-500'></IconRuler>
			</div>
		</div>
	);
};
