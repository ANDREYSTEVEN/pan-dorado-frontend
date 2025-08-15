import React from 'react'
export function Input({ className='', ...props }){
  return <input className={`h-10 w-full rounded-xl border border-amber-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`} {...props} />
}
