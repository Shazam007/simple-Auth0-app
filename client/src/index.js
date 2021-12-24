import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="auth0shazam007.us.auth0.com"
      clientId="1lbHVIlSJRrLJZWibQcBSRqVaZlp2QZV"
      redirectUri={window.location.origin}
      audience="http://localhost:4000/protected"
      scope="read:current_user update:current_user_metadata"
      // audience="http://localhost:4000/protected"
      // scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
