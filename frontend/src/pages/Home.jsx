import { Link, useNavigate } from "react-router-dom";

const highlights = [
  {
    title: "Visual Generator",
    detail: "Upload your room and get styled concepts in a cinematic before/after preview.",
  },
  {
    title: "Style Library",
    detail: "Switch between modern, luxury, scandi, and custom looks with one click.",
  },
  {
    title: "Fast Workflow",
    detail: "Go from idea to shareable design concept in a few guided steps.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleLaunchStudio = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/studio");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="home-unique-page">
      <section className="home-unique-hero">
        <div className="home-hero-copy">
          <p className="home-kicker">✨ AI-POWERED INTERIOR DESIGN</p>

          <h1>Transform Spaces Into Stunning Realities</h1>

          <p>
            Reimagine any room with AI-driven design magic. Choose from luxury styles,
            get instant visualizations, and bring your dream space to life effortlessly.
          </p>

          <div className="home-hero-actions">
            <a className="home-cta" href="#" onClick={handleLaunchStudio}>
              Launch Studio
            </a>

            <Link className="home-ghost" to="/login">
              Login
            </Link>

            <Link className="home-ghost" to="/register">
              Register
            </Link>
          </div>
        </div>

        {/* HERO CARDS */}
        <aside className="home-hero-art" aria-hidden="true">

          <div className="art-card art-card-bottom"></div>

          <div className="art-card art-card-top"></div>

          <div className="art-card art-card-main">
            <p>Concept Ready</p>
            <h3>Warm Minimal Living Room</h3>
          </div>

        </aside>
      </section>

      <section className="home-highlights">
        {highlights.map((item) => (
          <article key={item.title} className="highlight-card">
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}