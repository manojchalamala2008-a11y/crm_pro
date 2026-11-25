import React, { useState } from "react";

function initials(name) {
  return name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function AddMemberDialog({ onClose, onAddMember }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const member = {
      name: form.elements.memberName.value.trim(),
      email: form.elements.memberEmail.value.trim(),
      phone: form.elements.memberPhone.value.trim(),
      jobTitle: form.elements.memberTitle.value.trim(),
      role: form.elements.memberRole.value,
    };

    if (!onAddMember(member)) {
      setError("A team member with this email already exists.");
      return;
    }

    onClose();
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="member-dialog" role="dialog" aria-modal="true" aria-labelledby="add-member-title">
        <div className="dialog-heading">
          <div><span className="eyebrow">TEAM MANAGEMENT</span><h2 id="add-member-title">Add a team member</h2><p>Enter their details to add them to your team.</p></div>
          <button className="dialog-close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <form className="member-form" onSubmit={handleSubmit}>
          <label htmlFor="member-name">Full name</label>
          <input id="member-name" name="memberName" type="text" placeholder="e.g. Alex Morgan" autoComplete="name" required />
          <label htmlFor="member-email">Work email</label>
          <input id="member-email" name="memberEmail" type="email" placeholder="alex@company.com" autoComplete="email" required />
          <div className="member-form-row">
            <div><label htmlFor="member-phone">Phone number</label><input id="member-phone" name="memberPhone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" required /></div>
            <div><label htmlFor="member-title">Job title</label><input id="member-title" name="memberTitle" type="text" placeholder="Account manager" required /></div>
          </div>
          <label htmlFor="member-role">Team role</label>
          <select id="member-role" name="memberRole" defaultValue="Sales team" required>
            <option value="Sales team">Sales team</option>
            <option value="Support">Support</option>
            <option value="Marketing">Marketing</option>
            <option value="Manager">Manager</option>
          </select>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="dialog-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit">Add to team</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function TeamMembers({ members, isOpen, onOpen, onClose, onAddMember }) {
  return (
    <>
      <section className="panel team-panel">
        <div className="panel-heading">
          <div><h2>Team members</h2><p>{members.length} {members.length === 1 ? "person" : "people"} on your team</p></div>
          <button className="text-button" type="button" onClick={onOpen}>＋ Add member</button>
        </div>
        {members.length > 0 ? (
          <div className="team-member-list">
            {members.map((member, index) => (
              <article className="team-member-row" key={member.email}>
                <span className={`contact-avatar avatar--${["lavender", "peach", "mint", "blue"][index % 4]}`}>{initials(member.name)}</span>
                <div className="team-member-info"><strong>{member.name}</strong><span>{member.jobTitle} · {member.email}</span></div>
                <span className="team-role-pill">{member.role}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="team-empty"><span aria-hidden="true">♙</span><p>Your team is ready to grow.</p><small>Add a member to see them listed here.</small></div>
        )}
      </section>
      {isOpen && <AddMemberDialog onClose={onClose} onAddMember={onAddMember} />}
    </>
  );
}
