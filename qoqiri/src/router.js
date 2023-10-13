import { createBrowserRouter } from 'react-router-dom';
import Post from './pages/Post';
import ViewPost from './pages/ViewPost';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Mini from './pages/Mini';
import Apply from './pages/Apply';
import MatchingBoard from './pages/MatchingBoard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import BestPost from './pages/BestPost';

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
                path: 'Post/',
                element: <Post />,
            },
            {
                path: 'viewPost/:id',
                element: <ViewPost />,
            },
            {
                path: 'matchingBoard',
                element: <MatchingBoard />,
            },
            {
                path: 'Login',
                element: <Login />,
            },
            {
                path: 'Signup',
                element: <SignUp />,
            },
            {
                path: 'BestPost',
                element: <BestPost />,
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
