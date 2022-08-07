import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { AddButton, LoadingWrapper, NotificationAlert, SubmitButton, Title } from '@components';
import { AuthContext } from '@contexts';
import { useNotification } from '@hooks';

interface PageProps {
  token?: string;
}

const ActivateAccountPage: React.FC<PageProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation(['pages', 'common']);
  const { authService } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const notificationHandler = useNotification();

  const activateAccount = async () => {
    const accountActivationResult = await authService.activateAccount(props.token as string);
    if (!accountActivationResult) {
      notificationHandler.createNotification({
        title: t('common:notification.activateAccountErrorTitle'),
        message: t('common:notification.activateAccountErrorMessage'),
        isError: true,
      });
      router.push({ pathname: '/' });
      return;
    }
    setLoading(false);
    notificationHandler.createNotification({
      title: t('common:notification.activateAccountSuccessTitle'),
      message: t('common:notification.activateAccountSuccessMessage'),
    });

    setTimeout(() => {
      router.push({ pathname: '/signin' });
    }, 7500);
  };

  const validateToken = async (token: string) => {
    const validationResult = await authService.validateActivationToken(token);
    if (!validationResult) {
      notificationHandler.createNotification({
        title: t('common:notification.activateAccountErrorTitle'),
        message: t('common:notification.activateAccountErrorMessage'),
        isError: true,
      });
      router.push({ pathname: '/' });
      return;
    }

    await activateAccount();
  };

  const goToSignIn = () => {
    router.push({ pathname: '/signin' });
  };

  useEffect(() => {
    if (router.isReady) {
      if (props.token?.length) {
        validateToken(props.token);
      } else {
        notificationHandler.createNotification({
          title: t('common:notification.activateAccountErrorTitle'),
          message: t('common:notification.activateAccountErrorMessage'),
          isError: true,
        });
        router.push({ pathname: '/' });
      }
    }
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <div className="h-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
        <Title title={t('pages:activate-account.title')} subtitle={t('pages:activate-account.subtitle')} />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow-md border border-slate-100 sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="text-medium font-regular text-slate-600 py-3">
                  {t('pages:activate-account.redirect')}
                </div>
                <AddButton className="w-1/4" onClick={goToSignIn} text={t('pages:activate-account.signin')} />
              </div>
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

export default ActivateAccountPage;
