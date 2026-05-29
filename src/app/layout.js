import './globals.css'

export const metadata = {
  title: 'CoachFlow',
  description: 'Plateforme de coaching sportif',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}