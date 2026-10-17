import React from "react";
import { Quote } from "lucide-react";
import Reveal from "./Reveal";

// ⚠️ TEMPORARY DATA: Yahan aap apne real testimonials daal sakti hain.
// Baad me isko API se replace kar denge.
const MOCK_TESTIMONIALS = [
  {
    id: 1,
    quote: "SmartSoft Labs transformed our operations completely. The ERP system they built is fast, reliable, and exactly what we needed.",
    name: "Ahmed Khan",
    role: "Operations Director",
    company: "BlockPro"
  },
  {
    id: 2,
    quote: "Working with this team was seamless. They understood our requirements perfectly and delivered the mobile app ahead of schedule.",
    name: "Fatima Noor",
    role: "Founder",
    company: "Nexron Autos"
  },
  {
    id: 3,
    quote: "Their attention to detail and technical expertise is unmatched. The dashboard they created gives us clear insights every day.",
    name: "Bilal Hussain",
    role: "CEO",
    company: "Atlantic Plastic"
  }
];

export default function Testimonials() {
  // Baad me API aane pe ye line change hogi
  const testimonials = MOCK_TESTIMONIALS;

  if (!testimonials.length) return null;

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
              <blockquote>"{t.quote}"</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>
                  {t.role}
                  {t.company ? ` · ${t.company}` : ""}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}