'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
			<AuthProvider>
				{children}
			</AuthProvider>
		</QueryClientProvider>
  )
}
