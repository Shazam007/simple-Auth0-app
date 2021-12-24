import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const {
    loginWithRedirect,
    loginWithPopup,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const callNormalRoute = async () => {
    const res = await axios.get("http://localhost:4000/normal");
    console.log(res.data);
  };

  const callProtectedRoute = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);

      const res = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <button
        className="button-40"
        role="button"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
      <h1>{isAuthenticated ? `Logged as ${user.name}` : "Login Please"}</h1>
      <button className="button-40" role="button" onClick={() => logout()}>
        Logout
      </button>

      <button
        className="button-40"
        role="button"
        onClick={() => callNormalRoute()}
      >
        Call Normal API
      </button>
      <button
        className="button-40"
        role="button"
        onClick={() => callProtectedRoute()}
      >
        Call Protected API
      </button>
    </div>
  );
}

export default App;
