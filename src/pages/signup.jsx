import React, { useState } from 'react';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || form.password.length < 6) {
      setMessage('Please complete all fields with valid values.');
      return;
    }
    setMessage('Account created successfully! Redirecting to login...');
    setTimeout(() => setMessage(''), 1500);
  };

  return (
    <section className="auth-page animate-fade-in">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start your shopping journey with ShopNow.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@shop.com" required />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="6+ characters" required />

          <button className="btn btn-primary" type="submit">Create Account</button>
        </form>

        {message && <div className="alert">{message}</div>}
      </div>
    </section>
  );
};

export default SignupPage;
