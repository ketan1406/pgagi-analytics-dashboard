// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css"; 
import "../styles/font.css";     // <-- import your font-face definitions

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
