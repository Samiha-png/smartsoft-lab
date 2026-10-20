import React from "react";
import { Quote } from "lucide-react";
import Reveal from "./Reveal";
import { useApi } from "../hooks/useApi";

export default function Testimonials() {
  const { data: testimonials, loading, error } = useApi("testimonials");

  if (loading) return null;
  if (error || !testimonials.length) return null;

  return (
    <section className="testimonials-section section-shell" id="testimonials">
      <Reveal>
        <div className="section-label">
          <span><i className="label-dot" />04 / TRUST</span>
          <span>WHAT CLIENTS SAY</span>
        </div>
        <div className="section-heading">
          <h2>Real words.<br /><span className="text-gradient">Real partnerships.</span></h2>
          <p>Feedback from the people and teams we've built with.</p>
        </div>
      </Reveal>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <Reveal delay={i * 0.07} key={t.id}>
            <figure className="testimonial-card">
              <Quote size={20} className="testi-q" />
              
              {/* Database column names auto-adjust */}
              <blockquote>"{t.content || t.quote || t.message || "Great experience working with them!"}"</blockquote>
              
              <figcaption>
                <strong>{t.client_name || t.name || "Client"}</strong>
                <span>{t.designation || t.role || t.company || "Verified Client"}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}