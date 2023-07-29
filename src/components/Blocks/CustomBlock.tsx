import { IconLetterT } from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import { Button, ButtonGroup, Input } from 'react-daisyui';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { NumberInput } from '../CustomControls/NumberInput';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Portal as Menu } from 'react-portal';

interface Props {
	id: string;
}

const code_example = `
const Counter = () => {
	/* Component States */
	const [code, setCode] = useState("holas");

	return (
		<>
			<p>{code}</p>

          
            <Menu   
                key={id + '_control_menu'}
                node={document.getElementById('menu')}>
            <p>Holas</p>
            </Portal>
		</>
	);
};

render(<Counter/>)

`;
export const CustomBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const scope = {
		ControlTemplate,
		useControlState,
		CustomCollapse,
		id,
		useState,
		Menu,
	};

	return (
		<ControlTemplate
			defaultHeight='200px'
			defaultWidth='500px'
			minHeight={'50px'}
			minWidth={'50px'}
			maxWidth={'2000px'}
			maxHeight={'2000px'}
			id={id}
		>
			<LiveProvider noInline scope={scope} code={code_example}>
				<LivePreview id={id}></LivePreview>
			</LiveProvider>
		</ControlTemplate>
	);
};

export default CustomBlock;
