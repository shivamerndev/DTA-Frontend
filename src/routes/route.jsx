import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import DashboardLayout from "../features/dashboard/pages/DashboardLayout.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import DashboardRedirect from "./DashboardRedirect.jsx";
import EmployeeDashboard from "../features/attendance/pages/EmployeeDashboard.jsx";
import ManagerDashboard from "../features/overtime/pages/ManagerDashboard.jsx";
import ManagerAttendanceLogs from "../features/overtime/pages/ManagerAttendanceLogs.jsx";
import ManagerOvertimeRequests from "../features/overtime/pages/ManagerOvertimeRequests.jsx";
import AdminDashboard from "../features/admin/pages/AdminDashboard.jsx";
import UserDirectoryRoute from "../features/admin/pages/UserDirectoryRoute.jsx";
import DailyReportGeneratorRoute from "../features/admin/pages/DailyReportGeneratorRoute.jsx";
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
                element: <DashboardLayout />,
                children: [
                    {
                        path: "/",
                        element: <DashboardRedirect />
                    },
                    {
                        element: <ProtectedRoute allowedRoles={["employee"]} />,
                        children: [
                            {
                                path: "/employee",
                                element: <EmployeeDashboard />
                            }
                        ]
                    },
                    {
                        element: <ProtectedRoute allowedRoles={["manager"]} />,
                        children: [
                            {
                                path: "/manager",
                                element: <ManagerDashboard />,
                                children: [
                                    {
                                        path: "",
                                        element: <Navigate to="attendance" replace />
                                    },
                                    {
                                        path: "attendance",
                                        element: <ManagerAttendanceLogs />
                                    },
                                    {
                                        path: "overtime",
                                        element: <ManagerOvertimeRequests />
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        element: <ProtectedRoute allowedRoles={["admin"]} />,
                        children: [
                            {
                                path: "/admin",
                                element: <AdminDashboard />,
                                children: [
                                    {
                                        path: "",
                                        element: <Navigate to="users" replace />
                                    },
                                    {
                                        path: "users",
                                        element: <UserDirectoryRoute />
                                    },
                                    {
                                        path: "reports",
                                        element: <DailyReportGeneratorRoute />
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }]
}]);

