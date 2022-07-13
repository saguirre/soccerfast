import "../styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { LoadingWrapper } from "@components";
import { AdminLayout, PublicLayout, UserLayout } from "@layouts";
import { AppContext, AuthContext } from "@contexts";
import { TournamentsService } from "@services";

function SoccerFast({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState("");
  const authContextProps = { userToken, setUserToken };
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const tournamentsService = new TournamentsService();
  useEffect(() => {
    if (router.isReady) {
      setTimeout(() => {
        const token = localStorage.getItem("userToken");
        console.log("Token on App: ", token);
        setUserToken(token as string);
        setUserIsAdmin(true);
        setLoading(false);
      }, 250);
    }
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <AuthContext.Provider value={authContextProps}>
        <AppContext.Provider value={{ tournamentsService }}>
          {userToken ? (
            userIsAdmin ? (
              <AdminLayout>
                <Component {...pageProps} />
              </AdminLayout>
            ) : (
              <UserLayout>
                <Component {...pageProps} />
              </UserLayout>
            )
          ) : (
            <PublicLayout>
              <Component {...pageProps} />
            </PublicLayout>
          )}
        </AppContext.Provider>
      </AuthContext.Provider>
    </LoadingWrapper>
  );
}

export default SoccerFast;
