import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import UpdatePassword from "@/features/auth/pages/UpdatePassword";

const authRoutes = [
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/signup",
    element: <Signup />,
  },
  {
    path: "auth/update-password",
    element: <UpdatePassword />,
  },
];

export default authRoutes;
