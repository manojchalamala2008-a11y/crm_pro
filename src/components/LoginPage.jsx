import React, { useState } from "react";
import AuthLayout from "./AuthLayout.jsx";

export default function LoginPage({ initialEmail = "", onLogin, onSignup }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const authenticated = await onLogin(email.trim(), password, remember);
    if (!authenticated) {
      setError("We couldn't find an account with that email and password.");
      return;
    }
    setError("");
  }

  return (
    <AuthLayout title="Sign in to your account" description="Your customers are waiting. Pick up where you left off." mode="login">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Work email</label>
        <input id="login-email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <div className="label-row">
          <label htmlFor="login-password">Password</label>
          <a href="#forgot-password">Forgot password?</a>
        </div>
        <input id="login-password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <label className="checkbox-row">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          <span>Keep me signed in</span>
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Sign in <span aria-hidden="true">→</span></button>
      </form>
      <p className="auth-switch">New to Orbit? <button type="button" onClick={onSignup}>Create an account</button></p>
      <div className="secure-note"><span aria-hidden="true">✓</span> Your data is encrypted and secure</div>
    </AuthLayout>
  );
}
