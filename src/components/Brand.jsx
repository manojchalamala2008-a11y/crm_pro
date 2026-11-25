import React from "react";

export default function Brand({ compact = false }) {
  return (
    <div className={`brand${compact ? " brand--compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {!compact && <span className="brand-name">orbit<span>crm</span></span>}
    </div>
  );
}
