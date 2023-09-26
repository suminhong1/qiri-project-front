import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Mini from "./pages/Mini";
import Apply from "./pages/Apply";

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
    ],
  },
  {
    path: "/mini",
    element: <Mini />,
  },
  {
    path: "/apply",
    element: <Apply />,
  },
]);

export default router;
