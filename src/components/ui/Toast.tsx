'use client'

import { Toaster } from 'react-hot-toast'

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: '14px',
          borderRadius: '12px',
          padding: '12px 16px',
        },
        success: {
          style: { background: '#f0fdf4', color: '#166534' },
        },
        error: {
          style: { background: '#fef2f2', color: '#991b1b' },
        },
      }}
    />
  )
}
