import React from "react";

const fieldBase =
  "peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2.5 pt-6 text-white placeholder-transparent transition-all duration-300 focus:border-orange-400/60 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-orange-500/10";

const labelBase =
  "pointer-events-none absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-400";

// Text field with a floating label
export function Field({ label, name, type = "text", textarea = false, rows = 5, className = "", ...props }) {
  const id = `field-${name}`;
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className={`relative ${className}`}>
      <Tag
        id={id}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? rows : undefined}
        placeholder={label}
        className={`${fieldBase} ${textarea ? "resize-none" : ""}`}
        {...props}
      />
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
    </div>
  );
}
