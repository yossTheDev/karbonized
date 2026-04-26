import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';

import { cn } from '@/components/lib/utils';

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	);

	return (
		<SliderPrimitive.Root
			data-slot='slider'
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot='slider-track'
				className='glass-slider-track liquid-motion relative grow overflow-hidden rounded-full transition-all duration-300 ease-out data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2'
			>
				<SliderPrimitive.Range
					data-slot='slider-range'
					className='glass-slider-range liquid-motion absolute select-none data-horizontal:h-full data-vertical:w-full'
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: _values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot='slider-thumb'
					key={index}
					className='glass-slider-thumb liquid-motion block h-4 w-6 shrink-0 rounded-full transition-[transform,box-shadow,background-color,border-color] duration-250 ease-out will-change-transform select-none hover:scale-105 hover:ring-3 hover:ring-ring/20 active:scale-95 focus-visible:scale-105 focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-vertical:h-6 data-vertical:w-4'
				/>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
