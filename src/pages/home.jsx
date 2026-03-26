import React, { useState, useEffect, useRef } from "react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const FEATURED_PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 79.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 2, name: "Running Shoes Pro",   price: 59.99, category: "Footwear",    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 3, name: "Leather Watch",       price: 129.99,category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 4, name: "Organic Cotton Tee",  price: 24.99, category: "Clothing",    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: 5, name: "Mechanical Keyboard", price: 89.99, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
  { id: 6, name: "Steel Water Bottle",  price: 19.99, category: "Lifestyle",   image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80" },
  { id: 7, name: "Yoga Mat Premium",    price: 34.99, category: "Sports",      image: "https://images.unsplash.com/photo-1601925228064-5b5c1b4b1a4a?w=400&q=80" },
  { id: 8, name: "Bluetooth Speaker",   price: 49.99, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
];

const CATEGORIES = ["Electronics","Clothing","Footwear","Accessories","Home","Sports","Lifestyle"];

const PERKS = [
  { icon: "✦", title: "Free shipping",  desc: "On orders over $50" },
  { icon: "◈", title: "Secure payment", desc: "256-bit encryption" },
  { icon: "↺", title: "Easy returns",   desc: "30-day policy" },
  { icon: "◎", title: "24/7 support",   desc: "Always here for you" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  root: { fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#faf8f5", minHeight: "100vh", color: "#1a1a1a" },

  /* navbar */
  nav: { background: "#fff", borderBottom: "1px solid #f0ece4", padding: "0 2rem", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 200 },
  navLogo: { fontFamily: "Georgia,serif", fontSize: "1.45rem", fontWeight: 700, color: "#1a1a1a", textDecoration: "none", letterSpacing: "-0.5px" },
  navLinks: { display: "flex", alignItems: "center", gap: "1.5rem" },
  navLink: { fontSize: "0.88rem", fontWeight: 500, color: "#555", textDecoration: "none", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit" },
  navCta: { background: "#1a1a1a", color: "#fff", border: "none", padding: "0.42rem 1.1rem", borderRadius: 7, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },

  /* hero */
  heroWrap: { maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem", display: "flex", alignItems: "center", gap: "3.5rem" },
  heroLeft: { flex: 1 },
  heroTag: { fontSize: "0.75rem", fontWeight: 700, color: "#c8864a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" },
  heroTitle: { fontFamily: "Georgia,serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.18, marginBottom: "1rem", color: "#1a1a1a" },
  heroAccent: { color: "#c8864a" },
  heroSub: { fontSize: "1rem", color: "#777", lineHeight: 1.75, maxWidth: 420, marginBottom: "2rem" },
  heroActions: { display: "flex", gap: "0.85rem", flexWrap: "wrap" },
  btnDark: { background: "#1a1a1a", color: "#fff", border: "none", padding: "0.72rem 1.6rem", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background .2s" },
  btnGhost: { background: "transparent", color: "#1a1a1a", border: "1px solid #ccc", padding: "0.7rem 1.5rem", borderRadius: 8, fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit", transition: "all .2s" },
  heroRight: { flex: "0 0 440px" },
  heroImg: { width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block" },

  /* stats strip */
  statsStrip: { background: "#1a1a1a", color: "#fff" },
  statsInner: { maxWidth: 1200, margin: "0 auto", padding: "1.25rem 2rem", display: "flex", justifyContent: "space-around", gap: "1rem", flexWrap: "wrap" },
  stat: { textAlign: "center", padding: "0.5rem 1rem" },
  statNum: { fontFamily: "Georgia,serif", fontSize: "1.6rem", fontWeight: 700, color: "#c8864a" },
  statLabel: { fontSize: "0.78rem", color: "#aaa", marginTop: 2 },

  /* section */
  section: { maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem" },
  sectionHead: { marginBottom: "1.5rem" },
  sectionTitle: { fontFamily: "Georgia,serif", fontSize: "1.7rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.3rem" },
  sectionSub: { fontSize: "0.9rem", color: "#999" },

  /* categories */
  chips: { display: "flex", flexWrap: "wrap", gap: "0.6rem" },
  chip: { background: "#fff", border: "1px solid #e8e2da", color: "#555", padding: "0.4rem 1.1rem", borderRadius: 99, fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all .2s", fontFamily: "inherit" },

  /* grid */
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1.2rem" },

  /* product card */
  card: { background: "#fff", borderRadius: 12, border: "1px solid #f0ece4", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform .2s,box-shadow .2s", cursor: "pointer" },
  cardImg: { width: "100%", height: 200, objectFit: "cover", display: "block" },
  cardBadge: { position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.92)", color: "#c8864a", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "3px 9px", borderRadius: 99 },
  cardImgWrap: { position: "relative" },
  cardBody: { padding: "0.9rem 1rem 1rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.35rem" },
  cardTitle: { fontSize: "0.92rem", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" },
  cardPrice: { fontFamily: "Georgia,serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a1a" },
  btnAddCart: { background: "#1a1a1a", color: "#fff", border: "none", padding: "0.38rem 0.85rem", borderRadius: 6, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background .2s" },

  /* perks */
  perksWrap: { background: "#1a1a1a" },
  perksInner: { maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2rem" },
  perk: { textAlign: "center", padding: "1rem" },
  perkIcon: { fontSize: "1.4rem", color: "#c8864a", marginBottom: "0.75rem", display: "block" },
  perkTitle: { fontFamily: "Georgia,serif", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" },
  perkDesc: { fontSize: "0.82rem", color: "#888" },

  /* newsletter */
  nlWrap: { background: "#fff", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4" },
  nlInner: { maxWidth: 560, margin: "0 auto", padding: "3.5rem 2rem", textAlign: "center" },
  nlTitle: { fontFamily: "Georgia,serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" },
  nlSub: { color: "#888", fontSize: "0.9rem", marginBottom: "1.5rem" },
  nlRow: { display: "flex", gap: "0.6rem" },
  nlInput: { flex: 1, padding: "0.65rem 1rem", border: "1px solid #e0dbd4", borderRadius: 8, fontSize: "0.9rem", fontFamily: "inherit", outline: "none" },

  /* footer */
  footer: { background: "#111", color: "#888", padding: "1.5rem 2rem", textAlign: "center", fontSize: "0.8rem" },

  /* ── OVERLAY ── */
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  modal: { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 440, padding: "2.4rem 2rem 2rem", position: "relative", maxHeight: "90vh", overflowY: "auto" },
  modalClose: { position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "#aaa", lineHeight: 1 },
  modalTitle: { fontFamily: "Georgia,serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem", color: "#1a1a1a" },
  modalSub: { fontSize: "0.88rem", color: "#999", marginBottom: "1.6rem" },
  fGroup: { marginBottom: "1rem" },
  fLabel: { display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#444", marginBottom: "0.35rem", letterSpacing: "0.02em" },
  fInput: { width: "100%", padding: "0.62rem 0.9rem", border: "1px solid #e0dbd4", borderRadius: 8, fontSize: "0.93rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: "#1a1a1a" },
  fInputFocus: { borderColor: "#c8864a", boxShadow: "0 0 0 3px rgba(200,134,74,0.13)" },
  alertErr: { background: "#fef2f2", color: "#c0392b", border: "1px solid #fecaca", padding: "0.65rem 0.9rem", borderRadius: 8, fontSize: "0.85rem", marginBottom: "1rem" },
  alertOk:  { background: "#f0fdf4", color: "#2e7d32", border: "1px solid #bbf7d0", padding: "0.65rem 0.9rem", borderRadius: 8, fontSize: "0.85rem", marginBottom: "1rem" },
  switchRow: { textAlign: "center", fontSize: "0.85rem", color: "#888", marginTop: "1.2rem" },
  switchLink: { color: "#c8864a", fontWeight: 600, cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", fontSize: "inherit" },
  pwWrap: { position: "relative" },
  pwEye: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: "1rem", padding: 0 },
};

// ─── Signup Modal ─────────────────────────────────────────────────────────────
function SignupModal({ onClose, onSwitchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [focused, setFocused] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const overlayRef = useRef();

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const inputStyle = (f) => ({
    ...S.fInput,
    ...(focused === f ? S.fInputFocus : {}),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Please enter your full name.");
    if (!form.email.includes("@")) return setError("Enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      // Simulate API — replace with: await registerUser(form.name, form.email, form.password)
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(`Welcome, ${form.name.split(" ")[0]}! Account created.`);
      setTimeout(onClose, 1800);
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.overlay} ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose()}>
      <div style={S.modal}>
        <button style={S.modalClose} onClick={onClose} aria-label="Close">✕</button>

        <div style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.2rem" }}>
          Shop<span style={{ color: "#c8864a" }}>Now</span>
        </div>

        <h2 style={S.modalTitle}>Create your account</h2>
        <p style={S.modalSub}>Join thousands of happy shoppers</p>

        {error && <div style={S.alertErr}>⚠ {error}</div>}
        {success && <div style={S.alertOk}>✓ {success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div style={S.fGroup}>
            <label style={S.fLabel} htmlFor="su-name">Full name</label>
            <input id="su-name" name="name" type="text" placeholder="Jane Doe"
              value={form.name} onChange={change}
              onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
              style={inputStyle("name")} autoComplete="name" required />
          </div>

          <div style={S.fGroup}>
            <label style={S.fLabel} htmlFor="su-email">Email address</label>
            <input id="su-email" name="email" type="email" placeholder="jane@example.com"
              value={form.email} onChange={change}
              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              style={inputStyle("email")} autoComplete="email" required />
          </div>

          <div style={S.fGroup}>
            <label style={S.fLabel} htmlFor="su-password">Password</label>
            <div style={S.pwWrap}>
              <input id="su-password" name="password" type={showPw ? "text" : "password"}
                placeholder="Min 6 characters" value={form.password} onChange={change}
                onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                style={{ ...inputStyle("password"), paddingRight: "2.5rem" }}
                autoComplete="new-password" required />
              <button type="button" style={S.pwEye} onClick={() => setShowPw((s) => !s)}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="submit"
            style={{ ...S.btnDark, width: "100%", marginTop: "0.25rem", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            disabled={loading}
            onMouseEnter={(e) => { if (!loading) e.target.style.background = "#c8864a"; }}
            onMouseLeave={(e) => { if (!loading) e.target.style.background = "#1a1a1a"; }}>
            {loading ? "Creating account…" : "Create account →"}
          </button>
        </form>

        <p style={S.switchRow}>
          Already have an account?{" "}
          <button style={S.switchLink} onClick={onSwitchToLogin}>Sign in</button>
        </p>
      </div>
    </div>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onClose, onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const overlayRef = useRef();

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const inputStyle = (f) => ({
    ...S.fInput,
    ...(focused === f ? S.fInputFocus : {}),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1100));
      if (form.email === "admin@shop.com" && form.password === "admin123") {
        setSuccess("Welcome back! Redirecting…");
        setTimeout(onClose, 1600);
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.overlay} ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose()}>
      <div style={S.modal}>
        <button style={S.modalClose} onClick={onClose} aria-label="Close">✕</button>

        <div style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.2rem" }}>
          Shop<span style={{ color: "#c8864a" }}>Now</span>
        </div>

        <h2 style={S.modalTitle}>Welcome back</h2>
        <p style={S.modalSub}>Sign in to your account</p>

        {error && <div style={S.alertErr}>⚠ {error}</div>}
        {success && <div style={S.alertOk}>✓ {success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div style={S.fGroup}>
            <label style={S.fLabel} htmlFor="li-email">Email address</label>
            <input id="li-email" name="email" type="email" placeholder="you@example.com"
              value={form.email} onChange={change}
              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              style={inputStyle("email")} autoComplete="email" required />
          </div>

          <div style={S.fGroup}>
            <label style={S.fLabel} htmlFor="li-password">Password</label>
            <div style={S.pwWrap}>
              <input id="li-password" name="password" type={showPw ? "text" : "password"}
                placeholder="Your password" value={form.password} onChange={change}
                onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                style={{ ...inputStyle("password"), paddingRight: "2.5rem" }}
                autoComplete="current-password" required />
              <button type="button" style={S.pwEye} onClick={() => setShowPw((s) => !s)}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Demo hint */}
          <div style={{ background: "#faf8f5", border: "1px solid #f0ece4", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.78rem", color: "#888", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong style={{ color: "#555" }}>Demo:</strong> admin@shop.com / admin123
          </div>

          <button type="submit"
            style={{ ...S.btnDark, width: "100%", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            disabled={loading}
            onMouseEnter={(e) => { if (!loading) e.target.style.background = "#c8864a"; }}
            onMouseLeave={(e) => { if (!loading) e.target.style.background = "#1a1a1a"; }}>
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <p style={S.switchRow}>
          Don't have an account?{" "}
          <button style={S.switchLink} onClick={onSwitchToSignup}>Create one</button>
        </p>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onCartClick }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onCartClick();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{ ...S.card, transform: hover ? "translateY(-4px)" : "none", boxShadow: hover ? "0 12px 32px rgba(0,0,0,0.1)" : "none" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={S.cardImgWrap}>
        <img src={product.image} alt={product.name} style={S.cardImg} loading="lazy" />
        <span style={S.cardBadge}>{product.category}</span>
      </div>
      <div style={S.cardBody}>
        <div style={S.cardTitle}>{product.name}</div>
        <div style={S.cardFooter}>
          <span style={S.cardPrice}>${product.price.toFixed(2)}</span>
          <button
            style={{ ...S.btnAddCart, background: added ? "#2e7d32" : "#1a1a1a" }}
            onClick={handleAdd}
            onMouseEnter={(e) => { if (!added) e.target.style.background = "#c8864a"; }}
            onMouseLeave={(e) => { if (!added) e.target.style.background = added ? "#2e7d32" : "#1a1a1a"; }}
          >
            {added ? "✓ Added" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage() {
  const [modal, setModal] = useState(null); // null | "signup" | "login"
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [nlEmail, setNlEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);

  // Filter products by category
  const displayed = activeCategory === "All"
    ? FEATURED_PRODUCTS
    : FEATURED_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleCartClick = () => {
    setCartCount((c) => c + 1);
    // If not logged in, open signup
    // Replace with: if (!isLoggedIn) setModal("signup")
    // For demo: just increment
  };

  const handleNl = (e) => {
    e.preventDefault();
    if (nlEmail.includes("@")) setNlDone(true);
  };

  return (
    <div style={S.root}>

      {/* ── Navbar ── */}
      <nav style={S.nav}>
        <a href="/" style={S.navLogo}>
          Shop<span style={{ color: "#c8864a" }}>Now</span>
        </a>
        <div style={S.navLinks}>
          <a href="/products" style={S.navLink}>Products</a>
          <button style={S.navLink} onClick={() => setModal("login")}>Login</button>
          <button
            style={S.navCta}
            onClick={() => setModal("signup")}
            onMouseEnter={(e) => e.target.style.background = "#c8864a"}
            onMouseLeave={(e) => e.target.style.background = "#1a1a1a"}
          >
            Sign Up
          </button>
          {/* Cart badge */}
          <button style={{ ...S.navLink, position: "relative" }} onClick={() => setModal("login")}>
            Cart
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: -8, right: -10, background: "#c8864a", color: "#fff", fontSize: "0.62rem", fontWeight: 700, padding: "2px 5px", borderRadius: 99, minWidth: 16, textAlign: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={S.heroWrap}>
        <div style={S.heroLeft}>
          <p style={S.heroTag}>New Collection 2025</p>
          <h1 style={S.heroTitle}>
            Discover products<br />
            you'll <span style={S.heroAccent}>truly love</span>
          </h1>
          <p style={S.heroSub}>
            Curated picks across electronics, fashion, home &amp; more.
            Quality guaranteed, prices you'll appreciate.
          </p>
          <div style={S.heroActions}>
            <button
              style={S.btnDark}
              onMouseEnter={(e) => e.target.style.background = "#c8864a"}
              onMouseLeave={(e) => e.target.style.background = "#1a1a1a"}
              onClick={() => document.getElementById("products-section").scrollIntoView({ behavior: "smooth" })}
            >
              Shop now →
            </button>
            <button
              style={S.btnGhost}
              onMouseEnter={(e) => { e.target.style.borderColor = "#c8864a"; e.target.style.color = "#c8864a"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.color = "#1a1a1a"; }}
              onClick={() => setModal("signup")}
            >
              Create account
            </button>
          </div>
        </div>
        <div style={S.heroRight}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
            alt="Shopping"
            style={S.heroImg}
          />
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div style={S.statsStrip}>
        <div style={S.statsInner}>
          {[["12K+","Happy customers"],["200+","Products"],["50+","Brands"],["4.9★","Avg. rating"]].map(([n,l]) => (
            <div key={l} style={S.stat}>
              <div style={S.statNum}>{n}</div>
              <div style={S.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category chips ── */}
      <div style={S.section}>
        <div style={S.sectionHead}>
          <h2 style={S.sectionTitle}>Shop by category</h2>
          <p style={S.sectionSub}>Find exactly what you're looking for</p>
        </div>
        <div style={S.chips}>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              style={{
                ...S.chip,
                background: activeCategory === cat ? "#1a1a1a" : "#fff",
                color: activeCategory === cat ? "#fff" : "#555",
                borderColor: activeCategory === cat ? "#1a1a1a" : "#e8e2da",
              }}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={(e) => { if (activeCategory !== cat) { e.target.style.background = "#f0ece4"; } }}
              onMouseLeave={(e) => { if (activeCategory !== cat) { e.target.style.background = "#fff"; } }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Products grid ── */}
      <div style={{ ...S.section, paddingTop: 0 }} id="products-section">
        <div style={S.sectionHead}>
          <h2 style={S.sectionTitle}>Featured products</h2>
          <p style={S.sectionSub}>{displayed.length} items{activeCategory !== "All" ? ` in ${activeCategory}` : ""}</p>
        </div>
        <div style={S.grid}>
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} onCartClick={handleCartClick} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            style={S.btnGhost}
            onMouseEnter={(e) => { e.target.style.borderColor = "#c8864a"; e.target.style.color = "#c8864a"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.color = "#1a1a1a"; }}
          >
            View all products →
          </button>
        </div>
      </div>

      {/* ── Signup CTA banner ── */}
      <div style={{ background: "#c8864a", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
          Ready to start shopping?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          Create a free account and get 10% off your first order.
        </p>
        <button
          style={{ background: "#fff", color: "#c8864a", border: "none", padding: "0.75rem 2rem", borderRadius: 8, fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          onClick={() => setModal("signup")}
          onMouseEnter={(e) => e.target.style.opacity = "0.9"}
          onMouseLeave={(e) => e.target.style.opacity = "1"}
        >
          Create free account →
        </button>
      </div>

      {/* ── Perks ── */}
      <div style={S.perksWrap}>
        <div style={S.perksInner}>
          {PERKS.map((p) => (
            <div key={p.title} style={S.perk}>
              <span style={S.perkIcon}>{p.icon}</span>
              <div style={S.perkTitle}>{p.title}</div>
              <div style={S.perkDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div style={S.nlWrap}>
        <div style={S.nlInner}>
          <h2 style={S.nlTitle}>Stay in the loop</h2>
          <p style={S.nlSub}>Get new arrivals and exclusive deals delivered to your inbox.</p>
          {nlDone ? (
            <div style={{ ...S.alertOk, display: "inline-block" }}>✓ You're subscribed!</div>
          ) : (
            <form style={S.nlRow} onSubmit={handleNl}>
              <input
                style={S.nlInput}
                type="email"
                placeholder="your@email.com"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                style={S.btnDark}
                onMouseEnter={(e) => e.target.style.background = "#c8864a"}
                onMouseLeave={(e) => e.target.style.background = "#1a1a1a"}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={S.footer}>
        © 2025 ShopNow. All rights reserved. &nbsp;·&nbsp; Built with React &amp; Node.js
      </footer>

      {/* ── Modals (rendered last so they stack on top) ── */}
      {modal === "signup" && (
        <SignupModal
          onClose={() => setModal(null)}
          onSwitchToLogin={() => setModal("login")}
        />
      )}
      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitchToSignup={() => setModal("signup")}
        />
      )}
    </div>
  );
}