import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/InvoicePage.css";
import { FiSend, FiAlertCircle, FiCheckCircle, FiClock, FiLogOut } from "react-icons/fi";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem('token', token);
    } else {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        window.location.href = "http://localhost:5008/auth/google";
      }
    }

    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5008/api/invoices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setLoading(false);
      showMessage("Failed to fetch invoices", "error");
    }
  };

  const handleTriggerAutomation = async (invoice) => {
    try {
      const response = await axios.post(
        "http://localhost:5008/api/trigger-automation",
        {
          invoiceId: invoice.id,
          invoiceAmount: invoice.amount,
          dueDate: invoice.dueDate,
          recipientEmail: invoice.clientEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      showMessage(response.data.message, "success");
    } catch (error) {
      console.error("Error triggering automation:", error);
      showMessage("Failed to trigger automation", "error");
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedInvoices = () => {
    if (!sortConfig.key) return invoices;

    return [...invoices].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredInvoices = getSortedInvoices().filter(invoice =>
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Overdue":
        return <FiAlertCircle className="status-icon overdue-icon" />;
      case "Paid":
        return <FiCheckCircle className="status-icon paid-icon" />;
      default:
        return <FiClock className="status-icon pending-icon" />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="invoice-page-container">
      <div className="header-section">
        <h1>Invoice Management</h1>
        <div className="header-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by client name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {message && (
        <div className={`notification ${messageType}`}>
          {messageType === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message}
        </div>
      )}

      <div className="invoices-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                Invoice ID
                {sortConfig.key === 'id' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('client')}>
                Client
                {sortConfig.key === 'client' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('amount')}>
                Amount
                {sortConfig.key === 'amount' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('dueDate')}>
                Due Date
                {sortConfig.key === 'dueDate' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('status')}>
                Status
                {sortConfig.key === 'status' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className={invoice.status.toLowerCase()}>
                <td>#{invoice.id.toString().padStart(4, '0')}</td>
                <td>
                  <div className="client-info">
                    <span className="client-name">{invoice.client}</span>
                    <span className="client-email">{invoice.clientEmail}</span>
                  </div>
                </td>
                <td className="amount">${invoice.amount.toLocaleString()}</td>
                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {getStatusIcon(invoice.status)}
                    {invoice.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleTriggerAutomation(invoice)}
                    className="trigger-button"
                    disabled={invoice.status === "Paid"}
                  >
                    <FiSend />
                    Send Reminder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicePage;
