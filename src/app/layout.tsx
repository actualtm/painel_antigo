import React from 'react'
import Providers from './providers'
import './globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
	  </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
