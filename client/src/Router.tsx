import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Auth } from "./pages";
import { AuthResponse } from "./api";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const router = (isLoggedIn: boolean) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/app" />,
    },
    {
      path: "/app",
      element: isLoggedIn ? <h1>HI</h1> : <Navigate to="/auth" />,
    },
    {
      path: "/auth",
      element: isLoggedIn ? <Navigate to="/app" /> : <Auth />,
    },
  ]);

export const Router = (): JSX.Element => {
  const [token, _, removeToken] = useLocalStorage<AuthResponse>({
    key: "session",
  });

  useEffect(() => {
    if (!token) return;
    const decode = jwtDecode(token.access_token);
    if (Date.now() >= (decode.exp as number) * 1000) {
      removeToken();
    }
  }, [token]);

  return <RouterProvider router={router(!!token)} />;
};
