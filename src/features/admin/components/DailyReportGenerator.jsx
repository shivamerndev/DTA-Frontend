import dayjs from "dayjs";
import { FaDownload } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin.js";

function DailyReportGenerator({ reportDate, setReportDate, reportRes }) {
  const { handleExportCSV } = useAdmin();

  const exportReport = () => {
    handleExportCSV(reportRes?.data, reportDate);
  };

  return (
    <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/50">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold">Daily Report</h3>
          <p className="text-xs text-slate-500">
            Compile and export the workspace attendance statistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 glow-btn"
          >
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <th className="py-3 px-2 font-semibold">Employee</th>
              <th className="py-3 px-2 font-semibold">Punch In</th>
              <th className="py-3 px-2 font-semibold">Punch Out</th>
              <th className="py-3 px-2 font-semibold">Working Hours</th>
              <th className="py-3 px-2 font-semibold">Location</th>
              <th className="py-3 px-2 font-semibold">Validation</th>
              <th className="py-3 px-2 font-semibold">Overtime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
            {reportRes?.data?.map((row) => (
              <tr
                key={row.attendanceId}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
              >
                <td className="py-3.5 px-2">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {row.employeeName}
                  </div>
                  <div className="text-xs text-slate-400">
                    {row.employeeEmail}
                  </div>
                </td>
                <td className="py-3.5 px-2">
                  {dayjs(row.punchIn).format("hh:mm A")}
                </td>
                <td className="py-3.5 px-2">
                  {row.punchOut ? dayjs(row.punchOut).format("hh:mm A") : "Active"}
                </td>
                <td className="py-3.5 px-2 font-semibold text-indigo-600 dark:text-indigo-400">
                  {row.workingHours} hrs
                </td>
                <td className="py-3.5 px-2 text-xs">
                  <span className="text-slate-500 font-mono">
                    {row.location.latitude.toFixed(4)},{" "}
                    {row.location.longitude.toFixed(4)}
                  </span>
                </td>
                <td className="py-3.5 px-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${row.status === "valid"
                        ? "bg-green-500/10 text-green-500"
                        : row.status === "invalid"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-2 capitalize">
                  {row.overtimeStatus === "none" ? (
                    <span className="text-slate-400">none</span>
                  ) : (
                    <span className="text-xs font-semibold">
                      {row.overtimeStatus} ({row.overtimeHours}h)
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!reportRes?.data?.length && (
              <tr>
                <td colSpan="7" className="py-6 text-center text-slate-500">
                  No logs found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyReportGenerator;
