import '../styles/globals.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { LoadingWrapper } from '@components';
import { AdminLayout, PublicLayout, UserLayout } from '@layouts';
import { AppContext, AuthContext, UserContext } from '@contexts';
import { AuthService, TeamService, ContactInfoService, RuleService, TournamentService, UserService } from '@services';
import { User } from '@models';

function SoccerFast({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const authService = new AuthService();
  const authContextProps = { userToken, setUserToken, authService };
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const userService = new UserService();
  const userContextProps = { user, setUser, userService };
  const tournamentService = new TournamentService();
  const teamService = new TeamService();
  const ruleService = new RuleService();
  const contactInfoService = new ContactInfoService();
  const appContextProps = { tournamentService, teamService, ruleService, contactInfoService };

  useEffect(() => {
    if (router.isReady) {
      setTimeout(() => {
        const token = localStorage.getItem('access_token');
        setUserToken(token as string);
        setUserIsAdmin(true);
        setLoading(false);
      }, 250);
    }
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <AuthContext.Provider value={authContextProps}>
        <UserContext.Provider value={userContextProps}>
          <AppContext.Provider value={appContextProps}>
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
        </UserContext.Provider>
      </AuthContext.Provider>
    </LoadingWrapper>
  );
}

export default SoccerFast;
