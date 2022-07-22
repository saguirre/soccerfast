import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LoadingWrapper } from '@components/LoadingWrapper';
import { AuthContext } from '@contexts';
import { RoleEnum } from '@enums';

export const authorizedRoute = (Component: React.FC<any>, role: RoleEnum) => {
  return (props: any) => {
    const router = useRouter();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const { authService } = useContext(AuthContext);

    const checkForRole = async (role: RoleEnum) => {
      setLoadingAuth(true);
      const hasRole = authService.userHasRole(role);
      if (!hasRole) {
        router.push({
          pathname: '/',
        });
      }

      setLoadingAuth(false);
    };

    useEffect(() => {
      checkForRole(role);
    }, []);

    return (
      <LoadingWrapper loading={loadingAuth}>
        <Component {...props}></Component>
      </LoadingWrapper>
    );
  };
};
