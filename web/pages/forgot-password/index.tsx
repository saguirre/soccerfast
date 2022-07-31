import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { LoadingWrapper, NotificationAlert, Title } from '@components';
import { AuthContext } from '@contexts';
import { ChangePasswordForm, ForgotPasswordForm } from '@features';
import { useNotification } from '@hooks';
import { PasswordRecoveryModel, ChangePasswordModel } from '@models';

interface PageProps {
  token?: string;
}

const ForgotPasswordPage: React.FC<PageProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation(['pages', 'common']);
  const { authService } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const notificationHandler = useNotification();

  const forgotPasswordSubmit = async (data: any) => {
    setLoadingRequest(true);
    const body: PasswordRecoveryModel = {
      email: data.email,
    };

    authService.recoverPassword(body);
    setLoadingRequest(false);

    notificationHandler.createNotification({
      title: t('common:notification.passwordResetSuccessTitle'),
      message: t('common:notification.passwordResetSuccessMessage'),
      duration: 10000,
    });
  };

  const changePasswordSubmit = async (data: any) => {
    setLoadingRequest(true);
    const body: ChangePasswordModel = {
      password: data.password,
    };

    const changePasswordResult = await authService.changePassword(props.token as string, body);
    if (!changePasswordResult) {
      notificationHandler.createNotification({
        title: t('common:notification.changePasswordErrorTitle'),
        message: t('common:notification.changePasswordErrorMessage'),
        isError: true,
      });
    }
    setLoadingRequest(false);

    notificationHandler.createNotification({
      title: t('common:notification.changePasswordSuccessTitle'),
      message: t('common:notification.changePasswordSuccessMessage'),
      duration: 10000,
    });
  };

  const validateToken = async (token: string) => {
    const validationResult = await authService.validateRecoveryToken(token);
    console.log('validationResult: ', validationResult);
    if (!validationResult) {
      router.push({ pathname: '/' });
      return;
    }
    setTokenValidated(true);
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      if (props.token?.length) {
        validateToken(props.token);
      } else {
        setLoading(false);
      }
    }
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <div className="h-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
        <Title
          title={!tokenValidated ? t('pages:forgot-password.title') : t('pages:forgot-password.changeTitle')}
          subtitle={!tokenValidated ? t('pages:forgot-password.subtitle') : t('pages:forgot-password.changeSubtitle')}
        />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow-md border border-slate-100 sm:rounded-lg sm:px-10">
            <div className="mt-6">
              {!tokenValidated && <ForgotPasswordForm submit={forgotPasswordSubmit} loadingSubmit={loadingRequest} />}
              {tokenValidated && <ChangePasswordForm submit={changePasswordSubmit} loadingSubmit={loadingRequest} />}
            </div>
          </div>
        </div>
      </div>
      <NotificationAlert {...notificationHandler}></NotificationAlert>
    </LoadingWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const token = query?.token;
  return { props: { token: token || '', ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default ForgotPasswordPage;
