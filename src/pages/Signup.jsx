import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const handleSignup = async () => {
    if (!username || !phone || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Step 1: Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
          phone: phone,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // Step 2: Insert extra data into profiles table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        username: username,
        phone: phone,
        email: email,
      },
    ]);

    if (profileError) {
      alert(profileError.message);
    } else {
      alert("Signup successful");
      navigate("/login", { state: { from: location.state?.from } });
    }
  };

  return (
    <div className="container">
      <div className="logo-signup">Signup</div>
      <div className="subtitle">Create your account</div>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />

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

      <button onClick={handleSignup}>Sign Up</button>

      <p>
        Already have an account?{" "}
        <Link to="/login" state={{ from: location.state?.from }}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
