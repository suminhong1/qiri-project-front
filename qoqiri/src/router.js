import { createBrowserRouter } from "react-router-dom";
import BestPost from "./pages/BestPost";
import ViewPost from "./pages/ViewPost";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

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
        index: true,
        element: <BestPost />,
      },
      {
        path: "ViewPost",
        element: <ViewPost />,
      },
    ],
  },
]);

export default router;
