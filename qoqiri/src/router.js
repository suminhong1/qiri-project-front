import { createBrowserRouter } from "react-router-dom";
import BestPost from "./pages/BestPost";
import ViewPost from "./pages/ViewPost";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Mini from "./pages/Mini";
import Apply from "./pages/Apply";
import MatchingBoard from "./pages/MatchingBoard";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UserInfoPage from "./pages/Myinfo";
import Post from "./pages/Post";
import Review from "./pages/Review";
import MiniUp from "./pages/MiniUp";
import PostWrite from "./pages/PostWrite";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "bestPost",
        element: <BestPost />,
      },

      {
        path: "viewPost/:id",
        element: <ViewPost />,
      },
      {
        path: "postWrite",
        element: <PostWrite />,
      },
      {
        path: "matchingBoard",
        element: <MatchingBoard />,
      },
      {
        path: "matchingBoard/:id",
        element: <MatchingBoard />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <SignUp />,
      },
      {
        path: "myinfo",
        element: <UserInfoPage />,
      },
      {
        path: "Post/:id",
        element: <Post />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/miniup/:userId",
    element: <MiniUp />,
  },
  {
    path: "/mini/:userId",
    element: <Mini />,
  },
  {
    path: "apply",
    element: <Apply />,
  },
]);
export default router;
