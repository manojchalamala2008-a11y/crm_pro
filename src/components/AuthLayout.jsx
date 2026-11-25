import React from "react";
import Brand from "./Brand.jsx";

export default function AuthLayout({ children, title, description, mode }) {
  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <Brand />
        <div className="showcase-copy">
          <span className="eyebrow">CUSTOMER RELATIONSHIPS, REIMAGINED</span>
          <h1>Good relationships<br />make great business.</h1>
          <p>Bring every conversation, customer, and opportunity together in one clear view.</p>
        </div>
        <div className="showcase-footer">
          <div className="avatar-stack" aria-hidden="true">
            <span>JD</span><span>MK</span><span>AL</span><span>+</span>
          </div>
          <span>Trusted by teams that put people first</span>
        </div>
        <div className="showcase-orbit showcase-orbit--one" />
        <div className="showcase-orbit showcase-orbit--two" />
      </section>
      <section className="auth-form-side">
        <div className="auth-card">
          <div className="auth-mobile-brand"><Brand /></div>
          <span className="eyebrow auth-eyebrow">{mode === "signup" ? "GET STARTED" : "WELCOME BACK"}</span>
          <h2>{title}</h2>
          <p className="auth-description">{description}</p>
          {children}
        </div>
        <p className="auth-legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </section>
    </main>
  );
}
