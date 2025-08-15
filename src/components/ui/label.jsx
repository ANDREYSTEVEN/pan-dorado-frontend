import React from 'react'
export function Label({ className='', children, ...props }){
  return <label className={`text-sm font-medium text-amber-900 ${className}`} {...props}>{children}</label>
}
