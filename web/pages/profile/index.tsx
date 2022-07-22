import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { authenticatedRoute, LoadingWrapper, Title } from '@components';
import { UserContext } from '@contexts';

interface FormValues {
  about: string;
}

const ProfilePage: NextPage = () => {
  const { t } = useTranslation('pages');
  const { user, setUser, userService } = useContext(UserContext);
  const [newlyUploadedAvatar, setNewlyUploadedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event?.target;
    if (files?.length) {
      setLoadingImageUpload(true);
      const uploadedImage = await userService.uploadAvatar(files[0]);
      if (!uploadedImage) {
        return;
      }
      setUser((current) => {
        if (current) {
          return { ...current, avatar: uploadedImage };
        }
        return user;
      });
      setNewlyUploadedAvatar(uploadedImage);
      setLoadingImageUpload(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
  };

  const getUser = async () => {
    if (!user) {
      const user = await userService.getUser();
      setUser(user);
    }
    setLoading(false);
  };

  const openFileExplorer = () => {
    inputFileRef?.current?.click();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title={t('profile.title')} subtitle={t('profile.subtitle')} />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">{t('profile.info.title')}</h3>
                    <p className="mt-1 text-sm text-gray-500">{t('profile.info.subtitle')}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-row items-center justify-between col-span-3">
                      <div className="w-1/2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          {t('profile.info.name')}
                        </label>
                        <div className="mt-1">
                          <div className="appearance-none block bg-slate-100 text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:ring-0 focus:border focus:border-gray-300 sm:text-sm">
                            {user?.name}
                          </div>
                        </div>
                      </div>
                      <div className="mr-4">
                        <label className="block text-sm font-medium text-gray-700">{t('profile.info.photo')}</label>
                        <div className="mt-1 flex items-center">
                          <div className="flex justify-center items-center bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                            <div>
                              {loadingImageUpload ? (
                                <svg
                                  role="status"
                                  className="inline w-5 h-5 mb-1 text-transparent animate-spin fill-sky-500"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              ) : (
                                <div>
                                  {!newlyUploadedAvatar ? (
                                    <div>
                                      {!user?.avatar ? (
                                        <div>
                                          <svg
                                            className="h-full w-full text-gray-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                          </svg>
                                        </div>
                                      ) : (
                                        <div>
                                          <img src={user.avatar} className="h-full w-full" />
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <img src={newlyUploadedAvatar} className="h-full w-full" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <input
                            ref={inputFileRef}
                            className="hidden"
                            type="file"
                            name="image"
                            id="file"
                            onChange={(e) => handleSetImage(e)}
                          />
                          <button
                            type="button"
                            onClick={openFileExplorer}
                            className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            {t('profile.info.changePhoto')}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between col-span-3">
                      <div className="w-1/2">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          {t('profile.info.email')}
                        </label>
                        <div className="mt-1">
                          <div className="appearance-none block bg-slate-100 text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:ring-0 focus:border focus:border-gray-300 sm:text-sm">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        {t('profile.info.description')}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          {...register('about', {
                            maxLength: {
                              value: 500,
                              message: 'El mensaje es demasiado largo.',
                            },
                          })}
                          rows={3}
                          className="shadow-sm placeholder-slate-300 focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={t('profile.info.descriptionPlaceholder')}
                          defaultValue={''}
                        />
                        {errors.about && <span className="text-sm text-rose-500 mt-1">{errors.about.message}</span>}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{t('profile.info.descriptionNotice')}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="bg-sky-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    {t('profile.info.submit')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default authenticatedRoute(ProfilePage);
