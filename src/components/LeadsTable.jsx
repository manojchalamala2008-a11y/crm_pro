import React from "react";

const leads = [
  { initials: "SC", name: "Sarah Chen", company: "Layers Studio", email: "sarah@layers.studio", status: "Qualified", amount: "$12,400", color: "lavender" },
  { initials: "MR", name: "Marcus Reed", company: "Northstar Labs", email: "marcus@northstar.io", status: "Negotiation", amount: "$8,750", color: "peach" },
  { initials: "AP", name: "Ava Patel", company: "Forma Creative", email: "ava@forma.co", status: "New lead", amount: "$5,200", color: "mint" },
  { initials: "JW", name: "James Wilson", company: "Goodwell Co.", email: "james@goodwell.co", status: "Qualified", amount: "$16,800", color: "blue" },
];

export default function LeadsTable() {
  return (
    <section className="panel leads-panel">
      <div className="panel-heading">
        <div><h2>Recent deals</h2><p>Keep an eye on your latest opportunities.</p></div>
        <button className="text-button" type="button">View all <span aria-hidden="true">→</span></button>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>CONTACT</th><th>STATUS</th><th>VALUE</th><th aria-label="Actions" /></tr></thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.email}>
                <td>
                  <div className="contact-cell">
                    <span className={`contact-avatar avatar--${lead.color}`}>{lead.initials}</span>
                    <span className="contact-details"><strong>{lead.name}</strong><small>{lead.company}</small></span>
                  </div>
                </td>
                <td><span className={`status-pill status--${lead.status.toLowerCase().replace(" ", "-")}`}><span />{lead.status}</span></td>
                <td className="amount-cell">{lead.amount}</td>
                <td><button className="row-menu" type="button" aria-label={`More options for ${lead.name}`}>···</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
