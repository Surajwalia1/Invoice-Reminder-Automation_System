const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();
const PORT = 5008; // Updated port number

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow requests from frontend
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Zapier webhook URL (Replace with your actual webhook URL)
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/21017940/2sg5d41/";

// Google OAuth configuration
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "145235494549-9t5nj618h0nc1hgqalodr8nhhpckgjio.apps.googleusercontent.com", // Your Google Client ID
      clientSecret: "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", // Your Google Client Secret
      callbackURL: "http://localhost:5008/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Token Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, "your-jwt-secret", (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
};

// Route to authenticate with Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ user }, "your-jwt-secret", { expiresIn: "1h" });
    res.redirect(`http://localhost:5173/invoices?token=${token}`); // Redirect with token
  }
);

// Route to fetch invoices (protected)
app.get("/api/invoices", authenticateToken, (req, res) => {
  const invoices = [
    { id: 1, client: "Abhay", clientEmail: "asmrajpura@gmail.com", amount: 500, dueDate: "2024-12-20", status: "Pending" },
    { id: 2, client: "Rohit", clientEmail: "janesmith@example.com", amount: 750, dueDate: "2024-12-18", status: "Pending" },
    { id: 3, client: "Nihar", clientEmail: "acmecorp@example.com", amount: 1200, dueDate: "2024-12-15", status: "Overdue" },
    { id: 4, client: "Suraj", clientEmail: "betainc@example.com", amount: 900, dueDate: "2024-12-22", status: "Pending" },
  ];
  res.json(invoices);
});

// Trigger Automation route to call Zapier webhook
app.post('/api/trigger-automation', authenticateToken, async (req, res) => {
    try {
        const { invoiceId, invoiceAmount, dueDate, recipientEmail } = req.body;

        // Send data to Zapier Webhook
        const zapierResponse = await axios.post(ZAPIER_WEBHOOK_URL, {
            invoiceId,
            invoiceAmount,
            dueDate,
            recipientEmail,
        });

        console.log('Zapier Automation Triggered:', zapierResponse.data);
        res.status(200).json({ message: 'Automation triggered successfully!' });
    } catch (error) {
        console.error('Error triggering Zapier automation:', error.message);
        res.status(500).json({ message: 'Failed to trigger automation', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
