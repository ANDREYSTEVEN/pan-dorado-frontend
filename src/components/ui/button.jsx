
import React from "react";

export function Button({ children, variant="primary", size="md", className="", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition border";
  const variants = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white border-amber-600",
    outline: "bg-white hover:bg-amber-50 text-amber-700 border-amber-200",
    ghost: "bg-transparent hover:bg-amber-50 text-amber-800 border-transparent"
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "", lg: "px-5 py-3 text-base" };
  return <button className={`${base} ${variants[variant]||variants.primary} ${sizes[size]||sizes.md} ${className}`} {...props}>{children}</button>;
}
