# D-Table Analytics - Frontend Client

This is the frontend user interface for **D-Table Analytics**, a modern Geofenced Attendance & Overtime management application. It is built using **React**, **Redux Toolkit**, **Vite**, and styled with **Tailwind CSS**.

---

## 🚀 Setup

Follow these simple steps to run the frontend client locally on your computer:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 2. Install Dependencies
Open your terminal, navigate to the `frontend` directory, and run:
```bash
npm install
```

### 3. Start the Development Server
Run the following command to start the app locally:
```bash
npm run dev
```
Once started, open [http://localhost:5173](http://localhost:5173) in your web browser to view the application.

---

## 🏗️ Architecture

The project is structured logically by **feature modules**, keeping all components, state logic, and API calls modular and easy to find.

```
frontend/
├── public/                 # Static assets (images, icons)
└── src/
    ├── app/                # Main App component & global CSS styles
    ├── store/              # Redux Store setup & base RTK Query configuration
    ├── routes/             # Client-side routing configuration (Protected & Public routes)
    ├── features/           # Modular features containing pages, components, & api slices
    │   ├── auth/           # Login & Registration flows
    │   ├── attendance/     # Clock-in / Clock-out terminal & logs table
    │   ├── overtime/       # Overtime request modals & approval system
    │   ├── admin/          # Admin pages (User directories & reports)
    │   └── theme/          # Dark & Light mode theme context
    └── main.jsx            # Application entry point
```

### Key Libraries & Technologies:
* **Vite**: Ultra-fast bundler and development server.
* **React 19 & React Router v7**: For building components and handling navigation.
* **Redux Toolkit & RTK Query**: Manages client state and handles automated backend API caching.
* **Tailwind CSS v4**: Utility-first CSS framework for modern, responsive, and customizable designs.
* **React Webcam**: Enables capturing webcam snapshots for attendance selfie verification.

---

## ✨ Features

The application adapts based on the user's role:

### 1. 🔑 Authentication & Access Control
* **Public Pages**: Registration and login screens.
* **Protected Routes**: Restricts workspace access to logged-in users.
* **Theme Toggle**: Quick switch between Light Mode and Dark Mode.

### 2. 👤 Employee Dashboard
* **Punch Terminal**: Allows employees to clock in and clock out.
* **Selfie Verification**: Captures a quick webcam photo before clocking in.
* **Geofencing & GPS**: Detects user location to confirm they are inside the office radius.
* **Attendance History**: Lists daily punch logs and working hours.
* **Overtime Requests**: Let employees submit an OT request for specific dates with a reason.

### 3. 👥 Manager Dashboard
* **Team Attendance Logs**: Monitor working hours and validation statuses for all direct reports.
* **Selfie & GPS Verification Modal**: Review captured photos and precise latitude/longitude location details for punch logs.
* **Validation Panel**: Label team logs as "Valid" or "Suspicious/Invalid".
* **Overtime Decisions**: Review, approve, or reject employee overtime hours with remarks.

### 4. ⚙️ Admin Dashboard
* **User Directory**: Search and view detailed roles (Employee, Manager, Admin) for all users.
* **Daily Reports Generator**: Select specific dates to check overall attendance, verify working hours, and download reports.

---

## 📝 Assumptions

* **Browser Permissions**: Users must allow the browser access to the **Webcam** and **Location Services (GPS)** for the clock-in feature to work.
* **Backend Connection**: The frontend assumes the backend API server is running locally on `http://localhost:3000/api/v1` (defined in `src/store/apiSlice.js`).
* **Active Internet**: The app requires an active network connection to fetch coordinates and submit pictures to the server.