import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NotificationAlert, SocialNetworkSignIn, Title } from '@components';
import { AuthContext } from '@contexts';
import { SignUpForm } from '@features';
import { useNotification } from '@hooks';
import { AddUserModel } from '@models';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation(['pages', 'common']);
  const { authService } = useContext(AuthContext);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const notificationHandler = useNotification();

  const onSubmit = async (data: any) => {
    setLoadingRequest(true);
    const body: AddUserModel = {
      name: data.name,
      email: data.email,
      password: data.password,
      type: 'Email',
    };
    const response = await authService.signUp(body);
    setLoadingRequest(false);
    if (!response) {
      notificationHandler.createNotification({
        title: t('common:notification.signUpErrorTitle'),
        message: t('common:notification.signUpErrorMessage'),
        isError: true,
      });
      return;
    }
    notificationHandler.createNotification({
      title: t('common:notification.signUpSuccessTitle'),
      message: t('common:notification.signUpSuccessMessage'),
    });

    setTimeout(() => {
      router.push({ pathname: '/signin' });
    }, 2000);
  };

  return (
    <>
      <div className="h-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
        <Title title={t('pages:signup.title')} subtitle={t('pages:signup.subtitle')} />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow-md border border-slate-100 sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <SignUpForm submit={onSubmit} loadingSubmit={loadingRequest} />
              <SocialNetworkSignIn continueWith={t('pages:signup.form.continueWith')} />
            </div>
          </div>
        </div>
      </div>
      <NotificationAlert {...notificationHandler}></NotificationAlert>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default SignUpPage;
