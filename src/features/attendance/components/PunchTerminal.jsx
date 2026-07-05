import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import {
  FaCamera,
  FaSignInAlt,
  FaSignOutAlt,
  FaClock,
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";
import useAttendance from "../hooks/useAttendance.js";

function PunchTerminal({ todayLog, refetchLogs, onOpenOTModal }) {
  const webcamRef = useRef(null);
  const {
    cameraActive,
    photo,
    setPhoto,
    punching,
    handleCapture,
    handlePunchIn,
    handlePunchOut,
  } = useAttendance();

  const capture = () => handleCapture(webcamRef);
  const onPunchIn = () => handlePunchIn(refetchLogs);
  const onPunchOut = () => handlePunchOut(refetchLogs);


  return (
    <div className="lg:col-span-1 glass-card p-6 border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
        <FaClock className="text-indigo-600 dark:text-indigo-400" />
        Punch Terminal
      </h3>

      {!todayLog ? (
        // Punch In View
        <div className="w-full flex flex-col items-center space-y-4">
          {!photo ? (
            <div className="relative w-full aspect-video max-w-sm rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center">
              {cameraActive ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
              ) : (
                <span className="text-xs text-slate-500">Camera offline</span>
              )}
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={capture}
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition glow-btn"
                  title="Capture photo"
                >
                  <FaCamera size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video max-w-sm rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow">
              <img src={photo} className="w-full h-full object-cover" alt="Captured selfie" />
              <button
                onClick={() => setPhoto(null)}
                className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Retake
              </button>
            </div>
          )}
          <button
            onClick={onPunchIn}
            disabled={punching}
            className="w-full py-4.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition shadow-lg shadow-green-600/20 glow-btn flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaSignInAlt />
            {punching ? "Acquiring Coordinates..." : "Punch In Now"}
          </button>
        </div>
      ) : !todayLog.punchOut ? (
        // Punch Out View
        <div className="w-full flex flex-col items-center space-y-6 py-4">
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-1">
              PUNCH-IN TIME
            </p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {dayjs(todayLog.punchIn).format("hh:mm:ss A")}
            </p>
            <p className="text-xs text-slate-400 mt-1">Date: {todayLog.date}</p>
          </div>

          <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
            <FaClock className="text-3xl animate-pulse" />
          </div>

          <button
            onClick={onPunchOut}
            className="w-full py-4.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition shadow-lg shadow-rose-600/20 glow-btn flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Punch Out Now
          </button>
        </div>
      ) : (
        // Shift Completed View
        <div className="w-full flex flex-col items-center py-6 text-center space-y-4">
          <FaCheckCircle className="text-5xl text-emerald-500" />
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-lg">Shift Completed Today!</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Worked Hours:{" "}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {todayLog.workingHours} hrs
              </span>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Shift: {todayLog.workingHours >= 8 ? "Full-Time (Completed)" : "Part-Time/Incomplete"}
            </p>
          </div>
          {!todayLog.otRequest ? (
            <button
              onClick={() => onOpenOTModal(todayLog._id)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 glow-btn"
            >
              <FaPlusCircle /> Request Overtime
            </button>
          ) : (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
              OT Requested ({todayLog.overtimeStatus})
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default PunchTerminal;
