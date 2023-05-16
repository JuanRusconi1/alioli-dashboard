import { Roboto_Mono } from '@next/font/google'
import NavBar from '../components/navBar'

export const metadata = {
  title: 'Ali oli - Principal',
  description: 'Dashboard for ali oli delivery restorant'
}

const robotoMono = Roboto_Mono({
  weigth: ['700'],
  preload: false
})

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Web site created using create-react-app' />
        <title>{metadata.title}</title>
      </head>
      <body className={robotoMono.className}>
        <NavBar />
        {children}
        </body>
    </html>
  )
}
