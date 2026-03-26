import React, { useState } from "react";

// ─── Inline styles (no external CSS needed) ───────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "#faf8f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #f0ece4",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
  logo: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: "1.75rem",
    letterSpacing: "-0.5px",
  },
  logoSpan: { color: "#c8864a" },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 0.25rem",
    fontFamily: "Georgia, serif",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#888",
    marginBottom: "1.75rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    marginBottom: "1.1rem",
  },
  label: {
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#444",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "0.65rem 0.9rem",
    border: "1px solid #e0dbd4",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    background: "#fff",
    outline: "none",
    color: "#1a1a1a",
    transition: "border-color 0.2s",
    width: "100%",
  },
  inputFocus: {
    borderColor: "#c8864a",
    boxShadow: "0 0 0 3px rgba(200,134,74,0.12)",
  },
  btnPrimary: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.6rem",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "0.5rem",
    transition: "background 0.2s",
    letterSpacing: "0.01em",
  },
  btnDisabled: { opacity: 0.55, cursor: "not-allowed" },
  alertError: {
    background: "#fef2f2",
    color: "#c0392b",
    border: "1px solid #fecaca",
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    fontSize: "0.88rem",
    marginBottom: "1rem",
  },
  alertSuccess: {
    background: "#f0fdf4",
    color: "#2e7d32",
    border: "1px solid #bbf7d0",
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    fontSize: "0.88rem",
    marginBottom: "1rem",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    margin: "1.25rem 0",
    color: "#ccc",
    fontSize: "0.8rem",
  },
  dividerLine: { flex: 1, height: "1px", background: "#f0ece4" },
  demoBox: {
    background: "#faf8f5",
    border: "1px solid #f0ece4",
    borderRadius: "8px",
    padding: "0.7rem 1rem",
    fontSize: "0.82rem",
    color: "#666",
    marginTop: "1.25rem",
    lineHeight: "1.6",
  },
  switchText: {
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#888",
    marginTop: "1.25rem",
  },
  link: { color: "#c8864a", fontWeight: "600", cursor: "pointer", textDecoration: "none" },
  showPasswordBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "0.8rem",
    padding: "0",
    alignSelf: "flex-end",
    marginTop: "-0.25rem",
    fontFamily: "inherit",
  },
  passwordWrapper: { position: "relative" },
  eyeBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "1rem",
    padding: "0",
    lineHeight: 1,
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic client-side validation
    if (!form.email.includes("@")) {
      return setError("Please enter a valid email address.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);

    // Simulate API call — replace with your real loginUser() service call
    try {
      await new Promise((res) => setTimeout(res, 1200)); // fake network delay

      // ── Replace below with real API call ──────────────────────────────────
      // const data = await loginUser(form.email, form.password);
      // login(data.user, data.token);
      // navigate('/products');
      // ─────────────────────────────────────────────────────────────────────

      if (form.email === "admin@shop.com" && form.password === "admin123") {
        setSuccess("Login successful! Redirecting...");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    ...(focusedField === field ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logo}>
          Shop<span style={styles.logoSpan}>Now</span>
        </div>

        {/* Heading */}
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to your account to continue</p>

        {/* Alerts */}
        {error && <div style={styles.alertError}>⚠ {error}</div>}
        {success && <div style={styles.alertSuccess}>✓ {success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle("email")}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{ ...getInputStyle("password"), paddingRight: "2.5rem" }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              ...styles.btnPrimary,
              ...(loading ? styles.btnDisabled : {}),
              background: loading ? "#555" : "#1a1a1a",
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = "#c8864a";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = "#1a1a1a";
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span>or</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Demo credentials */}
        <div style={styles.demoBox}>
          <strong style={{ color: "#444" }}>Demo credentials</strong>
          <br />
          Email: <code>admin@shop.com</code>
          <br />
          Password: <code>admin123</code>
        </div>

        {/* Switch to register */}
        <p style={styles.switchText}>
          Don't have an account?{" "}
          <a href="/register" style={styles.link}>
            Create one →
          </a>
        </p>
      </div>
    </div>
  );
}
