import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchTransactions(page);
  }, [page]);

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/transactions/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const fetchTransactions = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/transactions?page=${pageNum}&size=10&sort=id,desc`
      );
      setTransactions(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load transactions", err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeClass = (type) => {
    if (type === "CASH_OUT" || type === "TRANSFER") return "type-risk";
    return "type-normal";
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Transaction Overview</h1>
            <p className="subtitle">Real-time monitoring of banking transactions</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">TOTAL TRANSACTIONS</div>
            <div className="stat-value">
              {stats ? stats.totalCount.toLocaleString() : "—"}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">TOTAL VOLUME</div>
            <div className="stat-value">
              {stats ? formatAmount(stats.totalAmount) : "—"}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">CASH-OUT TRANSACTIONS</div>
            <div className="stat-value risk">
              {stats?.typeBreakdown?.CASH_OUT?.toLocaleString() ?? "—"}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">TRANSFER TRANSACTIONS</div>
            <div className="stat-value risk">
              {stats?.typeBreakdown?.TRANSFER?.toLocaleString() ?? "—"}
            </div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h2>Recent Transactions</h2>
          </div>

          {loading ? (
            <div className="table-loading">Loading transactions...</div>
          ) : (
            <>
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TYPE</th>
                    <th>AMOUNT</th>
                    <th>SENDER</th>
                    <th>RECEIVER</th>
                    <th>TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id}>
                      <td className="mono">#{txn.id}</td>
                      <td>
                        <span className={`type-badge ${getTypeClass(txn.type)}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="mono">{formatAmount(txn.amount)}</td>
                      <td className="mono">{txn.senderAccount}</td>
                      <td className="mono">{txn.receiverAccount}</td>
                      <td className="mono muted">
                        {new Date(txn.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Previous
                </button>
                <span className="page-info">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;