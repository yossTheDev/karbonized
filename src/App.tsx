import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Editor } from './pages/Editor';
import { Home } from './pages/Home';

const router = createBrowserRouter([
	{
		path: '',
		errorElement: <></>,
		element: <Outlet></Outlet>,
		children: [
			{
				path: '/',
				element: <Home />,
			},

			{
				path: '/editor',
				element: <Editor />,
			},
		],
	},

	{
		path: '/',
	},
]);

const App: React.FC = () => {
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
