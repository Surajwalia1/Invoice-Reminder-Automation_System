// Mock data for invoices
const invoices = [
  { id: 1, amount: "$500", dueDate: "2024-12-20", recipient: "John Doe" },
  { id: 2, amount: "$1200", dueDate: "2024-12-25", recipient: "Jane Smith" },
];

exports.getInvoices = (req, res) => {
  res.status(200).json({ invoices });
};

exports.triggerAutomation = (req, res) => {
  const { invoiceId } = req.body;

  // Placeholder for Zapier integration
  console.log(`Triggered automation for invoice: ${invoiceId}`);
  res.status(200).json({ message: `Automation triggered for invoice ${invoiceId}` });
};
  