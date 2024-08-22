import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";

// Layout component
const Layout = () => (
  <>
    <Navbar />
    <Outlet />{" "}
    {/* This is where the matched route's element will be rendered */}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap the App component with the Layout
    children: [
      { path: "/", element: <App /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    <RouterProvider router={router} />
  </StrictMode>
);
