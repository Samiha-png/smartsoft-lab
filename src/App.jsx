import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, Asterisk, Code2, Smartphone, Sparkles,
  Boxes, Check, ChevronDown, Layers3, Menu, MoveUpRight, Network,
  Workflow, X,
} from "lucide-react";

// ─── COMPONENTS ──────────────────────────────────────────────
import Reveal from "./components/Reveal";
import Testimonials from "./components/Testimonials";
import Staff from "./components/Staff";

// ─── DATA (Removed 'testimonials' as it now comes from API) ──
import {
  company,
  services as servicesData,
  projects as projectsData,
  projectFilters,
  techStack,
} from "./data/site";

/* ──────────────────────────────────────────────────────────────
   DATA BINDING
   ────────────────────────────────────────────────────────────── */
const iconMap = { Code2, Smartphone, Sparkles, Boxes };
const services = servicesData.map((s) => ({
  ...s,
  icon: iconMap[s.icon] ?? Code2,
}));
const projects = projectsData;
const tech = techStack;

const process = [
  ["01", "Discover", "We learn about your goals, users, challenges, and what success should look like."],
  ["02", "Design", "We map the experience and create a clear, purposeful direction before development."],
  ["03", "Build", "We develop in focused stages, sharing progress and validating the details along the way."],
  ["04", "Launch & evolve", "We prepare for launch and help your product improve as your needs grow."],
];

/* ──────────────────────────────────────────────────────────────
   AMBIENT BACKGROUND
   ────────────────────────────────────────────────────────────── */
function Ambient() {
  const reduce = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <>
      <div className="ambient-aurora" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      {!reduce && (
        <div
          className="ambient-spotlight"
          aria-hidden="true"
          style={{
            background: `radial-gradient(600px circle at ${
              mouse.x * 100
            }% ${mouse.y * 100}%, rgba(34,184,240,0.09), transparent 55%)`,
          }}
        />
      )}
      <div className="noise" aria-hidden="true" />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO ORB — ambient animation for intro background
   ────────────────────────────────────────────────────────────── */
function Orb() {
  const reduce = useReducedMotion();
  return (
    <div className="orb-scene" aria-hidden="true">
      <div className="orb-grid" />
      <motion.div
        className="orb-halo"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orb"
        animate={reduce ? {} : { y: [0, -14, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="orb-shine" />
        <div className="orb-contour contour-one" />
        <div className="orb-contour contour-two" />
        <div className="orb-contour contour-three" />
      </motion.div>
      <motion.div
        className="orbit orbit-one"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbit orbit-two"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PROJECT MOCK VISUALS
   ────────────────────────────────────────────────────────────── */
function ProjectVisual({ type }) {
  if (type === "erp") {
    return (
      <div className="mock-window mock-erp">
        <div className="mock-top">
          <span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" />
          <span className="mock-url">console / overview</span>
        </div>
        <div className="mock-body">
          <div className="mock-sidebar"><i /><i /><i /><i /></div>
          <div className="mock-main">
            <div className="mock-heading">Operations overview <span>•••</span></div>
            <div className="mock-metrics">
              <div><small>REVENUE</small><b>$48,290</b><em>↗ 12.8%</em></div>
              <div><small>ORDERS</small><b>1,284</b><em>↗ 8.2%</em></div>
            </div>
            <div className="chart-bars">
              {[28, 48, 37, 64, 45, 76, 55, 88, 67, 96, 72, 84].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mock-table"><i /><i /><i /></div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "study") {
    return (
      <div className="mock-window mock-study">
        <div className="study-nav">
          <span>◈ workspace</span>
          <span>Today&nbsp;&nbsp; Notes&nbsp;&nbsp; Planner</span>
          <span className="study-avatar">S</span>
        </div>
        <div className="study-content">
          <div className="study-kicker">YOUR LEARNING SPACE</div>
          <h4>Make room for<br /><span>big ideas.</span></h4>
          <div className="study-cards">
            <div><Sparkles size={15} /><b>AI Tutor</b><small>Ask anything</small></div>
            <div><Layers3 size={15} /><b>Smart Notes</b><small>12 notes</small></div>
            <div><Workflow size={15} /><b>Study plan</b><small>3 tasks today</small></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mock-window mock-web">
      <div className="web-glow" />
      <div className="web-small">DIGITAL PRODUCT / 03</div>
      <div className="web-big">Ideas<br /><span>in motion.</span></div>
      <div className="web-footer">
        <span>DESIGNED WITH INTENT</span>
        <ArrowUpRight size={18} />
      </div>
      <div className="web-ring" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   APP
   ────────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Web applications",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects = projects.filter(
    (p) => filter === "All work" || p.category === filter
  );

  function submitContact(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry — ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.service}\n\nProject details:\n${form.message}`
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Ambient />

      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <a className="brand" href="#home" onClick={closeMenu} aria-label="SmartSoft Labs home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span className="brand-text">
            smartsoft<span>labs</span>
            <small>ENGINEERING WHAT'S NEXT</small>
          </span>
        </a>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#services" onClick={closeMenu}>Capabilities</a>
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Start a project <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main>
        {/* ── INTRO (ab page ka pehla section) ───────── */}
        <section className="intro-section section-shell" id="home">
          {/* ── ORB BACKGROUND ── */}
          <div className="intro-orb-bg" aria-hidden="true">
            <Orb />
          </div>

          <Reveal>
            <div className="section-label">
              <span><i className="label-dot" />01 / THE BIG PICTURE</span>
              <span>IDEAS → IMPACT</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="intro-hero">
              <div className="intro-eyebrow">
                <span className="status-dot" />
                <span>INDEPENDENT THINKING. CONNECTED TECHNOLOGY.</span>
              </div>

              <h1 className="intro-title">
                Technology should feel
                <br />
                like a <span className="text-muted">possibility,</span>
                <br />
                <span className="text-gradient">not a barrier.</span>
              </h1>

              <p className="intro-lede">
                {company.description}
              </p>

              <div className="intro-actions">
                <a className="button button-primary" href="#work">
                  <span>Explore our work</span>
                  <ArrowUpRight size={17} />
                </a>
                <a className="text-link" href="#services">
                  What we do <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="intro-meta">
                <span>WEB / MOBILE / AI</span>
                <span className="meta-line" />
                <span>BUILT AROUND YOUR NEXT MOVE</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="intro-grid">
              <div className="intro-statement">
                <Asterisk className="intro-asterisk" size={28} />
                <p>
                  From the first sketch to the final deployment, we connect strategy,
                  design, and engineering to turn ambitious ideas into useful digital
                  experiences.
                </p>
                <a href="#approach" className="inline-link">
                  How we work <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="intro-side-card">
                <div className="intro-card-label">WHAT WE DO</div>
                <ul className="intro-card-list">
                  <li>Web applications</li>
                  <li>Mobile applications</li>
                  <li>AI & data solutions</li>
                  <li>Business systems</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="ticker" aria-label="Our capabilities">
            <div className="ticker-track">
              {[0, 1].map((n) => (
                <div className="ticker-set" key={n}>
                  {[
                    "DIGITAL PRODUCTS", "CUSTOM SOFTWARE", "WEB EXPERIENCES",
                    "MOBILE APPS", "AI & DATA", "PRODUCT DESIGN",
                  ].map((t) => (
                    <span key={t + n}>{t}<Asterisk size={15} /></span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ───────────────────────────────── */}
        <section className="services-section section-shell" id="services">
          <Reveal>
            <div className="section-label">
              <span><i className="label-dot" />02 / WHAT WE DO</span>
              <span>CAPABILITIES</span>
            </div>
            <div className="section-heading">
              <h2>Complex problems.<br /><span className="text-muted">Clear solutions.</span></h2>
              <p>
                We bring the right people, ideas, and technologies together to build
                things that make a difference.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal delay={i * 0.07} key={s.n}>
                  <article className="service-card">
                    <div className="service-card-top">
                      <span>{s.n} / CAPABILITY</span>
                      <Icon size={23} strokeWidth={1.5} />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="tag-row">
                      {s.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <a
                      href="#contact"
                      aria-label={`Discuss ${s.title}`}
                      className="card-arrow"
                    >
                      <ArrowUpRight size={19} />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── WORK ───────────────────────────────────── */}
        <section className="work-section section-shell" id="work">
          <Reveal>
            <div className="section-label">
              <span><i className="label-dot" />03 / SELECTED WORK</span>
              <span>THE WORK SPEAKS</span>
            </div>
            <div className="section-heading work-heading">
              <h2>Made real.<br /><span className="text-gradient">Made to matter.</span></h2>
              <p>
                A look at the kinds of digital experiences we create.
              </p>
            </div>
          </Reveal>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                key={f}
                className={filter === f ? "filter active" : "filter"}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <Reveal delay={i * 0.08} key={p.id}>
                <article className="project-card">
                  <div className={`project-visual visual-${p.visual}`}>
                    <ProjectVisual type={p.visual} />
                    <span className="project-number">{p.id} / 03</span>
                  </div>
                  <div className="project-info">
                    <div className="project-category">{p.category}</div>
                    <h3>{p.title}</h3>
                    <p>{p.subtitle}</p>
                    <div className="project-bottom">
                      <div className="tag-row">
                        {p.tech.map((t) => <span key={t}>{t}</span>)}
                      </div>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                          aria-label={`Open ${p.title}`}
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      ) : (
                        <span
                          className="project-link project-placeholder"
                          title="Add the verified live project URL"
                        >
                          <ArrowUpRight size={18} />
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="work-note">
            <span className="status-dot" />
            PROJECT PREVIEWS ARE CONCEPTUAL UI MOCKUPS UNTIL REAL PROJECT SCREENSHOTS AND URLS ARE ADDED.
          </div>
        </section>

        {/* ── TESTIMONIALS (API se aayenge) ── */}
        <Testimonials />

        {/* ── STAFF (API se aayenge) ── */}
        <Staff />

        {/* ── PRINCIPLES ─────────────────────────────── */}
        <section className="principles-section section-shell">
          <Reveal>
            <div className="section-label">
              <span><i className="label-dot" />05 / WHY SMARTSOFT</span>
              <span>BUILT WITH INTENTION</span>
            </div>
            <div className="principles-grid">
              <div>
                <h2>Good technology<br />starts with <span className="text-gradient">good questions.</span></h2>
                <p className="principles-lead">
                  We don't believe in technology for technology's sake. We focus on the
                  people, processes, and possibilities behind every project.
                </p>
              </div>
              <div className="principle-list">
                <div>
                  <span>↗</span>
                  <div>
                    <h3>Purpose before pixels</h3>
                    <p>Understand the challenge first. Then build the right solution.</p>
                  </div>
                </div>
                <div>
                  <span>⌘</span>
                  <div>
                    <h3>Built to grow</h3>
                    <p>Flexible foundations designed for changing needs and new opportunities.</p>
                  </div>
                </div>
                <div>
                  <span>◎</span>
                  <div>
                    <h3>Clarity at every step</h3>
                    <p>Transparent collaboration, thoughtful decisions, and visible progress.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── APPROACH ───────────────────────────────── */}
        <section className="approach-section section-shell" id="approach">
          <Reveal>
            <div className="section-label">
              <span><i className="label-dot" />06 / HOW WE WORK</span>
              <span>FROM FIRST HELLO TO LAUNCH</span>
            </div>
            <div className="section-heading">
              <h2>A clear path from<br /><span className="text-muted">idea to impact.</span></h2>
              <p>
                Good work is a collaboration. Our process keeps the goal clear and the
                next step visible.
              </p>
            </div>
          </Reveal>
          <div className="process-grid">
            {process.map((step, i) => (
              <Reveal delay={i * 0.07} key={step[0]}>
                <div className="process-step">
                  <div className="process-number">
                    {step[0]} <ArrowUpRight size={15} />
                  </div>
                  <h3>{step[1]}</h3>
                  <p>{step[2]}</p>
                  <div className="process-line">
                    <span style={{ width: `${(i + 1) * 25}%` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── STACK ──────────────────────────────────── */}
        <section className="stack-section section-shell">
          <Reveal>
            <div className="stack-inner">
              <div>
                <div className="section-label">
                  <span><i className="label-dot" />07 / OUR TOOLKIT</span>
                  <span>RIGHT TOOL. RIGHT REASON.</span>
                </div>
                <h2>Powered by curiosity.<br /><span className="text-muted">Built with the right tools.</span></h2>
              </div>
              <div className="stack-copy">
                <p>
                  We choose technology to fit the product, the people using it, and the
                  future it needs to support.
                </p>
                <div className="tech-cloud">
                  {tech.map((t) => (
                    <span key={t}><Check size={13} />{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── CONTACT ────────────────────────────────── */}
        <section className="contact-section section-shell" id="contact">
          <Reveal>
            <div className="contact-top">
              <div className="section-label">
                <span><i className="label-dot" />08 / YOUR NEXT MOVE</span>
                <span>LET'S MAKE IT HAPPEN</span>
              </div>
              <div className="contact-title">
                <h2>Have an idea?<br /><span className="text-gradient">Let's build it.</span></h2>
                <div className="contact-symbol">
                  <Network size={44} strokeWidth={1} />
                  <span />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="contact-grid">
            <div className="contact-aside">
              <p>
                Tell us what you're imagining, what needs solving, or what you want to
                improve. We'll take it from there.
              </p>
              <div className="contact-aside-note">
                <span className="status-dot" /> OPEN FOR NEW PROJECT ENQUIRIES
              </div>

              <div className="contact-email-label">EMAIL</div>
              <a className="contact-email" href={`mailto:${company.email}`}>
                {company.email} <ArrowUpRight size={15} />
              </a>

              <div className="contact-email-label" style={{ marginTop: 22 }}>PHONE</div>
              <a className="contact-email" href={`tel:${company.phoneHref}`}>
                {company.phone} <ArrowUpRight size={15} />
              </a>

              {company.whatsapp && (
                <>
                  <div className="contact-email-label" style={{ marginTop: 22 }}>WHATSAPP</div>
                  <a
                    className="contact-email"
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp <ArrowUpRight size={15} />
                  </a>
                </>
              )}
            </div>

            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-row">
                <label htmlFor="contact-name">
                  Your name
                  <input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="How should we call you?"
                  />
                </label>
                <label htmlFor="contact-email">
                  Email address
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label htmlFor="contact-service">
                What do you need?
                <span className="select-wrap">
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option>Web applications</option>
                    <option>Mobile applications</option>
                    <option>AI & data solutions</option>
                    <option>Something else</option>
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>

              <label htmlFor="contact-message">
                Tell us a little about it
                <textarea
                  id="contact-message"
                  required
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="A little context about your idea, goals, or challenge..."
                />
              </label>

              <button className="button button-primary form-submit" type="submit">
                <span>{sent ? "Open email draft again" : "Prepare project enquiry"}</span>
                <MoveUpRight size={17} />
              </button>
              <p className="form-note">
                This opens your default email app with your message prepared. No form
                data is stored on this site.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-main">
          <a className="brand" href="#home">
            <span className="brand-mark"><span /><span /><span /><span /></span>
            <span className="brand-text">
              smartsoft<span>labs</span>
              <small>ENGINEERING WHAT'S NEXT</small>
            </span>
          </a>
          <p>Thoughtful engineering for<br />what comes next.</p>
          <a href="#home" className="back-top">
            BACK TO TOP <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SMARTSOFT LABS. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED FOR WHAT'S NEXT <Asterisk size={13} /></span>
        </div>
      </footer>
    </>
  );
}