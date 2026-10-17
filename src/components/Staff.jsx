import React from "react";
import { Linkedin, Github, User } from "lucide-react";
import Reveal from "./Reveal";

// ⚠️ TEMPORARY DATA: Yahan apne team members ki list daalein.
// Baad me isko API se replace kar denge.
const MOCK_STAFF = [
  {
    id: 1,
    name: "Syed Jazib Shah",
    role: "Lead Developer",
    bio: "Full-stack engineer with expertise in building scalable web applications.",
    avatar_url: "",
    social_linkedin: "#",
    social_github: "#"
  },
  {
    id: 2,
    name: "Ali Raza",
    role: "UI/UX Designer",
    bio: "Crafting intuitive and beautiful digital experiences.",
    avatar_url: "",
    social_linkedin: "#",
    social_github: ""
  },
  {
    id: 3,
    name: "Hamza Tariq",
    role: "Backend Engineer",
    bio: "Specializes in database architecture and API development.",
    avatar_url: "",
    social_linkedin: "",
    social_github: "#"
  }
];

export default function Staff() {
  const staff = MOCK_STAFF;

  if (!staff.length) return null;

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
                {s.avatar_url ? (
                  <img
                    src={s.avatar_url}
                    alt={s.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add("staff-avatar-fallback");
                    }}
                  />
                ) : (
                  <User size={32} strokeWidth={1.2} />
                )}
              </div>
              <h3>{s.name}</h3>
              <div className="staff-role">{s.role}</div>
              {s.bio && <p className="staff-bio">{s.bio}</p>}
              
              {(s.social_linkedin || s.social_github) && (
                <div className="staff-socials">
                  {s.social_linkedin && (
                    <a href={s.social_linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin size={15} />
                    </a>
                  )}
                  {s.social_github && (
                    <a href={s.social_github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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