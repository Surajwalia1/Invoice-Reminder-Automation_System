import React, { useState, useEffect } from "react";
import "./../styles/Dashboard.css";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data.invoices))
      .catch((err) => console.error(err));
  }, []);

  const handleTriggerAutomation = (id) => {
    fetch("http://localhost:5000/invoices/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message))
      .catch((err) => console.error(err));
  };

  return (
    <div className="dashboard-container">
      <h1>Invoices</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <p>{`Recipient: ${invoice.recipient}, Amount: ${invoice.amount}, Due: ${invoice.dueDate}`}</p>
            <button onClick={() => handleTriggerAutomation(invoice.id)}>
              Trigger Automation
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
