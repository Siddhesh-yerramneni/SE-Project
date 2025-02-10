import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      const res = await signup(formData);
      alert(res.data.msg);
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      setError(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h2 className="title">Sign Up</h2>
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={handleChange}
              value={formData.username}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  signupBox: {
    backgroundColor: "#fb7185",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
  },
  errorAlert: {
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: "0.5rem",
    borderRadius: "5px",
    textAlign: "center",
    marginBottom: "1rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontWeight: "600",
    color: "#000",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #cbd5e1",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s ease-in-out",
  },
  inputFocus: {
    borderColor: "#2563eb",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    padding: "0.75rem",
    borderRadius: "5px",
    fontWeight: "600",
    transition: "background-color 0.3s",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  submitBtnHover: {
    backgroundColor: "#e5e7eb",
  },
};
