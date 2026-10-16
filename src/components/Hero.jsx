import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { projects } from "../data/site";

const LINES = [
  { cmd: "smartsoft init",            out: "workspace ready" },
  { cmd: "smartsoft build --web",     out: "React · Vite · Node" },
  { cmd: "smartsoft build --mobile",  out: "Flutter · Firebase" },
  { cmd: "smartsoft build --ai",      out: "Python · TensorFlow" },
  { cmd: "smartsoft ship",            out: "deployed · supported" },
];

/* ──────────────────────────────────────────────────────────
   Background animated rings + orbs (subtle, ambient)
   ────────────────────────────────────────────────────────── */
function HeroBackdrop() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <motion.div
        className="hero-ring hero-ring-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-ring hero-ring-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-orb hero-orb-1"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-orb hero-orb-2"
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="hero-grid-lines" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Terminal
   ────────────────────────────────────────────────────────── */
function Terminal() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(reduce ? LINES.length : 0);
  const [typed, setTyped] = useState("");
  const timers = useRef([]);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const clear = () => timers.current.forEach(clearTimeout);
    timers.current = [];

    const run = (idx) => {
      if (cancelled) return;
      if (idx >= LINES.length) {
        const t = setTimeout(() => {
          setVisible(0); setTyped(""); run(0);
        }, 2800);
        timers.current.push(t);
        return;
      }
      const line = LINES[idx];
      let i = 0;
      const type = () => {
        if (cancelled) return;
        if (i <= line.cmd.length) {
          setTyped(line.cmd.slice(0, i));
          i++;
          timers.current.push(setTimeout(type, 38 + Math.random() * 32));
        } else {
          timers.current.push(setTimeout(() => {
            setVisible((n) => n + 1);
            setTyped("");
            run(idx + 1);
          }, 640));
        }
      };
      type();
    };
    run(0);
    return () => { cancelled = true; clear(); };
  }, [reduce]);

  return (
    <div className="term" aria-label="SmartSoft Labs capabilities terminal">
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot term-dot-live" />
        <span className="term-title">smartsoft@labs</span>
      </div>
      <div className="term-body">
        {LINES.slice(0, visible).map((l, i) => (
          <div className="term-line" key={i}>
            <span className="term-prompt">$</span>
            <span className="term-cmd">{l.cmd}</span>
            <span className="term-out">{l.out}</span>
          </div>
        ))}
        {!reduce && visible < LINES.length && (
          <div className="term-line term-line-active">
            <span className="term-prompt">$</span>
            <span className="term-cmd">{typed}</span>
            <span className="term-caret" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   HERO — center aligned
   ────────────────────────────────────────────────────────── */
export default function Hero({ description }) {
  const reduce = useReducedMotion();
  const shipped = projects.length;
  const liveCount = projects.filter((p) => p.demoUrl || p.url).length;

  return (
    <section className="hero hero-center" id="home">
      <HeroBackdrop />

      <div className="hero-center-inner">
        <motion.div
          className="hero-eyebrow hero-eyebrow-center"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="status-dot" />
          <span>Independent software studio · {new Date().getFullYear()}</span>
        </motion.div>

        <motion.h1
          className="hero-title hero-title-center"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Engineering
          <br />
          <em>digital products</em>
          <br />
          that move business
          <span className="hero-dot">.</span>
        </motion.h1>

        <motion.p
          className="hero-desc hero-desc-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="hero-actions hero-actions-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a className="btn btn-primary" href="#work">
            <span>View our work</span>
            <ArrowUpRight size={16} />
          </a>
          <a className="btn btn-line" href="#contact">
            <span>Start a project</span>
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-num">{String(shipped).padStart(2, "0")}</span>
            <span className="hero-stat-label">Projects shipped</span>
          </div>
          <span className="hero-stat-sep" />
          <div className="hero-stat">
            <span className="hero-stat-num">{String(liveCount).padStart(2, "0")}</span>
            <span className="hero-stat-label">Live demos</span>
          </div>
          <span className="hero-stat-sep" />
          <div className="hero-stat">
            <span className="hero-stat-num">24h</span>
            <span className="hero-stat-label">Reply time</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-term-wrap"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal />
        </motion.div>

        <a href="#intro" className="hero-scroll hero-scroll-center">
          <ArrowDown size={14} />
          <span>scroll to explore</span>
        </a>
      </div>
    </section>
  );
}