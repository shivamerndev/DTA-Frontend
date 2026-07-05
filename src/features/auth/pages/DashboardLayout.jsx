import { useSelector } from "react-redux";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { selectUser } from "../auth.slice.js";
import { useTheme } from "../../theme/useTheme.js";
import useAuth from "../hooks/useAuth.js";
import DashboardRedirect from "../../../routes/DashboardRedirect.jsx";

function DashboardLayout() {

  const { handleLogout } = useAuth();
  const user = useSelector(selectUser);
  const { darkMode, setDarkMode } = useTheme();


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors flex flex-col">
      <DashboardRedirect />

      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-600/30">
            DT
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight m-0 text-slate-900 dark:text-white">D-Table Analytics</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Attendance Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-semibold text-sm text-slate-950 dark:text-white">{user?.name}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 capitalize">
              {user?.role}
            </span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
            title="Log Out"
          >
            <FaSignOutAlt size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
