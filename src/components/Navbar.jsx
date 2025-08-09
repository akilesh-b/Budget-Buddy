import React, { useContext } from "react";
import { FiBell } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="app-title">Budget Buddy</h1>
      </div>
      <div className="navbar-right">
        <button className="icon-btn"><FiBell /></button>
        <div className="user-info">
          <span className="username">{user?.email?.split("@")[0]}</span>
          <button className="link" onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
}
