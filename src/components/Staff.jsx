import React from "react";
import { Linkedin, Github, User } from "lucide-react";
import Reveal from "./Reveal.jsx"; // Path fixed here
import { useApi } from "../hooks/useApi";

export default function Staff() {
  const { data: staff, loading, error } = useApi("staff");

  if (loading) return null;
  if (error || !staff.length) return null;

  return (
    <section className="staff-section section-shell" id="team">
      <Reveal>
        <div className="section-label">
          <span><i className="label-dot" />05 / THE TEAM</span>
          <span>PEOPLE BEHIND SMARTSOFT</span>
        </div>
        <div className="section-heading">
          <h2>The people<br /><span className="text-gradient">behind the work.</span></h2>
          <p>A small, focused team of engineers, designers, and problem-solvers.</p>
        </div>
      </Reveal>

      <div className="staff-grid">
        {staff.map((s, i) => (
          <Reveal delay={i * 0.06} key={s.id}>
            <article className="staff-card">
              <div className="staff-avatar">
                {s.image || s.photo || s.avatar || s.avatar_url ? (
                  <img src={s.image || s.photo || s.avatar || s.avatar_url} alt={s.name} loading="lazy" />
                ) : (
                  <User size={32} strokeWidth={1.2} />
                )}
              </div>
              <h3>{s.name}</h3>
              <div className="staff-role">{s.designation || s.role || "Team Member"}</div>
              {s.bio && <p className="staff-bio">{s.bio}</p>}
              
              {(s.linkedin || s.social_linkedin || s.github || s.social_github) && (
                <div className="staff-socials">
                  {(s.linkedin || s.social_linkedin) && (
                    <a href={s.linkedin || s.social_linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin size={15} />
                    </a>
                  )}
                  {(s.github || s.social_github) && (
                    <a href={s.github || s.social_github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github size={15} />
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}