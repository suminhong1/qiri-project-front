import { createBrowserRouter } from "react-router-dom";
import PostList from "./pages/BestPost";
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
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";
import EditProfile from "./pages/EditProfile";
import SignupInfo from "./pages/SignupInfo";

import Myactive from "./pages/Myactive";

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
        path: "board/:id",
        element: <PostList />,
      },
      {
        path: "bestPost",
        element: <PostList />,
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
        path: "ChatList/:id",
        element: <ChatList />,
      },
      {
        path: "chatRoom/:id",
        element: <ChatRoom />,
      },
      {
        path: "/EditProfile",
        element: <EditProfile />,
      },
      {
        path: "/SignupInfo",
        element: <SignupInfo />,
      },
      {
        path: "/Myactive",
        element: <Myactive />,
      },
      {
        path: "apply/:userId",
        element: <Apply />,
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
]);
export default router;
