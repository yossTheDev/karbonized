/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import { type SVGProps } from 'react';

export function SolarCropMinimalisticLineDuotone(
	props: SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			{...props}
		>
			<g
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeWidth='1.5'
			>
				<path d='M22 19h-9c-3.771 0-5.657 0-6.828-1.172C5 16.657 5 14.771 5 11V2' />
				<path
					d='M2 5h9c3.771 0 5.657 0 6.828 1.172C19 7.343 19 9.229 19 13v9'
					opacity='.5'
				/>
			</g>
		</svg>
	);
}

export function SolarStructureBoldDuotone(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			{...props}
		>
			<path
				fill='currentColor'
				d='M8 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m14 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0M8 19a3 3 0 1 1-6 0a3 3 0 0 1 6 0m14 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0'
			/>
			<path
				fill='currentColor'
				d='M16.093 4.256A.754.754 0 0 0 16 4.25H8a.756.756 0 0 0-.093.006a3.006 3.006 0 0 1 0 1.488c.03.004.061.006.093.006h8a.756.756 0 0 0 .093-.006a3.008 3.008 0 0 1 0-1.488M19 8c.257 0 .506-.032.744-.093c.004.03.006.061.006.093v8a.753.753 0 0 1-.006.093a3.004 3.004 0 0 0-1.488 0A.753.753 0 0 1 18.25 16V8c0-.032.002-.063.006-.093c.238.06.487.093.744.093m-2.907 10.256A.753.753 0 0 0 16 18.25H8a.752.752 0 0 0-.093.006a3.006 3.006 0 0 1 0 1.488c.03.004.061.006.093.006h8a.753.753 0 0 0 .093-.006a3.004 3.004 0 0 1 0-1.488M5 8c-.257 0-.506-.032-.744-.093A.756.756 0 0 0 4.25 8v8c0 .032.002.063.006.093a3.008 3.008 0 0 1 1.488 0A.757.757 0 0 0 5.75 16V8a.756.756 0 0 0-.006-.093C5.506 7.967 5.257 8 5 8'
				opacity='.5'
			/>
		</svg>
	);
}
