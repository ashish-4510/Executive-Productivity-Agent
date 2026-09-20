import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import MeetingsPage from "./pages/MeetingsPage";
import CalendarPage from "./pages/CalendarPage";
import EmailsPage from "./pages/EmailsPage";
import VoiceNotesPage from "./pages/VoiceNotesPage";
import BriefPage from "./pages/BriefPage";
import ChatPage from "./pages/ChatPage";
import DataSourcesPage from "./pages/DataSourcesPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        {/* =====================================
            SIDEBAR
        ====================================== */}

        <aside className="sidebar">

          {/* LOGO */}

          <div className="logo-area">

            <div className="logo-icon">
              AI
            </div>

            <div>

              <h2>
                Executive
              </h2>

              <p>
                Productivity Agent
              </p>

            </div>

          </div>


          {/* NAVIGATION */}

          <nav className="navigation">

            {/* OVERVIEW */}

            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>▦</span>
              Overview
            </NavLink>


            {/* MY ACTIONS */}

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>✓</span>
              My Actions
            </NavLink>


            {/* MEETINGS */}

            <NavLink
              to="/meetings"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>◉</span>
              Meetings
            </NavLink>


            {/* CALENDAR */}

            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>◷</span>
              Calendar
            </NavLink>


            {/* EMAILS */}

            <NavLink
              to="/emails"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>✉</span>
              Emails
            </NavLink>


            {/* VOICE NOTES */}

            <NavLink
              to="/voice-notes"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>◉</span>
              Voice Notes
            </NavLink>


            {/* AI BRIEF */}

            <NavLink
              to="/brief"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>✦</span>
              AI Brief
            </NavLink>


            {/* AI CHAT */}

            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>✦</span>
              AI Chat
            </NavLink>


            {/* DATA SOURCES */}

            <NavLink
              to="/sources"
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>◫</span>
              Data Sources
            </NavLink>

          </nav>


          {/* =====================================
              USER
          ====================================== */}

          <div className="sidebar-bottom">

            <div className="user-avatar">
              AM
            </div>

            <div>

              <strong>
                Arjun Malhotra
              </strong>

              <span>
                VP Sales
              </span>

            </div>

          </div>

        </aside>


        {/* =====================================
            MAIN CONTENT
        ====================================== */}

        <main className="main">

          <Routes>

            {/* OVERVIEW */}

            <Route
              path="/"
              element={
                <DashboardPage />
              }
            />


            {/* MY ACTIONS */}

            <Route
              path="/tasks"
              element={
                <TasksPage />
              }
            />


            {/* MEETINGS */}

            <Route
              path="/meetings"
              element={
                <MeetingsPage />
              }
            />


            {/* CALENDAR */}

            <Route
              path="/calendar"
              element={
                <CalendarPage />
              }
            />


            {/* EMAILS */}

            <Route
              path="/emails"
              element={
                <EmailsPage />
              }
            />


            {/* VOICE NOTES */}

            <Route
              path="/voice-notes"
              element={
                <VoiceNotesPage />
              }
            />


            {/* AI BRIEF */}

            <Route
              path="/brief"
              element={
                <BriefPage />
              }
            />


            {/* AI CHAT */}

            <Route
              path="/chat"
              element={
                <ChatPage />
              }
            />


            {/* DATA SOURCES */}

            <Route
              path="/sources"
              element={
                <DataSourcesPage />
              }
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;