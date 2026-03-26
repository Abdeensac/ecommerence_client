import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-container">
      <div className="landing-content animate-fade-in">
        <h1>
          Welcome to <span className="highlight">ShopNow</span>
        </h1>
        <p className="subtitle">
          A modern e-commerce experience with user login/signup, smooth navigation
          and animated UI.
        </p>
        <div className="landing-actions">
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>
            Get Started
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </div>
      <div className="landing-visual animate-slide-up">
        <div className="card">Dynamic cards load instantly with smart UI effects.</div>
      </div>
    </section>
  );
};

export default LandingPage;
