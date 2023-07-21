import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../components/homepage/Homepage";
import CategoryPage from "../components/categoryPage/CategoryPage";
import { GoodPage } from "../components/goodPage/GoodPage";
import { NotFoundPage } from "../components/notFoundPage/NotFoundPage";
import { Posts } from "../components/probaPost/Posts";
import { Post } from "../components/probaPost/Post";
import { EditPost } from "../components/probaPost/EditPost";

import { LoginPage } from "../components/auth/LoginPage";
import { RegisterPage } from "../components/auth/RegistrPage";
import Basket from "../components/basket/Basket"
import { History } from "../components/history/History";
import { CongratulationPage } from "../components/basket/CongratulationPage";
import { FileUploader } from "../components/admin/FileUploader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,

    children: [
      {
        path: "/upload/",
        element: <FileUploader />,
      },

      {
        path: "/login/",
        element: <LoginPage />,
      },

      {
        path: "/register/",
        element: <RegisterPage />,
      },
      {
        path: "/category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "/good/:goodId",
        element: <GoodPage />,
      },
      {
        path: "/basket/",
        element: <Basket />,
      },
      {
        path: "/history/",
        element: <History />,
      },
      {
        path: "/congratulation/",
        element: <CongratulationPage />,
      },
      { path: "*", element: <NotFoundPage /> },
      // моя пробная параша
      { path: "/posts/", element: <Posts /> },
      { path: "/posts/:postId", element: <Post /> },
      { path: "/posts/:postId/edit", element: <EditPost /> },
    ],
  },
]);

export default router;
