import Header from '@/components/header/header'
import React from 'react'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}
