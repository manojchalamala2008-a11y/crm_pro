import React from "react";

export default function StatCard({ label, value, change, note, icon, tone }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span>{label}</span>
        <span className={`stat-icon stat-icon--${tone}`} aria-hidden="true">{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot"><span className="stat-change">↗ {change}</span><span>{note}</span></div>
    </article>
  );
}
