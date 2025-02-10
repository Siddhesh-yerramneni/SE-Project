import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const res = await login(formData);
      console.log("repsonse=>", res);
      alert(res.data.msg);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Log In</h2>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>Login</button>

          {/* Signup Link */}
          <p style={styles.text}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.link}>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  formContainer: {
    backgroundColor: "#FF4E50",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#ddd",
  },
  text: {
    textAlign: "center",
    marginTop: "15px",
    color: "#fff",
  },
  link: {
    color: "#fff",
    textDecoration: "underline",
  },
};


