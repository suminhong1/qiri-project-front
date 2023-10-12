import { createBrowserRouter } from 'react-router-dom';
import BestPost from './pages/BestPost';
import ViewPost from './pages/ViewPost';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Mini from './pages/Mini';
import Apply from './pages/Apply';
import MatchingBoard from './pages/MatchingBoard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'bestPost',
                element: <BestPost />,
            },
            {
                path: 'viewPost/:id',
                element: <ViewPost />,
            },
            {
                path: 'matchingBoard',
                element: <MatchingBoard />,
            },
        ],
    },
    {
        path: '/mini',
        element: <Mini />,
    },
    {
        path: '/apply',
        element: <Apply />,
    },
]);

export default router;
