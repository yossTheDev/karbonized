import React from 'react';
import { Editor } from './pages/Editor';
import { TitleBar } from './components/Base/TitleBar';
import { useTauriPlatform } from './hooks/useTauriPlatform';
import { StatusBar } from './components/Base/StatusBar';

const App: React.FC = () => {
	const isTauriPlatform = useTauriPlatform();

	return (
		<div className='flex h-screen w-screen flex-auto flex-col overflow-hidden transition-all ease-in-out'>
			{!isTauriPlatform && <TitleBar></TitleBar>}
			<Editor></Editor>
		</div>
	);
};

export default App;
