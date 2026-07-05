import { useState } from "react";
import dayjs from "dayjs";
import { useGetAllUsersQuery } from "../../auth/api/auth.api.js";
import { useGetDailyReportQuery } from "../api/admin.api.js";
import UserDirectory from "../components/UserDirectory.jsx";
import DailyReportGenerator from "../components/DailyReportGenerator.jsx";

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("users"); // users | reports
  const [reportDate, setReportDate] = useState(dayjs().format("YYYY-MM-DD"));

  const { data: usersRes } = useGetAllUsersQuery();
  const { data: reportRes } = useGetDailyReportQuery({ date: reportDate });

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
            activeTab === "users"
              ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          User Directory ({usersRes?.data?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
            activeTab === "reports"
              ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Daily Reports Generator
        </button>
      </div>

      {activeTab === "users" ? (
        <UserDirectory users={usersRes?.data} />
      ) : (
        <DailyReportGenerator
          reportDate={reportDate}
          setReportDate={setReportDate}
          reportRes={reportRes}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
