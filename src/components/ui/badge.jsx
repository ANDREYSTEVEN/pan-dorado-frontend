
import React from "react";
export function Badge({ children, className="", ...props }) {
  return <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs border border-amber-200 ${className}`} {...props}>{children}</span>;
}
