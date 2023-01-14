import React, { Fragment, Component } from 'react';
import Prism from 'prismjs';

import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;
/*
const styles = {
	root: {
		boxSizing: 'border-box',
		fontFamily: '"Dank Mono", "Fira Code", monospace',
		...theme.plain,
	},
};

class EditorExample extends Component {
	state = { code: exampleCode };

	onValueChange = (code: any) => {
		this.setState({ code });
	};

	highlight = (code: string) => (
		<Highlight {...defaultProps} theme={theme} code={code} language='js'>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<Fragment>
					{tokens.map((line, i) => (
						<div {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</Fragment>
			)}
		</Highlight>
	);

	render() {
		return (
			<Editor
				value={this.state.code}
				onValueChange={this.onValueChange}
				highlight={this.highlight}
				padding={10}
				// style={styles.root}
			/>
		);
	}
}

interface Props {
	code?: string;
	onValueChange: (value: string) => void;
	languaje?: string;
}

export const MyEditor: React.FC<Props> = ({
	languaje = 'html',
	onValueChange,
	code = '<html></html>',
}) => {
	return (
		<div className='bg-slate-900'>
			<Editor
				value={code}
				onValueChange={(e) => onValueChange(e)}
				highlight={(code) => (
					<Highlight
						{...defaultProps}
						Prism={Prism}
						theme={theme}
						code={code}
						language={languaje}
					>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
							<Fragment>
								{tokens.map((line, i) => (
									<div {...getLineProps({ line, key: i })}>
										{line.map((token, key) => (
											<span {...getTokenProps({ token, key })} />
										))}
									</div>
								))}
							</Fragment>
						)}
					</Highlight>
				)}
				padding={10}
				// style={styles.root}
			></Editor>
		</div>
	);
};*/
// export default EditorExample;
