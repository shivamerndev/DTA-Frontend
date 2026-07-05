import React from "react";
import dayjs from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";

function AttendanceLogsTable({ logs }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Attendance Logs */}
      <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/50">
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400" />
          Your Attendance Logs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-3 px-2 font-semibold">Date</th>
                <th className="py-3 px-2 font-semibold">Punch In</th>
                <th className="py-3 px-2 font-semibold">Punch Out</th>
                <th className="py-3 px-2 font-semibold">Working Hours</th>
                <th className="py-3 px-2 font-semibold">Validation</th>
                <th className="py-3 px-2 font-semibold">OT Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {logs?.map((log) => (
                <tr key={log._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-2 font-medium">{log.date}</td>
                  <td className="py-3.5 px-2">{dayjs(log.punchIn).format("hh:mm A")}</td>
                  <td className="py-3.5 px-2">{log.punchOut ? dayjs(log.punchOut).format("hh:mm A") : "—"}</td>
                  <td className="py-3.5 px-2">
                    <span
                      className={`font-semibold ${
                        log.workingHours >= 8 ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      {log.workingHours} hrs
                    </span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        log.status === "valid"
                          ? "bg-green-50 dark:bg-green-950/20 text-green-600 border-green-200 dark:border-green-900/30"
                          : log.status === "invalid"
                          ? "bg-red-50 dark:bg-red-950/20 text-red-600 border-red-200 dark:border-red-900/30"
                          : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-200 dark:border-amber-900/30"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 capitalize">
                    {log.overtimeStatus === "none" ? (
                      <span className="text-slate-400">none</span>
                    ) : (
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          log.overtimeStatus === "approved"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : log.overtimeStatus === "rejected"
                            ? "bg-rose-500/10 text-rose-500"
                            : "bg-indigo-500/10 text-indigo-500"
                        }`}
                      >
                        {log.overtimeStatus} ({log.overtimeHours}h)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {!logs?.length && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-500">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceLogsTable;
