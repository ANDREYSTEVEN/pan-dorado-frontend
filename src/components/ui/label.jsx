
import React from "react";
export function Label({ children, ...props }) {
  return <label className="text-sm text-neutral-700" {...props}>{children}</label>;
}
