import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ARUN_PHOTO = "/arun.jpg";
const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Experience", "Certifications", "Contact"];

// ⬇️ Get your free key at https://web3forms.com — paste it below
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

const SKILLS = [
  { name: "Java", icon: "☕", color: "#f89820" },
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "Flask", icon: "🌶", color: "#000000" },
  { name: "SQL", icon: "🗄", color: "#336791" },
  { name: "HTML", icon: "🌐", color: "#e34f26" },
  { name: "CSS", icon: "🎨", color: "#1572b6" },
  { name: "JavaScript", icon: "⚡", color: "#f7df1e" },
  { name: "Git", icon: "🔀", color: "#f05032" },
];

const PROJECTS = [
  {
    title: "TuneX",
    subtitle: "Role-Based Music Streaming Web App",
    desc: "A full-stack music streaming platform with role-based access control, AI-powered lyrics generation, and a responsive interface. Backend built with Flask, data managed with SQLite, and deployed on Render.",
    tags: ["HTML", "CSS", "JavaScript", "Flask", "SQLite", "Render"],
    features: ["Role-based access system", "AI-powered lyrics generation", "Flask REST backend", "Deployed on Render"],
    badge: null,
    badgeColor: null,
    demoLink: "https://tunex-music-streaming-app.onrender.com/",
    githubLink: "https://github.com/arun-mahendran/tunex-music-streaming-app",
    gradient: "from-violet-600 via-purple-600 to-pink-600",
    glowColor: "rgba(139,92,246,0.35)",
  },
  {
    title: "MediFlow",
    subtitle: "Hospital Queue Management System",
    desc: "A smart hospital queue system with AI-based queue status prediction, role-based dashboards for doctors and patients, built using Flask and SQLite for real-time queue management.",
    tags: ["HTML", "CSS", "JavaScript", "Flask", "SQLite"],
    features: ["AI-based queue prediction", "Role-based dashboards", "Real-time queue updates", "Flask backend"],
    badge: "Currently Building",
    badgeColor: "from-emerald-500 to-teal-500",
    demoLink: "#",
    githubLink: "#",
    gradient: "from-cyan-600 via-teal-500 to-emerald-600",
    glowColor: "rgba(20,184,166,0.35)",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Development Intern",
    company: "Deep Dive Technologies",
    period: "Dec 2025 – Jan 2026",
    desc: "Worked on both frontend and backend development, building responsive UIs and handling backend logic using Python and Flask.",
    gradient: "linear-gradient(to right, #8b5cf6, #9333ea)",
    icon: "💼",
  },
  {
    role: "Java Application Development Intern",
    company: "UNIQ Technologies",
    period: "Jun 2025 – Jul 2025",
    desc: "Developed Java applications with core OOP concepts, improved problem-solving and software design skills.",
    gradient: "linear-gradient(to right, #f59e0b, #f97316)",
    icon: "☕",
  },
];

const CERTS = [
  {
    title: "Java Programming",
    issuer: "NPTEL",
    badge: "Elite + Gold · 94%",
    gradient: "linear-gradient(to right, #eab308, #f59e0b)",
    icon: "🥇",
    link: "https://drive.google.com/file/d/1KmlDDrczNcqUkUA-WzDXy5CrooDHTvBu/view?usp=drive_link"
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    badge: "Elite + Silver · 75%",
    gradient: "linear-gradient(to right, #3b82f6, #06b6d4)",
    icon: "🥈",
    link: "https://drive.google.com/file/d/1iTiRJNLYGzKHfg4gm1_KpndW_W2Lq718/view?usp=drive_link"
  },
  {
    title: "Intro to Cloud Computing",
    issuer: "Coursera",
    badge: "Certified",
    gradient: "linear-gradient(to right, #0ea5e9, #2563eb)",
    icon: "☁️",
    link: "https://drive.google.com/file/d/1T1MgqoZ7_tdfHs1gvYdy9wNEXzJY_A4F/view?usp=drive_link"
  }
];

/* ───── Intersection Observer hook ───── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ───── Animated wrapper with stagger support ───── */
function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ───── Section title helper ───── */
function SectionHeader({ label, title, gradient }) {
  return (
    <div className="text-center">
      <span
        className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 mb-4"
        style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        {label}
      </span>
      <h2 className="text-4xl sm:text-5xl font-black text-white">{title}</h2>
      <div className="w-16 h-1 rounded-full mx-auto mt-5" style={{ background: gradient }}></div>
    </div>
  );
}

/* ═══════════════════ NAVBAR ═══════════════════ */
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <span
          className="text-xl font-black tracking-tight bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #a78bfa, #f472b6, #22d3ee)" }}
        >
          Arun Mahendran B
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === l
                  ? "bg-violet-600/30 text-violet-300"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-400 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all duration-300 ${menuOpen ? "opacity-0 scale-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === l
                  ? "bg-violet-600/30 text-violet-300"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Available for internships &amp; opportunities
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
            <span className="text-white">Hi, I&apos;m </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #a78bfa, #f472b6, #22d3ee)" }}
            >
              Arun
            </span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-4">Full-Stack Developer</h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0">
            Building real-world web applications with Java, Flask, and modern technologies. Passionate about end-to-end
            development — from pixel-perfect frontends to robust backends.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105 active:scale-100"
            >
              View Projects
            </button>
            <a
              href="/resume.pdf"
              download="Arun_Mahendran_Resume.pdf"
              className="px-8 py-3.5 rounded-2xl font-semibold text-gray-300 border border-white/20 hover:border-violet-500/50 hover:text-white hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-100"
            >
              Download Resume ↓
            </a>
          </div>

          <div className="flex gap-4 mt-8 justify-center lg:justify-start">
            {[
              { Icon: FaLinkedin, href: "https://linkedin.com/in/b-arun-mahendran", hover: "hover:border-blue-500/50 hover:bg-blue-500/10" },
              { Icon: FaGithub, href: "https://github.com/arun-mahendran", hover: "hover:border-violet-500/50 hover:bg-violet-500/10" },
              { Icon: MdEmail, href: "mailto:b.arunmahendran@gmail.com", hover: "hover:border-pink-500/50 hover:bg-pink-500/10" },
            ].map(({ Icon, href, hover }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 ${hover}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40 scale-110 animate-spin"
            style={{
              backgroundImage: "linear-gradient(to right, #8b5cf6, #ec4899, #06b6d4)",
              animationDuration: "8s",
            }}
          />
          <div
            className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-1 shadow-2xl"
            style={{
              backgroundImage: "linear-gradient(to bottom right, #7c3aed, #9333ea, #be185d)",
              boxShadow: "0 25px 60px rgba(139,92,246,0.4)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
              <img src={ARUN_PHOTO} alt="Arun Mahendran" className="w-full h-full object-cover object-center" />
            </div>
          </div>

          {/* Floating badges */}
          <div
            className="absolute -top-4 -right-4 bg-gray-900 border border-violet-500/40 rounded-2xl px-3 py-2 text-xs font-semibold text-violet-300 shadow-lg animate-bounce"
            style={{ animationDuration: "3s", boxShadow: "0 8px 24px rgba(139,92,246,0.2)" }}
          >
            🎓 CGPA 8.4
          </div>
          <div
            className="absolute -bottom-4 -left-4 bg-gray-900 border border-pink-500/40 rounded-2xl px-3 py-2 text-xs font-semibold text-pink-300 shadow-lg animate-bounce"
            style={{ animationDuration: "3s", animationDelay: "1.5s", boxShadow: "0 8px 24px rgba(236,72,153,0.2)" }}
          >
            ⚡ 2 Projects
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════ ABOUT ═══════════════════ */
function About() {
  const stats = [
    { label: "CGPA", value: "8.4", icon: "🎓", color: "#8b5cf6" },
    { label: "Projects", value: "2+", icon: "🚀", color: "#ec4899" },
    { label: "Internships", value: "2", icon: "💼", color: "#06b6d4" },
    { label: "Certifications", value: "3", icon: "🏅", color: "#f59e0b" },
  ];

  return (
    <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="About Me" title="The Developer Behind the Code" gradient="linear-gradient(to right, #22d3ee, #3b82f6)" />
        </AnimSection>

        <div className="grid md:grid-cols-2 gap-12 mt-16 items-center">
          <AnimSection delay={100}>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I&apos;m a pre-final year Computer Science Engineering student at P.S.R.R College of Engineering
              (2023–2027), with a CGPA of{" "}
              <span className="text-cyan-400 font-semibold">8.4</span>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              I have a strong foundation in Java, Python, and Flask, and I focus on building end-to-end web
              applications — from designing intuitive user interfaces to developing scalable backend systems with
              real-world utility.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My projects involve AI integration, role-based architectures, and production deployments, reflecting
              my drive to go beyond academics and build things that actually work.
            </p>
          </AnimSection>

          <AnimSection delay={250}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="relative p-6 rounded-2xl bg-gray-900 border border-white/5 transition-all duration-300 group overflow-hidden cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.color + "66";
                    e.currentTarget.style.boxShadow = `0 8px 32px ${s.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at center, ${s.color}15, transparent 70%)` }}
                  />
                  <div className="text-3xl mb-2 relative z-10">{s.icon}</div>
                  <div className="text-3xl font-black text-white relative z-10">{s.value}</div>
                  <div className="text-sm text-gray-500 font-medium relative z-10">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROJECTS ═══════════════════ */
function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Projects" title="What I've Built" gradient="linear-gradient(to right, #a78bfa, #f472b6)" />
        </AnimSection>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {PROJECTS.map((p, i) => (
            <AnimSection key={p.title} delay={i * 150}>
              <div
                className="group relative h-full rounded-3xl bg-gray-950 border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${p.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.gradient}`} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className={`text-2xl font-black bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent`}>
                          {p.title}
                        </h3>
                        {p.badge && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${p.badgeColor} text-white`}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm font-medium">{p.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${p.gradient} flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={p.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${p.gradient} text-white hover:opacity-90 hover:scale-[1.03] active:scale-100 transition-all duration-200`}
                    >
                      Live Demo ↗
                    </a>
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 hover:scale-[1.03] active:scale-100 transition-all duration-200"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ SKILLS ═══════════════════ */
function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Skills" title="My Tech Stack" gradient="linear-gradient(to right, #f472b6, #f97316)" />
        </AnimSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-16">
          {SKILLS.map((s, i) => (
            <AnimSection key={s.name} delay={i * 70}>
              <div
                className="group relative p-6 rounded-2xl bg-gray-900 border border-white/5 transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden cursor-default"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.color + "44";
                  e.currentTarget.style.boxShadow = `0 10px 40px ${s.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${s.color}15, transparent 70%)` }}
                />
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">{s.icon}</div>
                <div className="font-bold text-gray-200 group-hover:text-white transition-colors duration-200 relative z-10 text-sm">
                  {s.name}
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ EXPERIENCE ═══════════════════ */
function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Experience" title="Where I've Worked" gradient="linear-gradient(to right, #fbbf24, #f97316)" />
        </AnimSection>

        <div className="space-y-6 mt-16 max-w-3xl mx-auto">
          {EXPERIENCE.map((e, i) => (
            <AnimSection key={e.role} delay={i * 150}>
              <div className="relative pl-8 group">
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-6 w-3 h-3 rounded-full ring-4 ring-gray-900 group-hover:scale-125 transition-transform duration-300"
                  style={{ background: e.gradient }}
                />
                {/* Card */}
                <div
                  className="bg-gray-950 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  onMouseEnter={(el) => {
                    el.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    el.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(el) => {
                    el.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    el.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{e.icon}</span>
                        <h3 className="font-bold text-white text-lg">{e.role}</h3>
                      </div>
                      <p className="text-sm font-semibold bg-clip-text text-transparent" style={{ backgroundImage: e.gradient }}>
                        {e.company}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-400">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CERTIFICATIONS ═══════════════════ */
function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Certifications" title="Credentials & Achievements" gradient="linear-gradient(to right, #4ade80, #14b8a6)" />
        </AnimSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 max-w-4xl mx-auto">
          {CERTS.map((c, i) => (
            <AnimSection key={c.title} delay={i * 120}>
              <div className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-green-400/20 via-teal-400/10 to-transparent hover:from-green-400/40 hover:via-teal-400/20 transition-all duration-500">
  
                <div className="h-full w-full rounded-2xl bg-gray-900 p-6 text-center border border-white/5 group-hover:border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition duration-300">
                    {c.icon}
                  </div>

                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                    style={{ backgroundImage: c.gradient }}
                  >
                    {c.badge}
                  </div>

                  <h3 className="font-semibold text-white text-sm mb-1">
                    {c.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-4">
                    {c.issuer}
                  </p>

                  {/* 🔥 NEW BUTTON */}
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-4 py-2 rounded-lg 
                    border border-white/10 text-gray-300 
                    bg-white/5 backdrop-blur-sm 
                    hover:text-white hover:border-green-400/40 hover:bg-green-400/10 
                    transition-all duration-300 hover:scale-105 active:scale-100"
                  >
                    View Credential
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>

                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

<div className="text-center mt-24 mb-12 max-w-2xl mx-auto">
  <p className="text-lg sm:text-xl font-semibold leading-relaxed bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
    “Still learning. Already building. Ready to contribute.”
  </p>
</div>

/* ═══════════════════ CONTACT ═══════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactLinks = [
    { icon: "📧", label: "Email", value: "b.arunmahendran@gmail.com", href: "mailto:b.arunmahendran@gmail.com", color: "#ec4899" },
    { icon: "💼", label: "LinkedIn", value: "b-arun-mahendran", href: "https://linkedin.com/in/b-arun-mahendran", color: "#3b82f6" },
    { icon: "🐙", label: "GitHub", value: "github.com/arun-mahendran", href: "https://github.com/arun-mahendran", color: "#8b5cf6" },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Contact" title="Let's Build Together" gradient="linear-gradient(to right, #a78bfa, #22d3ee)" />
        </AnimSection>

        <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-5xl mx-auto">
          {/* Contact info links */}
          <AnimSection delay={100}>
            <div className="space-y-4">
              {contactLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gray-950 border border-white/5 transition-all duration-300 group hover:-translate-x-1"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.color + "55";
                    e.currentTarget.style.boxShadow = `0 8px 32px ${c.color}18`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{c.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 truncate">{c.value}</p>
                  </div>
                  <span className="ml-auto text-gray-600 group-hover:text-gray-400 text-sm transition-colors duration-200 flex-shrink-0">→</span>
                </a>
              ))}
            </div>
          </AnimSection>

          {/* Contact form */}
          <AnimSection delay={250}>
            <div className="bg-gray-950 border border-white/5 rounded-3xl p-8">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setStatus(null)}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5">Your Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((prev) => ({ ...prev, name: "" })); }}
                      placeholder="John Doe"
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5">Email Address</label>
                    <input
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: "" })); }}
                      placeholder="john@example.com"
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors((prev) => ({ ...prev, message: "" })); }}
                      rows={4}
                      placeholder="Let's collaborate on something amazing..."
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200 resize-none"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">
                      Failed to send. Please try again or email directly.
                    </p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === "sending" ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message →"
                    )}
                  </button>
                </div>
              )}
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FOOTER ═══════════════════ */
function Footer() {
  const socials = [
    { Icon: FaLinkedin, href: "https://linkedin.com/in/b-arun-mahendran", hover: "hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-300" },
    { Icon: FaGithub, href: "https://github.com/arun-mahendran", hover: "hover:bg-violet-500/10 hover:border-violet-500/40 hover:text-violet-300" },
    { Icon: MdEmail, href: "mailto:b.arunmahendran@gmail.com", hover: "hover:bg-pink-500/10 hover:border-pink-500/40 hover:text-pink-300" },
  ];

  return (
    <footer className="bg-gray-950 border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span
            className="text-xl font-black bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #a78bfa, #f472b6, #22d3ee)" }}
          >
            Arun Mahendran B
          </span>
          <p className="text-xs text-gray-600 mt-1">Built with React &amp; Tailwind CSS</p>
        </div>

        <div className="flex gap-3">
          {socials.map(({ Icon, href, hover }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 transition-all duration-200 hover:scale-110 ${hover}`}
            >
              <Icon />
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-600">© 2025 Arun Mahendran. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════ APP ═══════════════════ */
export default function Portfolio() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-gray-950 text-white font-sans min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease both; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #4c1d95; border-radius: 9999px; }
      `}</style>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}