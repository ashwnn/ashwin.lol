import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Script async defer data-website-id="d4f97cd3-807b-4837-964d-3b6e7525f991" src="https://umami.1m.cx/umami.js" />
  <Component {...pageProps} />
  </>)
}
