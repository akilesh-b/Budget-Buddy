import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-page center">
      <div className="auth-card">
        <h1>Create account</h1>
        <form onSubmit={submit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password (6+ chars)" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="btn">Register</button>
        </form>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  );
}
