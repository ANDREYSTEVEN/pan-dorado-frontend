import React from 'react'
export function Button({ children, className='', variant='default', size='default', ...props }) {
  const base='inline-flex items-center justify-center rounded-2xl font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60'
  const variants={ default:'bg-amber-600 hover:bg-amber-700 text-white',
                   outline:'bg-white border border-amber-300 text-amber-800 hover:bg-amber-50',
                   ghost:'bg-transparent hover:bg-amber-50 text-amber-800' }
  const sizes={ default:'h-10 px-4 text-sm', sm:'h-8 px-3 text-sm', lg:'h-11 px-5 text-base' }
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>
}
