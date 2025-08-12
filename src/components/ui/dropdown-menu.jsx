
import React from "react";

export function DropdownMenu({ children }) { return <div className="relative inline-block">{children}</div>; }
export function DropdownMenuTrigger({ children }) { return <div className="cursor-pointer">{children}</div>; }
export function DropdownMenuContent({ children, align="start" }) {
  return <div className="absolute mt-2 right-0 z-50 bg-white border rounded-xl shadow p-2 min-w-[180px]">{children}</div>;
}
export function DropdownMenuLabel({ children }) { return <div className="px-2 py-1 text-xs text-neutral-500">{children}</div>; }
export function DropdownMenuSeparator() { return <div className="my-1 border-t" />; }
export function DropdownMenuItem({ children, ...props }) { return <div className="px-2 py-1.5 rounded-md hover:bg-amber-50 cursor-pointer text-sm flex items-center" {...props}>{children}</div>; }
