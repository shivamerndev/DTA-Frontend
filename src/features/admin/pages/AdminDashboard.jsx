import { useState } from "react";
import dayjs from "dayjs";
import { NavLink, Outlet } from "react-router-dom";
import { useGetAllUsersQuery } from "../../auth/api/auth.api.js";
import { useGetDailyReportQuery } from "../api/admin.api.js";

function AdminDashboard() {
  
  const [reportDate, setReportDate] = useState(dayjs().format("YYYY-MM-DD"));

  const { data: usersRes } = useGetAllUsersQuery();
  const { data: reportRes } = useGetDailyReportQuery({ date: reportDate });

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
              isActive
                ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-slate-400 border-transparent hover:text-slate-600"
            }`
          }
        >
          User Directory ({usersRes?.data?.length || 0})
        </NavLink>
        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
              isActive
                ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-slate-400 border-transparent hover:text-slate-600"
            }`
          }
        >
          Daily Reports Generator
        </NavLink>
      </div>

      <Outlet context={{ usersRes, reportRes, reportDate, setReportDate }} />
    </div>
  );
}

export default AdminDashboard;