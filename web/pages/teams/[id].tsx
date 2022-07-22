import { GetServerSideProps, NextPage } from 'next';

import { useForm, SubmitHandler } from 'react-hook-form';

import { authorizedRoute, LoadingWrapper, MultiSelect, NotificationAlert, SubmitButton, Title } from '@components';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { UserContext } from 'contexts/user.context';
import { useEffect } from 'react';
import { Team, UpdateTeamModel, User } from '@models';
import { AppContext } from 'contexts/app.context';
import { MouseEvent } from 'react';
import { useNotification } from 'hooks/useNotification.hook';
import { useRouter } from 'next/router';
import axios from 'axios';
import { RoleEnum } from 'enums/role.enum';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface FormValues {
  name: string;
  description?: string;
}

interface PageProps {
  teamId: number;
}

const TeamPage: NextPage<PageProps> = (props) => {
  const { t } = useTranslation(['pages', 'common']);
  const { teamService } = useContext(AppContext);
  const { userService } = useContext(UserContext);
  const [users, setUsers] = useState<User[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [newlyUploadedLogo, setNewlyUploadedLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
  const [loadingAddRequest, setLoadingAddRequest] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [isOverSelect, setIsOverSelect] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const notificationHandler = useNotification();
  const selectRef = useRef<HTMLDivElement>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });
  const router = useRouter();
  const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event?.target;
    if (files?.length) {
      setLoadingImageUpload(true);
      const uploadedImage = await teamService.uploadLogo(files[0]);
      if (!uploadedImage) {
        return;
      }
      setNewlyUploadedLogo(uploadedImage);
      setLoadingImageUpload(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: UpdateTeamModel = {
      name: data.name,
      description: data.description,
      logo: newlyUploadedLogo ? newlyUploadedLogo : team?.logo,
      ownerId: selectedUsers[0].id,
    };

    if (team?.id) {
      const updateTeamResult = await teamService.updateTeam(team?.id, body);
      setLoadingAddRequest(false);
      if (!updateTeamResult) {
        notificationHandler.createNotification({
          title: t('common:notification.updateErrorTitle'),
          message: t('common:notification.updateErrorMessage', { entity: body.name }),
          isError: true,
        });
        return;
      }
      setTeam(updateTeamResult);
      setNewlyUploadedLogo(null);
      notificationHandler.createNotification({
        title: t('common:notification.updateSuccessTitle', { entity: t('common:entity.team') }),
        message: t('common:notification.updateSuccessMessage', { entity: body.name }),
      });
    }
  };

  const openFileExplorer = () => {
    inputFileRef?.current?.click();
  };

  const getAllUsers = async () => {
    const users = await userService.getUsers();
    if (!users?.length) {
      return;
    }
    setUsers(users);
    setFilteredUsers(users);
  };

  const handleSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleRemoveUser = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    removeUser(id);
  };

  const removeUser = (id: number) => {
    setSelectedUsers((current) => {
      return current.filter((currentUser: User) => currentUser.id !== id);
    });
  };

  const getFilteredUsers = async (searchString?: string) => {
    if (!searchString?.length) {
      setFilteredUsers(users);
    } else {
      setSelectOpen(true);
      setFilteredUsers(await userService.getFilteredUsers(searchString));
    }
  };

  const handleUserSelection = (id: number) => {
    if (selectedUsers.some((selectedUser: User) => selectedUser.id === id)) {
      removeUser(id);
    } else {
      const user = users?.find((userInArray: User) => userInArray.id === id);
      if (user) {
        setSelectedUsers((current) => [...current, user]);
      }
    }
  };

  const handleMouseEnter = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOverSelect(true);
  };

  const handleMouseLeave = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOverSelect(false);
  };

  const handleFocus = (event: MouseEvent) => {
    if (!isOverSelect) {
      setSelectOpen(false);
    }
  };

  const getTeam = async () => {
    setTeam(await teamService.getTeam(Number(props.teamId)));
  };

  useEffect(() => {
    axios.all([getAllUsers(), getTeam()]);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTeam();
    setLoading(false);
  }, [props.teamId]);

  useEffect(() => {
    const owner = users?.find((user: User) => user.id === team?.ownerId);
    if (owner) setSelectedUsers([owner]);
  }, [team]);

  useEffect(() => {
    getFilteredUsers(searchString);
  }, [searchString]);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title={t('team.title')} subtitle={t('team.subtitle')} />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div onClick={handleFocus} className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">
                      {t('team.form.title')} {team?.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{t('team.form.subtitle')}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-row items-center justify-between col-span-3">
                      <div className="w-1/2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          {t('team.form.name')}
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            type="name"
                            defaultValue={team?.name || ''}
                            {...register('name', {
                              required: 'El nombre del equipo es requerido',
                              minLength: {
                                value: 1,
                                message: 'El nombre es demasiado corto, debe tener al menos 1 caracter.',
                              },
                              maxLength: { value: 50, message: 'El nombre es demasiado largo.' },
                            })}
                            placeholder={t('team.form.namePlaceholder')}
                            autoComplete="name"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                          {errors.name && <span className="text-sm text-rose-500 mt-1">{errors.name.message}</span>}
                        </div>
                      </div>
                      <div className="mr-4">
                        <label className="block text-sm font-medium text-gray-700">{t('team.form.photo')}</label>
                        <div className="mt-1 flex items-center">
                          <div className="flex justify-center items-center rounded-full overflow-hidden h-12 w-12">
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
                                  {!newlyUploadedLogo ? (
                                    <div>
                                      {!team?.logo ? (
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
                                        <img src={team.logo} />
                                      )}
                                    </div>
                                  ) : (
                                    <img src={newlyUploadedLogo} className="h-full w-full" />
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
                            {t('team.form.changePhoto')}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        {t('team.form.description')}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          defaultValue={team?.description || ''}
                          {...register('description', {
                            maxLength: {
                              value: 500,
                              message: 'El mensaje es demasiado largo.',
                            },
                          })}
                          rows={3}
                          className="shadow-sm placeholder-slate-300 focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={t('team.form.descriptionPlaceholder')}
                        />
                        {errors.description && (
                          <span className="text-sm text-rose-500 mt-1">{errors.description.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <MultiSelect
                    handleMouseLeave={handleMouseLeave}
                    handleMouseEnter={handleMouseEnter}
                    ref={selectRef}
                    toggleDropdown={(value: boolean | undefined) => setSelectOpen(value || false)}
                    handleRemove={(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) =>
                      handleRemoveUser(event, id)
                    }
                    handleItemSelection={(id: number) => handleUserSelection(id)}
                    open={selectOpen}
                    selectedItems={selectedUsers}
                    items={filteredUsers || []}
                    searchString={searchString}
                    handleSearchStringChange={handleSearchStringChange}
                  />
                </div>
                <div className="flex flex-row justify-end items-end px-4 py-3 text-right sm:px-6">
                  <div className="w-1/4">
                    <SubmitButton text={t('team.form.submit')} loading={loadingAddRequest} errors={errors} />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <NotificationAlert {...notificationHandler}></NotificationAlert>
        </div>
      </LoadingWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  return { props: { teamId: params?.id, ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default authorizedRoute(TeamPage, RoleEnum.Admin);
