import { createBrowserRouter } from 'react-router-dom';
import Post from './pages/Post';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <BestPost />,
            },
            {
                path: 'ViewPost',
                element: <ViewPost />,
            },
        ],
    },
]);

export default router;
