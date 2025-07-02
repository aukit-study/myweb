import Navbar from './components/Navbar'
import './styles/globals.css'
import './styles/style.css'
import './styles/weather.css'
import Providers from './providers/Providers'

export const metadata = {
  title: 'My App',
  description: 'NextAuth Login System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
        <body>
        <Providers>
          <Navbar></Navbar>
          <section>
            <div className="stars"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          {children}
          </section>
        </Providers>
        </body>
    </html>
  )
}
