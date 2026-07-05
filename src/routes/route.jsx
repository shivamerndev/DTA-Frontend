import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import DashboardLayout from "../features/dashboard/pages/DashboardLayout.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import ErrorRoute from "./ErrorRoute.jsx";
import App from "../app/App.jsx";

export const router = createBrowserRouter([{
    element: <App />,
    children: [{
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={["employee", "manager", "admin"]} />,
        children: [
            {
                path: "/",
                element: <DashboardLayout />
            }
        ]
    },
        // {
        //     path: "*",
        //     element: <ErrorRoute />
        // }
    ]
}]);
