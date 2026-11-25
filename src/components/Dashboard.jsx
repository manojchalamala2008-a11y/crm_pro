import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import StatCard from "./StatCard.jsx";
import LeadsTable from "./LeadsTable.jsx";
import TeamMembers from "./TeamMembers.jsx";

const activities = [
  { initials: "SC", color: "lavender", text: <><strong>Sarah Chen</strong> moved to <b>Qualified</b></>, time: "12 min ago", icon: "↗" },
  { initials: "MK", color: "peach", text: <><strong>Michael Kim</strong> added a note to <b>Northstar Labs</b></>, time: "1 hour ago", icon: "✎" },
  { initials: "AL", color: "mint", text: <><strong>Alex Lee</strong> completed a task</>, time: "3 hours ago", icon: "✓" },
];

export default function Dashboard({ currentUser, teamMembers, onAddTeamMember, onNavigate, onLogout }) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar currentUser={currentUser} activePage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="dashboard-main">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>Overview</strong></div>
          <div className="topbar-actions">
            <button type="button" className="icon-button search-shortcut" aria-label="Search">⌕ <span>Search</span><kbd>⌘ K</kbd></button>
            <button type="button" className="icon-button notification-button" aria-label="Notifications">♧<i /></button>
            <span className="topbar-avatar">{currentUser?.name?.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "JP"}</span>
            <button type="button" className="topbar-logout" onClick={onLogout}>Log out</button>
          </div>
        </header>
        <div className="dashboard-content">
          <section className="welcome-row">
            <div><span className="eyebrow">YOUR CRM WORKSPACE</span><h1>Good morning, {currentUser?.name?.split(" ")[0] || "Jamie"} <span aria-hidden="true">✦</span></h1><p>Here's what's happening with your customers today.</p></div>
            <button type="button" className="primary-button add-contact" onClick={() => setIsAddMemberOpen(true)}><span aria-hidden="true">＋</span> Add member</button>
          </section>
          <section className="stats-grid" aria-label="CRM metrics">
            <StatCard label="Total contacts" value="2,840" change="12.8%" note="vs. last month" icon="♙" tone="blue" />
            <StatCard label="Open deals" value="$48,290" change="8.2%" note="vs. last month" icon="↗" tone="purple" />
            <StatCard label="Conversion rate" value="24.8%" change="4.3%" note="vs. last month" icon="◎" tone="green" />
            <StatCard label="Tasks due" value="18" change="3 today" note="across your team" icon="▤" tone="orange" />
          </section>
          <div className="dashboard-columns">
            <LeadsTable />
            <section className="panel activity-panel">
              <div className="panel-heading"><div><h2>Activity</h2><p>Latest updates from your team.</p></div><button className="icon-button activity-filter" type="button" aria-label="Activity options">···</button></div>
              <div className="activity-list">
                {activities.map((activity, index) => (
                  <div className="activity-item" key={activity.initials}>
                    <span className={`contact-avatar avatar--${activity.color}`}>{activity.initials}</span>
                    <div className="activity-copy"><p>{activity.text}</p><small>{activity.time}</small></div>
                    <span className={`activity-action activity-action--${index}`} aria-hidden="true">{activity.icon}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="activity-link">See all activity <span aria-hidden="true">→</span></button>
            </section>
          </div>
          <TeamMembers
            members={teamMembers}
            isOpen={isAddMemberOpen}
            onOpen={() => setIsAddMemberOpen(true)}
            onClose={() => setIsAddMemberOpen(false)}
            onAddMember={onAddTeamMember}
          />
          <footer className="dashboard-footer">Made for better relationships <span>✦</span></footer>
        </div>
      </main>
    </div>
  );
}
