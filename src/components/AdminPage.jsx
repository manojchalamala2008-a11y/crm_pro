import React from "react";
import Sidebar from "./Sidebar.jsx";
import StatCard from "./StatCard.jsx";

export default function AdminPage({ currentUser, accounts, onNavigate, onLogout }) {
  return (
    <div className="app-shell">
      <Sidebar currentUser={currentUser} activePage="admin" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="dashboard-main">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>Admin</strong></div>
          <div className="topbar-actions">
            <span className="topbar-avatar">{currentUser.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
            <button type="button" className="topbar-logout" onClick={onLogout}>Log out</button>
          </div>
        </header>
        <div className="dashboard-content">
          <section className="welcome-row">
            <div><span className="eyebrow">WORKSPACE MANAGEMENT</span><h1>Admin dashboard</h1><p>Manage your workspace accounts and team access.</p></div>
          </section>
          <section className="stats-grid" aria-label="Workspace statistics">
            <StatCard label="Registered accounts" value={accounts.length} change="Active" note="in this session" icon="♙" tone="blue" />
            <StatCard label="Administrators" value={accounts.filter((account) => account.role === "Admin").length} change="Role" note="workspace admins" icon="⚙" tone="purple" />
            <StatCard label="Sales team" value={accounts.filter((account) => account.role === "Sales team").length} change="Role" note="team accounts" icon="↗" tone="green" />
            <StatCard label="Workspace" value={currentUser.company || "Orbit CRM"} change="Current" note="organization" icon="◇" tone="orange" />
          </section>
          <section className="panel admin-users-panel">
            <div className="panel-heading"><div><h2>Workspace accounts</h2><p>Accounts saved in this browser.</p></div></div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>NAME</th><th>EMAIL</th><th>PHONE</th><th>JOB TITLE</th><th>ROLE</th></tr></thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.email}>
                      <td><div className="contact-details"><strong>{account.name}</strong><small>{account.company}</small></div></td>
                      <td className="admin-email">{account.email}</td>
                      <td className="admin-email">{account.phone}</td>
                      <td className="admin-email">{account.jobTitle}</td>
                      <td><span className={`status-pill ${account.role === "Admin" ? "status--negotiation" : "status--qualified"}`}><span />{account.role}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {accounts.length === 0 && <p className="empty-accounts">No accounts have been registered yet.</p>}
            </div>
          </section>
          <p className="admin-demo-note">This demo saves account details in this browser only. It does not sync to a server.</p>
        </div>
      </main>
    </div>
  );
}
