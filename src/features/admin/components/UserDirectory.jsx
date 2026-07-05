import React from "react";
import { FaUsers } from "react-icons/fa";

function UserDirectory({ users }) {
  return (
    <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FaUsers className="text-indigo-600 dark:text-indigo-400" />
          Employee Directory
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <th className="py-3 px-2 font-semibold">User Details</th>
              <th className="py-3 px-2 font-semibold">Email Address</th>
              <th className="py-3 px-2 font-semibold">Company Role</th>
              <th className="py-3 px-2 font-semibold">Direct Manager</th>
              <th className="py-3 px-2 font-semibold">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                <td className="py-3.5 px-2 font-semibold text-slate-900 dark:text-white">{user.name}</td>
                <td className="py-3.5 px-2">{user.email}</td>
                <td className="py-3.5 px-2">
                  <span className="capitalize px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs border border-slate-200/40 dark:border-slate-700/40">
                    {user.role}
                  </span>
                </td>
                <td className="py-3.5 px-2">
                  {user.manager ? (
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-200">{user.manager.name}</span>
                      <span className="text-xs text-slate-400">{user.manager.email}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400">None</span>
                  )}
                </td>
                <td className="py-3.5 px-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Active
                  </span>
                </td>
              </tr>
            ))}
            {!users?.length && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-slate-500">
                  No users loaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDirectory;
