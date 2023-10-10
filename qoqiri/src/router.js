import { createBrowserRouter } from 'react-router-dom';
import BestPost from './pages/BestPost';
import ViewPost from './pages/ViewPost';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Mini from './pages/Mini';
import Apply from './pages/Apply';
import Review from './pages/Review';
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
                path: 'BestPost',
                element: <BestPost />,
            },
            {
                path: 'ViewPost',
                element: <ViewPost />,
            },
            {
                path: 'matchingboard',
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
    {
        path: '/review',
        element: <Review />,
    },
]);

export default router;
