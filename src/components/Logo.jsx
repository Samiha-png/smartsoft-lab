import React from "react";

/**
 * SmartSoft Labs logo — used in navbar + footer.
 * Size controlled by the `size` prop (px height).
 */
export default function Logo({ size = 28, className = "" }) {
  return (
    <span
      className={`logo ${className}`}
      style={{ height: size, width: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect
          x="58" y="28" width="62" height="76" rx="2"
          transform="rotate(-3 89 66)"
          fill="var(--accent)"
        />
        <rect
          x="128" y="46" width="38" height="38" rx="2"
          transform="rotate(-3 147 65)"
          fill="var(--accent-2)"
        />
        <rect
          x="42" y="114" width="38" height="38" rx="2"
          transform="rotate(-3 61 133)"
          fill="var(--accent-2)"
        />
        <rect
          x="92" y="108" width="70" height="68" rx="2"
          transform="rotate(-3 127 142)"
          fill="var(--accent-2)"
        />
      </svg>
    </span>
  );
}