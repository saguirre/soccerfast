import Head from "next/head";

import { Footer, PrivateHeader } from "@components";

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>SoccerFast</title>
        <meta name="description" content="Soccer League based in Miami, Florida" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <PrivateHeader />
        {children}
        <Footer />
      </main>
    </>
  );
};
