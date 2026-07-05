import React, { useState } from "react";
import useOvertime from "../hooks/useOvertime.js";

function OvertimeRequestModal({ attendanceId, onClose }) {
  const [otHours, setOtHours] = useState(1);
  const [otReason, setOtReason] = useState("");
  const { handleOTSubmit, isSubmitting } = useOvertime();

  const onSubmit = (e) => {
    e.preventDefault();
    handleOTSubmit(attendanceId, otHours, otReason, onClose);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-6 border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Request Overtime</h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Overtime Hours
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
              value={otHours}
              onChange={(e) => setOtHours(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Reason / Task Done
            </label>
            <textarea
              required
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Completed database architecture modifications..."
              value={otReason}
              onChange={(e) => setOtReason(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl glow-btn disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Overtime Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OvertimeRequestModal;
