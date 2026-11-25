import React from "react";
import Brand from "./Brand.jsx";

const navigation = [
  { icon: "⌂", label: "Overview", page: "dashboard" },
  { icon: "♙", label: "Contacts", page: "contacts", count: "248" },
  { icon: "◇", label: "Companies", page: "companies" },
  { icon: "↗", label: "Deals", page: "deals", count: "12" },
  { icon: "▤", label: "Tasks", page: "tasks" },
];

export default function Sidebar({ currentUser, activePage, onNavigate, onLogout }) {
  const visibleNavigation = currentUser?.role === "Admin"
    ? [...navigation, { icon: "⚙", label: "Admin", page: "admin" }]
    : navigation;
  const initials = currentUser?.name?.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "JP";

  return (
    <aside className="sidebar">
      <Brand />
      <button className="workspace-picker" type="button" onClick={() => onNavigate("workspace")} aria-label="Open Free workspace">
        <span className="workspace-icon">S</span>
        <span className="workspace-name">Studio North<small>Free workspace</small></span>
        <span className="chevron">⌄</span>
      </button>
      <span className="sidebar-label">WORKSPACE</span>
      <nav className="side-nav" aria-label="Main navigation">
        {visibleNavigation.map((item) => (
          <button className={`nav-item${activePage === item.page ? " nav-item--active" : ""}`} key={item.label} type="button" onClick={() => onNavigate(item.page)}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            {item.count && <span className="nav-count">{item.count}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item" type="button"><span className="nav-icon" aria-hidden="true">⚙</span><span>Settings</span></button>
        <div className="profile-card">
          <button type="button" className={`profile-link${activePage === "profile" ? " profile-link--active" : ""}`} onClick={() => onNavigate("profile")} aria-label="Open profile">
            <span className="profile-avatar">{initials}</span>
            <span className="profile-name">{currentUser?.name || "Jamie Parker"}<small>{currentUser?.role || "Admin"}</small></span>
          </button>
          <button type="button" className="profile-menu" onClick={onLogout}><span aria-hidden="true">↗</span> Log out</button>
        </div>
      </div>
    </aside>
  );
}
