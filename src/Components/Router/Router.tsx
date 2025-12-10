import { createBrowserRouter } from "react-router-dom";

// Import your pages/components
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AllTrainers from "../Pages/AllTrainer/AllTrainers";
import NotFound from "../../../app/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/all-classes",
    element: <AllClasses />,
  },
  {
    path: "/all-trainers",
    element: <AllTrainers />,
  },
]);

export default router;
