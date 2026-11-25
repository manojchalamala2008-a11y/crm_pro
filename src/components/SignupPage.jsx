import React, { useState } from "react";
import AuthLayout from "./AuthLayout.jsx";

export default function SignupPage({ onSignup, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState("Admin");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const created = await onSignup({ name: name.trim(), email: email.trim(), phone: phone.trim(), company: company.trim(), jobTitle: jobTitle.trim(), role, password });
    if (!created) {
      setError("An account with this email already exists. Please sign in instead.");
      return;
    }
    setError("");
  }

  return (
    <AuthLayout title="Create your account" description="Start building stronger customer relationships today." mode="signup">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="signup-name">Your name</label>
        <input id="signup-name" type="text" placeholder="Jamie Parker" value={name} onChange={(event) => setName(event.target.value)} required />
        <label htmlFor="signup-email">Work email</label>
        <input id="signup-email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label htmlFor="signup-phone">Phone number</label>
        <input id="signup-phone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(event) => setPhone(event.target.value)} required />
        <label htmlFor="signup-company">Company</label>
        <input id="signup-company" type="text" placeholder="Your company name" value={company} onChange={(event) => setCompany(event.target.value)} required />
        <label htmlFor="signup-job-title">Job title</label>
        <input id="signup-job-title" type="text" placeholder="e.g. Sales manager" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} required />
        <label htmlFor="signup-role">Account role</label>
        <select id="signup-role" value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Sales team">Sales team</option>
        </select>
        <label htmlFor="signup-password">Create a password</label>
        <input id="signup-password" type="password" placeholder="At least 8 characters" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
        <label htmlFor="signup-confirm-password">Confirm password</label>
        <input id="signup-confirm-password" type="password" placeholder="Enter your password again" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        <label className="checkbox-row">
          <input type="checkbox" required />
          <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span>
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Create account <span aria-hidden="true">→</span></button>
      </form>
      <p className="auth-switch">Already have an account? <button type="button" onClick={onLogin}>Sign in</button></p>
      <div className="secure-note"><span aria-hidden="true">✓</span> No credit card required</div>
    </AuthLayout>
  );
}
