import Head from "next/head";

import { PrivateHeader, Footer } from "@components";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Admin | SoccerFast</title>
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
