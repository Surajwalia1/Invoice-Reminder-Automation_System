const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginWithGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    const email = payload['email'];

    res.status(200).json({ message: 'Login successful', userId, email });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Google Token' });
  }
};
