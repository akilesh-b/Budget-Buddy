import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-page center">
      <div className="auth-card">
        <h1>Budget Buddy</h1>
        <p className="muted">Track your money. Stay in control.</p>
        <form onSubmit={submit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="btn">Login</button>
        </form>
        {err && <p className="error">{err}</p>}
        <p className="muted small">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
