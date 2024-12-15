import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import InvoicePage from "./pages/InvoicePage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/invoices" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
};

export default App;
