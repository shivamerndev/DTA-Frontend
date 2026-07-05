import React, { useState } from "react";
import dayjs from "dayjs";
import { FaCheck, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { useGetAttendanceTeamQuery } from "../../attendance/api/attendanceApi.js";
import { useGetOTRequestsTeamQuery } from "../api/overtimeApi.js";
import useAttendance from "../../attendance/hooks/useAttendance.js";
import useOvertime from "../hooks/useOvertime.js";

function ManagerDashboard({ user }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [verifyStatus, setVerifyStatus] = useState("valid");
  const [verifyRemarks, setVerifyRemarks] = useState("");
  const [activeTab, setActiveTab] = useState("attendance"); // attendance | overtime

  const { data: teamLogs, refetch: refetchLogs } = useGetAttendanceTeamQuery();
  const { data: pendingOT, refetch: refetchOT } = useGetOTRequestsTeamQuery();

  const { handleVerify } = useAttendance();
  const { handleOTDecision } = useOvertime();

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    handleVerify(selectedLog._id, verifyStatus, verifyRemarks, () => {
      setSelectedLog(null);
      setVerifyRemarks("");
      refetchLogs();
    });
  };

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
        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
            activeTab === "attendance"
              ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Team Attendance logs
        </button>
        <button
          onClick={() => setActiveTab("overtime")}
          className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 ${
            activeTab === "overtime"
              ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          Overtime Requests ({pendingOT?.data?.filter((r) => r.status === "pending").length || 0})
        </button>
      </div>

      {activeTab === "attendance" ? (
        // TEAM ATTENDANCE logs
        <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/50">
          <h3 className="text-lg font-bold mb-4">Validate Team Attendance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-3 px-2 font-semibold">Employee</th>
                  <th className="py-3 px-2 font-semibold">Date</th>
                  <th className="py-3 px-2 font-semibold">Punch In/Out</th>
                  <th className="py-3 px-2 font-semibold">Working Hours</th>
                  <th className="py-3 px-2 font-semibold">Selfie Preview</th>
                  <th className="py-3 px-2 font-semibold">Status</th>
                  <th className="py-3 px-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                {teamLogs?.data?.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="py-3.5 px-2">
                      <div className="font-semibold text-slate-900 dark:text-white">{log.employee.name}</div>
                      <div className="text-xs text-slate-400">{log.employee.email}</div>
                    </td>
                    <td className="py-3.5 px-2">{log.date}</td>
                    <td className="py-3.5 px-2">
                      <div className="text-xs font-medium">In: {dayjs(log.punchIn).format("hh:mm A")}</div>
                      <div className="text-xs text-slate-400">
                        Out: {log.punchOut ? dayjs(log.punchOut).format("hh:mm A") : "Active"}
                      </div>
                    </td>
                    <td className="py-3.5 px-2 font-bold text-indigo-600 dark:text-indigo-400">
                      {log.workingHours} hrs
                    </td>
                    <td className="py-3.5 px-2">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
                        <img
                          src={`http://localhost:3000${log.selfieUrl}`}
                          alt="Selfie"
                          className="w-full h-full object-cover hover:scale-110 transition duration-300 cursor-pointer"
                          onClick={() => setSelectedLog(log)}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100";
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          log.status === "valid"
                            ? "bg-green-500/10 text-green-500"
                            : log.status === "invalid"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setVerifyStatus(log.status === "pending" ? "valid" : log.status);
                          setVerifyRemarks(log.remarks || "");
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition glow-btn"
                      >
                        Verify Record
                      </button>
                    </td>
                  </tr>
                ))}
                {!teamLogs?.data?.length && (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-slate-500">
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // TEAM OVERTIME REQUESTS
        <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/50">
          <h3 className="text-lg font-bold mb-4">Review Overtime Requests</h3>
          <div className="space-y-4">
            {pendingOT?.data?.map((ot) => (
              <div
                key={ot._id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{ot.employee.name}</span>
                    <span className="text-xs bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold px-2 py-0.5 rounded">
                      {ot.requestedHours} hrs requested
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Date: {ot.attendance.date} | Email: {ot.employee.email}</p>
                  <p className="text-sm italic text-slate-600 dark:text-slate-300">
                    &ldquo;{ot.reason}&rdquo;
                  </p>
                  {ot.status !== "pending" && (
                    <div className="text-xs font-semibold mt-2">
                      Status:{" "}
                      <span className={ot.status === "approved" ? "text-green-500" : "text-red-500"}>
                        {ot.status.toUpperCase()}
                      </span>
                      {ot.remarks && <span className="text-slate-400"> — Remarks: {ot.remarks}</span>}
                    </div>
                  )}
                </div>

                {ot.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const notes = prompt("Enter approval remarks (optional):");
                        if (notes !== null) onOTDecisionSubmit(ot._id, true, notes);
                      }}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => {
                        const notes = prompt("Enter rejection reason:");
                        if (notes) onOTDecisionSubmit(ot._id, false, notes);
                      }}
                      className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
            {!pendingOT?.data?.length && (
              <p className="text-center py-6 text-slate-500">No overtime requests found.</p>
            )}
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-6 border border-slate-200/50 dark:border-slate-800/50 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Verify Attendance</h4>
                <p className="text-xs text-slate-400">{selectedLog.employee.name} — {selectedLog.date}</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Image Column */}
              <div className="rounded-xl overflow-hidden aspect-square border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                <img
                  src={`http://localhost:3000${selectedLog.selfieUrl}`}
                  className="w-full h-full object-cover"
                  alt="Captured Selfie"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400";
                  }}
                />
              </div>

              {/* Data and form Column */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <FaMapMarkerAlt /> GPS Position
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-xl text-xs space-y-1">
                    <div>Latitude: <span className="font-bold">{selectedLog.location.latitude}</span></div>
                    <div>Longitude: <span className="font-bold">{selectedLog.location.longitude}</span></div>
                  </div>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Validation Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("valid")}
                        className={`py-2 rounded-xl text-xs font-bold border transition ${
                          verifyStatus === "valid"
                            ? "bg-green-600 text-white border-green-600"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        Valid
                      </button>
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("invalid")}
                        className={`py-2 rounded-xl text-xs font-bold border transition ${
                          verifyStatus === "invalid"
                            ? "bg-red-600 text-white border-red-600"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        Suspicious/Invalid
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Verification Note
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Add remarks..."
                      value={verifyRemarks}
                      onChange={(e) => setVerifyRemarks(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition"
                  >
                    Submit Validation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;
