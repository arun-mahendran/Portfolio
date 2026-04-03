import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const ARUN_PHOTO = "/arun.jpg";
const NAV_LINKS = ["Home","About","Projects","Skills","Experience","Certifications","Contact"];

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
    demoLink: "#",
    githubLink: "#",
    gradient: "from-violet-600 via-purple-600 to-pink-600",
    glowColor: "rgba(139,92,246,0.4)",
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
    glowColor: "rgba(20,184,166,0.4)",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Development Intern",
    company: "Deep Dive Technologies",
    period: "Dec 2025 – Jan 2026",
    desc: "Worked on both frontend and backend development, building responsive UIs and handling backend logic using Python and Flask.",
    color: "from-violet-500 to-purple-600",
    icon: "💼",
  },
  {
    role: "Java Application Development Intern",
    company: "UNIQ Technologies",
    period: "Jun 2025 – Jul 2025",
    desc: "Developed Java applications with core OOP concepts, improved problem-solving and software design skills.",
    color: "from-amber-500 to-orange-500",
    icon: "☕",
  },
];

const CERTS = [
  { title: "Java Programming", issuer: "NPTEL", badge: "Elite + Gold · 94%", color: "from-yellow-500 to-amber-500", icon: "🥇" },
  { title: "Python for Data Science", issuer: "NPTEL", badge: "Elite + Silver · 75%", color: "from-blue-500 to-cyan-500", icon: "🥈" },
  { title: "Introduction to Cloud Computing", issuer: "Coursera", badge: "Certified", color: "from-sky-500 to-blue-600", icon: "☁️" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
          Arun Mahendran B
        </span>
        <div className="hidden md:flex gap-1">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active === l ? "bg-violet-600/30 text-violet-300" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              {l}
            </button>
          ))}
        </div>
        <button className="md:hidden text-gray-400 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === l ? "bg-violet-600/30 text-violet-300" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay:"1.5s"}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay:"3s"}}></div>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",backgroundSize:"40px 40px"}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            Available for internships & opportunities
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Arun
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-4">
            Full-Stack Developer
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
            Building real-world web applications with Java, Flask, and modern technologies.
            Passionate about end-to-end development — from pixel-perfect frontends to robust backends.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
              className="group relative px-8 py-3.5 rounded-2xl font-semibold text-white overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">View Projects</span>
            </button>
            <a href="#" className="px-8 py-3.5 rounded-2xl font-semibold text-gray-300 border border-white/20 hover:border-violet-500/50 hover:text-white hover:bg-white/5 transition-all duration-300 hover:scale-105">
              Download Resume ↓
            </a>
          </div>
          <div className="flex gap-4 mt-8 justify-center lg:justify-start">
            <a
                href="https://linkedin.com/in/b-arun-mahendran"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
            >
                <FaLinkedin />
            </a>
            <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300 hover:scale-110"
            >
                <FaGithub />
            </a>
            <a
                href="mailto:b.arunmahendran@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110"
            >
                <MdEmail />
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 blur-2xl opacity-40 scale-110 animate-spin" style={{animationDuration:"8s"}}></div>
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-violet-600 via-purple-700 to-pink-700 p-1 shadow-2xl shadow-violet-500/40">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
              <img src={ARUN_PHOTO} alt="Arun Mahendran" className="w-full h-full object-cover object-center" />
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 bg-gray-900 border border-violet-500/40 rounded-2xl px-3 py-2 text-xs font-semibold text-violet-300 shadow-lg shadow-violet-500/20 animate-bounce" style={{animationDuration:"3s"}}>
            🎓 CGPA 8.4
          </div>
          <div className="absolute -bottom-4 -left-4 bg-gray-900 border border-pink-500/40 rounded-2xl px-3 py-2 text-xs font-semibold text-pink-300 shadow-lg shadow-pink-500/20 animate-bounce" style={{animationDuration:"3s",animationDelay:"1.5s"}}>
            ⚡ 2 Projects
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="About Me" title="The Developer Behind the Code" gradient="from-cyan-400 to-blue-400" />
        </AnimSection>
        <div className="grid md:grid-cols-2 gap-12 mt-16 items-center">
          <AnimSection>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a pre-final year Computer Science Engineering student at P.S.R.R College of Engineering (2023–2027), with a CGPA of <span className="text-cyan-400 font-semibold">8.4</span>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              I have a strong foundation in Java, Python, and Flask, and I focus on building end-to-end web applications — from designing intuitive user interfaces to developing scalable backend systems with real-world utility.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My projects involve AI integration, role-based architectures, and production deployments, reflecting my drive to go beyond academics and build things that actually work.
            </p>
          </AnimSection>
          <AnimSection>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "CGPA", value: "8.4", icon: "🎓", color: "violet" },
                { label: "Projects", value: "2+", icon: "🚀", color: "pink" },
                { label: "Internships", value: "2", icon: "💼", color: "cyan" },
                { label: "Certifications", value: "4", icon: "🏅", color: "amber" },
              ].map(s => (
                <div key={s.label} className={`relative p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-${s.color}-500/40 transition-all duration-300 group overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-${s.color}-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-black text-white">{s.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Projects" title="What I've Built" gradient="from-violet-400 to-pink-400" />
        </AnimSection>
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {PROJECTS.map((p, i) => (
            <AnimSection key={p.title}>
              <div className="group relative h-full rounded-3xl bg-gray-950 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                style={{boxShadow:`0 0 0 0 ${p.glowColor}`,transition:"all 0.5s ease"}}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${p.glowColor}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                {/* Header gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.gradient}`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-2xl font-black bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent`}>{p.title}</h3>
                        {p.badge && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${p.badgeColor} text-white`}>{p.badge}</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm font-medium">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${p.gradient} flex-shrink-0`}></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-400">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={p.demoLink} className={`flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${p.gradient} text-white hover:opacity-90 hover:scale-105 transition-all duration-200`}>
                      Live Demo ↗
                    </a>
                    <a href={p.githubLink} className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200">
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

function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Skills" title="My Tech Stack" gradient="from-pink-400 to-orange-400" />
        </AnimSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-16">
          {SKILLS.map((s, i) => (
            <AnimSection key={s.name}>
              <div className="group relative p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden cursor-default"
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 10px 40px ${s.color}33`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{background:`radial-gradient(circle at center, ${s.color}15, transparent 70%)`}}></div>
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">{s.icon}</div>
                <div className="font-bold text-gray-200 group-hover:text-white transition-colors duration-200 relative z-10 text-sm">{s.name}</div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Experience" title="Where I've Worked" gradient="from-amber-400 to-orange-400" />
        </AnimSection>
        <div className="space-y-6 mt-16 max-w-3xl mx-auto">
          {EXPERIENCE.map((e, i) => (
            <AnimSection key={e.role}>
              <div className="relative pl-8 group">
                <div className={`absolute left-0 top-6 w-3 h-3 rounded-full bg-gradient-to-r ${e.color} ring-4 ring-gray-900 group-hover:scale-125 transition-transform duration-300`}></div>
                <div className="bg-gray-950 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 hover:shadow-xl group-hover:-translate-x-0 hover:-translate-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{e.icon}</span>
                        <h3 className="font-bold text-white text-lg">{e.role}</h3>
                      </div>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${e.color} bg-clip-text text-transparent`}>{e.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-400">{e.period}</span>
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

function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Certifications" title="Credentials & Achievements" gradient="from-green-400 to-teal-400" />
        </AnimSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {CERTS.map((c, i) => (
            <AnimSection key={c.title}>
              <div className="group p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${c.color} text-white mb-3`}>{c.badge}</div>
                <h3 className="font-bold text-white text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-gray-500">{c.issuer}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus("sending");
    setTimeout(() => { setStatus("sent"); setForm({ name:"", email:"", message:"" }); }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimSection>
          <SectionHeader label="Contact" title="Let's Build Together" gradient="from-violet-400 to-cyan-400" />
        </AnimSection>
        <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-5xl mx-auto">
          {/* Contact info */}
          <AnimSection>
            <div className="space-y-4">
              {[
                { icon: "📧", label: "Email", value: "b.arunmahendran@gmail.com", href: "mailto:b.arunmahendran@gmail.com", color: "pink" },
                { icon: "💼", label: "LinkedIn", value: "b-arun-mahendran", href: "https://linkedin.com/in/b-arun-mahendran", color: "blue" },
                { icon: "🐙", label: "GitHub", value: "github.com/arun-mahendran", href: "https://github.com/arun-mahendran", color: "violet" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className={`flex items-center gap-4 p-5 rounded-2xl bg-gray-950 border border-white/5 hover:border-${c.color}-500/30 transition-all duration-300 group hover:-translate-x-1`}>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{c.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">{c.value}</p>
                  </div>
                  <span className="ml-auto text-gray-600 group-hover:text-gray-400 text-sm">→</span>
                </a>
              ))}
            </div>
          </AnimSection>

          {/* Form */}
          <AnimSection>
            <div className="bg-gray-950 border border-white/5 rounded-3xl p-8">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">I'll get back to you soon.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5">Your Name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5">Email Address</label>
                    <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5">Message</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      rows={4} placeholder="Let's collaborate on something amazing..."
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200 resize-none" />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button onClick={handleSubmit} disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {status === "sending" ? "Sending..." : "Send Message →"}
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

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Arun Mahendran B</span>
          <p className="text-xs text-gray-600 mt-1">Built with React & Tailwind CSS</p>
        </div>
        <div className="flex gap-3">
        {[
            {
            icon: <FaLinkedin />,
            href: "https://linkedin.com/in/b-arun-mahendran",
            color: "hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-300"
            },
            {
            icon: <FaGithub />,
            href: "https://github.com/YOUR_USERNAME",
            color: "hover:bg-violet-500/10 hover:border-violet-500/40 hover:text-violet-300"
            },
            {
            icon: <MdEmail />,
            href: "mailto:b.arunmahendran@gmail.com",
            color: "hover:bg-pink-500/10 hover:border-pink-500/40 hover:text-pink-300"
            }
        ].map(s => (
            <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 transition-all duration-200 ${s.color}`}
            >
            {s.icon}
            </a>
        ))}
        </div>
        <p className="text-xs text-gray-600">© 2025 Arun Mahendran. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SectionHeader({ label, title, gradient }) {
  return (
    <div className="text-center">
      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent border border-white/10 mb-4`}>
        {label}
      </span>
      <h2 className="text-4xl sm:text-5xl font-black text-white">{title}</h2>
      <div className={`w-16 h-1 bg-gradient-to-r ${gradient} rounded-full mx-auto mt-5`}></div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); }),
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-gray-950 text-white font-sans min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; }
        @keyframes fade-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
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

