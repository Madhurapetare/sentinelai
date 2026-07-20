import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "./Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Registration failed. Try a different username.");
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
          <h1>Join the investigation team.</h1>
          <p>
            Create your investigator account to start monitoring transactions
            and reviewing fraud risk scores.
          </p>
        </div>

        <div className="visual-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE — SCORING ENGINE ACTIVE
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <h2>Create account</h2>
          <p className="subtitle">Register as a new investigator</p>

          <form onSubmit={handleRegister}>
            {error && <div className="error-banner">{String(error)}</div>}

            <div className="field">
              <label>USERNAME</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="field">
              <label>PASSWORD</label>
              <input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
            Already have an account? <Link to="/login" style={{ color: "var(--accent)" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;