import { NavLink, Outlet } from "react-router-dom";
import { useGetAttendanceTeamQuery } from "../../attendance/api/attendanceApi.js";
import { useGetOTRequestsTeamQuery } from "../api/overtimeApi.js";
import useOvertime from "../hooks/useOvertime.js";

function ManagerDashboard() {
  const { data: teamLogs, refetch: refetchLogs } = useGetAttendanceTeamQuery();
  const { data: pendingOT, refetch: refetchOT } = useGetOTRequestsTeamQuery();

  const { handleOTDecision } = useOvertime();

  const onOTDecisionSubmit = (id, approve, reason = "") => {
    handleOTDecision(id, approve, reason, () => {
      refetchOT();
      refetchLogs();
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <NavLink
          to="/manager/attendance"
          className={({ isActive }) =>
            `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
              isActive
                ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-slate-400 border-transparent hover:text-slate-600"
            }`
          }
        >
          Team Attendance logs
        </NavLink>
        <NavLink
          to="/manager/overtime"
          className={({ isActive }) =>
            `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
              isActive
                ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "text-slate-400 border-transparent hover:text-slate-600"
            }`
          }
        >
          Overtime Requests ({pendingOT?.data?.filter((r) => r.status === "pending").length || 0})
        </NavLink>
      </div>

      <Outlet context={{ teamLogs, refetchLogs, pendingOT, refetchOT, onOTDecisionSubmit }} />
    </div>
  );
}

export default ManagerDashboard;

