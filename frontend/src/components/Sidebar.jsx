import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username") || "Investigator";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "◆" },
    { label: "Transactions", path: "/dashboard", icon: "▤" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-dot"></span>
        <span className="brand-name">SENTINELAI</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
          <div className="user-name">{username}</div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;