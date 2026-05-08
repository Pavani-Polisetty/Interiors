import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";
import "../auth.css";
import "./login.css";

function Login() {
  const notification = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    if (!email || !password) {
      notification.warning("Please enter email and password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notification.error(error.message);
    } else {
      notification.success("Login successful!");
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <div className="logo-login">login to Book Service</div>
      <div className="subtitle">Welcome back</div>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        New user?{" "}
        <Link to="/signup" state={{ from: location.state?.from }}>
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
