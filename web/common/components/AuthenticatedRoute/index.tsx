import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '@contexts';
import { LoadingWrapper } from '@components/LoadingWrapper';

export const authenticatedRoute = (Component: React.FC<any>) => {
  return (props: any) => {
    const router = useRouter();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const { authService } = useContext(AuthContext);

    const checkAuth = async () => {
      setLoadingAuth(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push({
          pathname: '/',
        });
        return;
      }

      const validToken = await authService.validateUserToken();
      if (!validToken) {
        router.push({
          pathname: '/',
        });
        return;
      }

      setLoadingAuth(false);
    };

    useEffect(() => {
      checkAuth();
    }, []);

    return (
      <LoadingWrapper loading={loadingAuth}>
        <Component {...props}></Component>
      </LoadingWrapper>
    );
  };
};
