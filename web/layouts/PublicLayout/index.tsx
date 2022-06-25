import { Header, Footer } from "@components/*";
import Head from "next/head";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>SoccerFast</title>
        <meta name="description" content="Soccer League based in Miami, Florida" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};
