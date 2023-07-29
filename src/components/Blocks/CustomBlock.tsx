import React from 'react';
import { Input } from 'react-daisyui';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';
import { LivePreview, LiveProvider } from 'react-live';

interface Props {
	id: string;
}

export const CustomBlock: React.FC<Props> = ({ id }) => {
	const [code, setCode] = useControlState('', id + '-code');

	/* Component States */
	const scope = {
		id,
		Input,
	};

	return (
		<LiveProvider key={id} noInline scope={scope} code={code}>
			<ControlTemplate
				defaultHeight='50px'
				defaultWidth='50px'
				minHeight={'50px'}
				minWidth={'50px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
				id={id}
			>
				<LivePreview id={id}></LivePreview>
			</ControlTemplate>
		</LiveProvider>
	);
};

export default CustomBlock;
