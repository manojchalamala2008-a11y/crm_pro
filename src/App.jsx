import React, { useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminPage from "./components/AdminPage.jsx";
import WorkspacePage from "./components/WorkspacePage.jsx";

const ACCOUNT_STORAGE_KEY = "orbit-crm-accounts";
const TEAM_STORAGE_KEY = "orbit-crm-team-members";
const SESSION_STORAGE_KEY = "orbit-crm-session";

const demoAdmin = {
  name: "Orbit Admin",
  email: "admin@orbitcrm.com",
  phone: "",
  company: "Orbit CRM",
  jobTitle: "Workspace administrator",
  role: "Admin",
  passwordSalt: "orbit-crm-demo-admin",
  passwordHash: "2599197a765b16dc296a8e2ed47b869358b1ab068dffb749fa153fa5f9fabf4a",
};

function readStoredArray(key, fallback) {
  const saved = window.localStorage.getItem(key);
  return saved === null ? fallback : JSON.parse(saved);
}

function createSalt() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function App() {
  const [accounts, setAccounts] = useState(() => readStoredArray(ACCOUNT_STORAGE_KEY, [demoAdmin]));
  const [teamMembers, setTeamMembers] = useState(() => readStoredArray(TEAM_STORAGE_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => {
    const savedEmail = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!savedEmail) return null;
    const account = accounts.find((item) => item.email.toLowerCase() === savedEmail.toLowerCase());
    if (!account) window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return account || null;
  });
  const [page, setPage] = useState(() => (
    currentUser ? (currentUser.role === "Admin" ? "admin" : "dashboard") : "login"
  ));

  async function handleLogin(email, password, remember) {
    const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!account) return false;
    const passwordHash = await hashPassword(password, account.passwordSalt);
    if (passwordHash !== account.passwordHash) return false;

    setCurrentUser(account);
    setPage(account.role === "Admin" ? "admin" : "dashboard");
    if (remember) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, account.email);
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
    return true;
  }

  async function handleSignup(formData) {
    const email = formData.email.toLowerCase();
    if (accounts.some((account) => account.email.toLowerCase() === email)) return false;

    const passwordSalt = createSalt();
    const account = {
      name: formData.name,
      email,
      phone: formData.phone,
      company: formData.company,
      jobTitle: formData.jobTitle,
      role: formData.role,
      passwordSalt,
      passwordHash: await hashPassword(formData.password, passwordSalt),
    };
    const nextAccounts = [...accounts, account];
    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(nextAccounts));
    window.localStorage.setItem(SESSION_STORAGE_KEY, account.email);
    setAccounts(nextAccounts);
    setCurrentUser(account);
    setPage(account.role === "Admin" ? "admin" : "dashboard");
    return true;
  }

  function handleLogout() {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    setCurrentUser(null);
    setPage("login");
  }

  function handleAddTeamMember(member) {
    const email = member.email.toLowerCase();
    const alreadyExists = teamMembers.some((item) => item.email.toLowerCase() === email)
      || accounts.some((item) => item.email.toLowerCase() === email);
    if (alreadyExists) return false;
    const nextMembers = [...teamMembers, { ...member, email }];
    window.localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(nextMembers));
    setTeamMembers(nextMembers);
    return true;
  }

  if (page === "admin" && currentUser?.role === "Admin") {
    return <AdminPage currentUser={currentUser} accounts={accounts} onNavigate={setPage} onLogout={handleLogout} />;
  }

  if (page === "dashboard" && currentUser) {
    return <Dashboard currentUser={currentUser} teamMembers={teamMembers} onAddTeamMember={handleAddTeamMember} onNavigate={setPage} onLogout={handleLogout} />;
  }

  if (currentUser && page !== "signup" && page !== "login") {
    return <WorkspacePage currentUser={currentUser} page={page} onNavigate={setPage} onLogout={handleLogout} />;
  }

  if (page === "signup") {
    return <SignupPage onSignup={handleSignup} onLogin={() => setPage("login")} />;
  }

  return <LoginPage onLogin={handleLogin} onSignup={() => setPage("signup")} />;
}
