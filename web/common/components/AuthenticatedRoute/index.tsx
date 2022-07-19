import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoadingWrapper } from '@components/LoadingWrapper';
import { AuthContext } from 'contexts/auth.context';

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
          query: 'unauthorized',
        });
        return;
      }

      const validToken = await authService.validateUserToken();
      if (!validToken) {
        router.push({
          pathname: '/',
          query: 'unauthorized',
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
