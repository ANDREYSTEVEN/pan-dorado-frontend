import React from 'react'
export function Badge({ className='', children }){
  return <span className={`inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ${className}`}>{children}</span>
}
