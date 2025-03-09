import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.scss";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Re-use the auth login endpoint
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials, {
        withCredentials: true,
      });
      if (res.data.isAdmin) {
        // Optionally store a token locally if needed
        localStorage.setItem("adminToken", "admin-token");
        navigate("/admin/dashboard");
      } else {
        setError("Not an admin user!");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
