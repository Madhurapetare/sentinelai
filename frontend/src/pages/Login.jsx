import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="brand-mark">
          <span className="brand-dot"></span>
          <span className="brand-name">SENTINELAI</span>
        </div>

        <div className="visual-copy">
          <h1>Financial crime investigation, made explainable.</h1>
          <p>
            Monitor transactions, score fraud risk in real time, and
            understand exactly why — with AI you can defend in an audit.
          </p>
        </div>

        <div className="visual-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE — SCORING ENGINE ACTIVE
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <h2>Investigator sign-in</h2>
          <p className="subtitle">Access your case queue and risk dashboard</p>

          <form onSubmit={handleLogin}>
            {error && <div className="error-banner">{error}</div>}

            <div className="field">
              <label>USERNAME</label>
              <input
                type="text"
                placeholder="e.g. j.investigator"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="field">
              <label>PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--accent)" }}>Register</Link>
         </p>
        </div>
      </div>
    </div>
  );
}

export default Login;