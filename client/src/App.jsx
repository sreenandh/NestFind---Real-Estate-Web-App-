import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ChatPage from "./routes/chatPage/chatPage"; // Import the ChatPage component
import AdminLogin from "./routes/admin/AdminLogin";   // Admin login component
import AdminDashboard from "./routes/admin/AdminDashboard"; // Admin dashboard component

import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import VerifyOtpPage from "./components/otp/VerifyOtpPage";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/list", element: <ListPage />, loader: listPageLoader },
          { path: "/verify-otp", element: <VerifyOtpPage /> }, // Added OTP route
          { path: "/:id", element: <SinglePage />, loader: singlePageLoader },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
      {
        path: "/",
        element: <RequireAuth />,
        children: [
          { path: "/profile", element: <ProfilePage />, loader: profilePageLoader },
          { path: "/profile/update", element: <ProfileUpdatePage /> },
          { path: "/add", element: <NewPostPage /> },
          { path: "/chat/:id", element: <ChatPage /> },
        ],
      },
      {
        path: "/admin",
        children: [
          { path: "", element: <AdminLogin /> },
          { path: "dashboard", element: <AdminDashboard /> },
        ],
      },
    ],
    {
      future: {
        v7_startTransition: true, // Opt-in to React 18's startTransition
        v7_relativeSplatPath: true, // Fix relative route resolution in splat routes
      },
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
