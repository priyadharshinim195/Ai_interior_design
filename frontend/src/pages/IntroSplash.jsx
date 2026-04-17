import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 3500;

export default function IntroSplash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/home", { replace: true });
    }, REDIRECT_DELAY);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="intro-splash-page">
      
      {/* Hero Card */}
      <div className="splash-card">
        <div className="splash-content">
          <span className="badge">AI Powered</span>
          <h1>AI Interior Designer</h1>
          <p>Transform your space with intelligent design</p>
          
          <div className="splash-features">
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Multiple Styles</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant Results</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>AI Powered</span>
            </div>
          </div>

          <div className="splash-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p>Preparing your design journey...</p>
          </div>

          <Link className="splash-skip" to="/home">
            Skip intro →
          </Link>
        </div>
      </div>

    </main>
  );
}
