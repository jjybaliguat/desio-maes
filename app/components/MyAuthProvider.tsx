"use client"
import React, { ReactNode } from 'react'
import { AuthProvider } from '../context/AuthContext'

function MyAuthProvider({children} : {children: ReactNode}) {
  return (
    <>
    <AuthProvider>
      {children}
    </AuthProvider>
    </>
  )
}

export default MyAuthProvider