import { NavLink } from "react-router-dom"


const Navigations = ({ usersRes }) => {

    return <nav className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">

        <NavLink to="/admin/dir" className={({ isActive }) => `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${isActive ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "text-slate-400 border-transparent hover:text-slate-600"}`} >
            User Directory ({usersRes?.data?.length || 0})
        </NavLink>

        <NavLink to="/admin/reports" className={({ isActive }) => `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${isActive ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "text-slate-400 border-transparent hover:text-slate-600"}`} >
            Daily Reports Generator
        </NavLink>

        <NavLink to="/admin/attendance" className={({ isActive }) => `pb-2 px-1 font-bold text-sm transition-all border-b-2 ${isActive ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "text-slate-400 border-transparent hover:text-slate-600"}`} >
            Attendence logs
        </NavLink>
    </nav>
}

export default Navigations