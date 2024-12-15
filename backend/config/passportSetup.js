const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

// Configure the Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Here, you would store user data in the database (mocked for now)
    const user = {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    };
    return done(null, user);
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});
