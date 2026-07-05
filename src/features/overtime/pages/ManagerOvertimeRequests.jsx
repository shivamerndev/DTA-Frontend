import { useOutletContext } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

function ManagerOvertimeRequests() {
  const { pendingOT, onOTDecisionSubmit } = useOutletContext();

  return (
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
  );
}

export default ManagerOvertimeRequests;
