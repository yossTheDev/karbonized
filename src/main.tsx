import { StoreProvider } from 'easy-peasy';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppStore } from './stores/AppStore';
import './input.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<StoreProvider store={AppStore}>
			<App />
		</StoreProvider>
	</React.StrictMode>
);
