import { useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { SubmitHandler } from 'react-hook-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NotificationAlert, SocialNetworkSignIn, Title } from '@components';
import { AuthContext } from '@contexts';
import { SignInForm } from '@features';
import { useNotification } from '@hooks';
import { User } from 'models/user';
import { AxiosError, AxiosResponse } from 'axios';

interface FormValues {
  email: string;
  password: string;
}

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['common', 'pages']);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const { setUserToken, authService } = useContext(AuthContext);
  const notificationHandler = useNotification();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingRequest(true);
    const userResponse = await authService.login(data);
    setLoadingRequest(false);
    if (!userResponse) {
      notificationHandler.createNotification({
        title: t('common:notification.signInErrorTitle'),
        message: t('common:notification.signInErrorMessage'),
        isError: true,
      });
      return;
    } else if (userResponse?.status === 403 || userResponse.response?.status === 403) {
      notificationHandler.createNotification({
        title: t('common:notification.signInErrorTitle'),
        message: t('common:notification.accountNotActivatedErrorMessage'),
        isError: true,
      });
    } else {
      notificationHandler.createNotification({
        title: t('common:notification.signInSuccessTitle'),
        message: t('common:notification.signInSuccessMessage'),
      });
      localStorage.setItem('access_token', userResponse.data.token);

      setTimeout(() => {
        setUserToken(userResponse.data.token);
        router.push({ pathname: '/' });
      }, 2000);
    }
  };

  return (
    <>
      <div className="h-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
        <Title title={t('pages:signin.title')} subtitle={t('pages:signin.subtitle')} />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md border border-slate-100 sm:rounded-lg sm:px-10">
            <div className="mt-2">
              <SignInForm submit={onSubmit} loadingSubmit={loadingRequest} />
            </div>
            <SocialNetworkSignIn continueWith={t('pages:signin.form.continueWith')} />
          </div>
        </div>
        <NotificationAlert {...notificationHandler}></NotificationAlert>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default SignInPage;
