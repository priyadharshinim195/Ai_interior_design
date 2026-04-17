import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (apiError) {
      setError(
        apiError?.response?.data?.detail ||
          "Register endpoint is not available yet in backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">CREATE ACCOUNT</p>
        <h1>Register</h1>
        <p className="auth-subtitle">Start creating AI interior concepts.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="control-label" htmlFor="register-name">
            Name
          </label>
          <input
            id="register-name"
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your full name"
          />

          <label className="control-label" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
          />

          <label className="control-label" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Create a password"
          />

          <label className="control-label" htmlFor="register-confirm-password">
            Confirm Password
          </label>
          <input
            id="register-confirm-password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            placeholder="Repeat password"
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
