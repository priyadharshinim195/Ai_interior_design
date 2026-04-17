import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/login", form);
      const token =
        response?.data?.token || response?.data?.access_token || "";
      if (token) {
        localStorage.setItem("auth_token", token);
      }
      navigate("/studio");
    } catch (apiError) {
      setError(
        apiError?.response?.data?.detail ||
          "Login endpoint is not available yet in backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign In</h1>
        <p className="auth-subtitle">Continue to your interior design studio.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="control-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
          />

          <label className="control-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
