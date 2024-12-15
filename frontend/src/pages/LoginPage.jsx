import React from "react";
import "./../styles/LoginPage.css";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5008/auth/google";
  };

  return (
    <div className="container">
      <h1>Welcome to Invoice Manager</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
