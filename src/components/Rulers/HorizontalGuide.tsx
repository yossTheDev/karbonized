import Guides from '@scena/react-guides';
import { IconRuler } from '@tabler/icons';
import React, { useEffect, useRef, useState } from 'react';

export const HorizontalGuide: React.FC = () => {
	const ref = useRef<Guides>(null);
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		ref.current?.resize();
	}, [ref, enabled]);

	return (
		<div>
			<div className='ruler horizontal flex flex-auto flex-row grow-0 p-1 h-9  bg-base-200'>
				<div
					onClick={() => setEnabled(!enabled)}
					className='rounded p-1 hover:bg-base-100 mt-auto'
				>
					<IconRuler className='text-gray-500'></IconRuler>
				</div>

				{enabled && (
					<Guides
						ref={ref}
						type='horizontal'
						zoom={37.7}
						textOffset={[0, 50]}
						unit={1}
						backgroundColor='#090b11'
						textColor='#525863'
						lineColor='#525863'
						snapThreshold={0}
						textFormat={(v) => `${v}px`}
						snaps={[1, 2, 3]}
						digit={1}
						style={{ height: '30px' }}
						rulerStyle={{
							width: 'calc(100%)',
							height: '100%',
						}}
						dragPosFormat={(v) => `${v}cm`}
						displayDragPos={true}
						displayGuidePos={true}
						onChangeGuides={({ guides }) => {
							console.log('horizontal', guides);
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
						onClickRuler={(e) => {
							console.log('?', e);
						}}
					/>
				)}
			</div>
		</div>
	);
};
