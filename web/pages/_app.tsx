import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PublicLayout } from "@layouts";

function SoccerFast({ Component, pageProps }: AppProps) {
  return (
    <PublicLayout>
      <Component {...pageProps} />
    </PublicLayout>
  );
}

export default SoccerFast;
