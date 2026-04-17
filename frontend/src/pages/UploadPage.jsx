import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadRoom from "../components/UploadRoom";
import Result from "../components/Result";

export default function UploadPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <div className="page-container">
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <span className="badge">AI Powered</span>
          <h1>Reimagine Every Room, Instantly</h1>
          <p>Snap. Upload. Transform. Your dream interior in seconds</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        
        {/* Upload Card */}
        <div className="card upload-card">
          <div className="card-header">
            <h2>Upload & Design</h2>
            <p>Choose your room image and style preference</p>
          </div>
          <div className="card-body">
            <UploadRoom
              setResult={setResult}
              setLoading={setLoading}
              setError={setError}
              loading={loading}
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="card result-card">
          <div className="card-header">
            <h2>Your Design</h2>
            <p>AI-generated interior transformation</p>
          </div>
          <div className="card-body">
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Creating your design...</p>
              </div>
            )}
            
            {error && !loading && (
              <div className="error-state">
                <p>{typeof error.message === 'string' ? error.message : JSON.stringify(error.message)}</p>
              </div>
            )}
            
            {!loading && !error && result && <Result result={result} />}
            
            {!loading && !error && !result && (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15l-5-5L5 21" strokeWidth="2"/>
                </svg>
                <p>Upload an image to see your design</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
