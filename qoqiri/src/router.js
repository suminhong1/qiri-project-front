import { createBrowserRouter } from 'react-router-dom';
import PostList from './pages/BestPost';
import ViewPost from './pages/ViewPost';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Mini from './pages/Mini';
import Apply from './pages/Apply';
import MatchingBoard from './pages/MatchingBoard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import UserInfoPage from './pages/Myinfo';
import Post from './pages/Post';
import Review from './pages/Review';
import MiniUp from './pages/MiniUp';
import PostWrite from './pages/PostWrite';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import SignupInfo from './pages/SignupInfo';
import BoardBar from './components/BoardBar';

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
                path: 'board/:id',
                element: <PostList />,
            },
            {
                path: 'bestPost',
                element: <PostList />,
            },
            {
                path: 'viewPost/:id',
                element: <ViewPost />,
            },
            {
                path: 'postWrite',
                element: <PostWrite />,
            },
            {
                path: 'matchingBoard',
                element: <MatchingBoard />,
            },
            {
                path: 'matchingBoard/:id',
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
                path: 'myinfo',
                element: <UserInfoPage />,
            },
            {
                path: 'Post/:id',
                element: <Post />,
            },
            {
                path: 'review',
                element: <Review />,
            },
            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/EditProfile',
                element: <EditProfile />,
            },
            {
                path: '/SignupInfo',
                element: <SignupInfo />,
            },
        ],
    },
    {
        path: '/miniup/:userId',
        element: <MiniUp />,
    },
    {
        path: '/mini/:userId',
        element: <Mini />,
    },
    {
        path: 'apply',
        element: <Apply />,
    },
]);
export default router;
