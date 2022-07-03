import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { AlertsProvider } from "src/context";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <AlertsProvider>
      <Component {...pageProps} />
    </AlertsProvider>
  </SessionProvider>
);

export default App;
