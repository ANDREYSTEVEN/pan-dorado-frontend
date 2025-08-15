import React from 'react'
export const Card = ({className='', children}) => <div className={`rounded-2xl border bg-white/80 backdrop-blur ${className}`}>{children}</div>
export const CardHeader = ({className='', children}) => <div className={`p-4 ${className}`}>{children}</div>
export const CardTitle = ({className='', children}) => <h3 className={`text-lg font-semibold text-amber-800 ${className}`}>{children}</h3>
export const CardContent = ({className='', children}) => <div className={`p-4 ${className}`}>{children}</div>
