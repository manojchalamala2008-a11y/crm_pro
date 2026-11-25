import React from "react";
import Sidebar from "./Sidebar.jsx";

const pageContent = {
  contacts: {
    title: "Contacts",
    description: "People and prospects in your workspace.",
    columns: ["NAME", "COMPANY", "EMAIL", "STATUS"],
    rows: [
      ["Sarah Chen", "Layers Studio", "sarah@layers.studio", "Qualified"],
      ["Marcus Reed", "Northstar Labs", "marcus@northstar.io", "Negotiation"],
      ["Ava Patel", "Forma Creative", "ava@forma.co", "New lead"],
      ["James Wilson", "Goodwell Co.", "james@goodwell.co", "Qualified"],
    ],
  },
  companies: {
    title: "Companies",
    description: "Organizations connected to your customer relationships.",
    columns: ["COMPANY", "INDUSTRY", "CONTACT", "STATUS"],
    rows: [
      ["Layers Studio", "Design", "Sarah Chen", "Active"],
      ["Northstar Labs", "Technology", "Marcus Reed", "Active"],
      ["Forma Creative", "Marketing", "Ava Patel", "Prospect"],
      ["Goodwell Co.", "Healthcare", "James Wilson", "Active"],
    ],
  },
  deals: {
    title: "Deals",
    description: "Track opportunities and their current stage.",
    columns: ["DEAL", "CONTACT", "STAGE", "VALUE"],
    rows: [
      ["Website redesign", "Sarah Chen", "Qualified", "$12,400"],
      ["Annual platform plan", "Marcus Reed", "Negotiation", "$8,750"],
      ["Brand strategy", "Ava Patel", "New lead", "$5,200"],
      ["Customer portal", "James Wilson", "Qualified", "$16,800"],
    ],
  },
  tasks: {
    title: "Tasks",
    description: "Follow-ups and work scheduled across your team.",
    columns: ["TASK", "ASSIGNEE", "DUE DATE", "STATUS"],
    rows: [
      ["Follow up on proposal", "Sarah Chen", "Today", "In progress"],
      ["Prepare product demo", "Marcus Reed", "Tomorrow", "To do"],
      ["Send onboarding details", "Ava Patel", "Nov 28", "Done"],
      ["Review contract", "James Wilson", "Nov 29", "To do"],
    ],
  },
};

function getStatusClass(status) {
  if (status === "Qualified" || status === "Active" || status === "Done") return "status--qualified";
  if (status === "Negotiation" || status === "In progress") return "status--negotiation";
  return "status--new-lead";
}

function initialsFor(name) {
  return name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function ProfileDetails({ currentUser }) {
  const details = [
    ["Full name", currentUser.name],
    ["Work email", currentUser.email],
    ["Phone number", currentUser.phone || "Not provided"],
    ["Company", currentUser.company || "Not provided"],
    ["Job title", currentUser.jobTitle || "Not provided"],
    ["Role", currentUser.role],
  ];

  return (
    <section className="panel detail-panel">
      <div className="profile-summary">
        <span className="profile-avatar">{initialsFor(currentUser.name)}</span>
        <div><h2>{currentUser.name}</h2><p>{currentUser.email}</p></div>
      </div>
      <dl className="detail-grid">
        {details.map(([label, value]) => (
          <div className="detail-item" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function WorkspaceDetails({ currentUser }) {
  return (
    <section className="panel detail-panel">
      <div className="panel-heading"><div><h2>Workspace details</h2><p>Your current workspace and plan.</p></div></div>
      <dl className="detail-grid">
        <div className="detail-item"><dt>Workspace</dt><dd>Studio North</dd></div>
        <div className="detail-item"><dt>Plan</dt><dd><span className="plan-badge">Free workspace</span></dd></div>
        <div className="detail-item"><dt>Organization</dt><dd>{currentUser.company || "Not provided"}</dd></div>
        <div className="detail-item"><dt>Workspace owner</dt><dd>{currentUser.name}</dd></div>
      </dl>
    </section>
  );
}

export default function WorkspacePage({ currentUser, page, onNavigate, onLogout }) {
  const content = pageContent[page];
  const title = content?.title || (page === "profile" ? "Your profile" : "Free workspace");
  const description = content?.description || (
    page === "profile"
      ? "Your account information."
      : "Workspace information and plan details."
  );

  return (
    <div className="app-shell">
      <Sidebar currentUser={currentUser} activePage={page} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="dashboard-main">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{title}</strong></div>
          <div className="topbar-actions">
            <span className="topbar-avatar">{initialsFor(currentUser.name)}</span>
            <button type="button" className="topbar-logout" onClick={onLogout}>Log out</button>
          </div>
        </header>
        <div className="dashboard-content">
          <section className="welcome-row">
            <div><span className="eyebrow">STUDIO NORTH</span><h1>{title}</h1><p>{description}</p></div>
          </section>
          {content && (
            <section className="panel records-panel">
              <div className="table-scroll">
                <table>
                  <thead><tr>{content.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                  <tbody>
                    {content.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((value, index) => (
                          <td key={`${row[0]}-${content.columns[index]}`}>
                            {content.columns[index] === "STATUS" || content.columns[index] === "STAGE"
                              ? <span className={`status-pill ${getStatusClass(value)}`}><span />{value}</span>
                              : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {page === "profile" && <ProfileDetails currentUser={currentUser} />}
          {page === "workspace" && <WorkspaceDetails currentUser={currentUser} />}
        </div>
      </main>
    </div>
  );
}
