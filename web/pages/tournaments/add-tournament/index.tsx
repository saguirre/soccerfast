import { useContext, useRef, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  authenticatedRoute,
  authorizedRoute,
  LoadingWrapper,
  FormMultiSelect,
  NotificationAlert,
  SubmitButton,
  Title,
} from '@components';
import { AppContext } from '@contexts';
import { RoleEnum } from '@enums';
import { useNotification, useMultiSelect } from '@hooks';
import { AddTournamentModel, Team } from '@models';

interface FormValues {
  name: string;
  description?: string;
}

const AddTournamentPage: NextPage = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { setTournaments, teamService, tournamentService } = useContext(AppContext);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAddRequest, setLoadingAddRequest] = useState<boolean>(false);
  const notificationHandler = useNotification();
  const selectRef = useRef<HTMLDivElement>(null);
  const select = useMultiSelect(teamService.getFilteredTeams);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const resetFormAndValues = () => {
    reset();
    select.setSelectedItems([]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: AddTournamentModel = {
      name: data.name,
      description: data.description,
      teamIds: select.selectedItems.map((team: Team) => team.id),
    };

    const addTournamentResult = await tournamentService.addTournament(body);
    setLoadingAddRequest(false);
    if (!addTournamentResult) {
      notificationHandler.createNotification({
        title: t('common:notification.addErrorTitle', { entity: t('common:entity.tournament') }),
        message: t('common:notification.addErrorMessage', { entity: body.name }),
        isError: true,
      });
      return;
    }

    setTournaments((current) => {
      if (current) return [...current, addTournamentResult];
    });

    resetFormAndValues();
    notificationHandler.createNotification({
      title: t('common:notification.addSuccessTitle', { entity: t('common:entity.tournament') }),
      message: t('common:notification.addSuccessMessage', { entity: body.name }),
    });
  };

  const getAllTeams = async () => {
    const teams = await teamService.getTeams();
    if (!teams?.length) {
      return;
    }
    setTeams(teams);
    select.setItems(teams);
    select.setFilteredItems(teams);
  };

  useEffect(() => {
    getAllTeams();
    setLoading(false);
  }, []);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title={t('pages:addTournament.title')} subtitle={t('pages:addTournament.subtitle')} />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div onClick={select.handleFocus} className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:overflow-visible">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">
                      {t('pages:addTournament.form.title')}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{t('pages:addTournament.form.subtitle')}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-row items-center justify-between col-span-3">
                      <div className="w-1/2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          {t('pages:addTournament.form.name')}
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            type="name"
                            {...register('name', {
                              required: 'El nombre del torneo es requerido',
                              minLength: {
                                value: 1,
                                message: 'El nombre es demasiado corto, debe tener al menos 1 caracter.',
                              },
                              maxLength: { value: 50, message: 'El nombre es demasiado largo.' },
                            })}
                            placeholder={t('pages:addTournament.form.namePlaceholder')}
                            autoComplete="name"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        {t('pages:addTournament.form.description')}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          {...register('description', {
                            maxLength: {
                              value: 500,
                              message: 'La descripción es demasiado largo.',
                            },
                          })}
                          rows={3}
                          className="shadow-sm placeholder-slate-300 focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={t('pages:addTournament.form.descriptionPlaceholder')}
                          defaultValue={''}
                        />
                        {errors.description && (
                          <span className="text-sm text-rose-500 mt-1">{errors.description.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {t('pages:addTournament.form.teams')}
                    </label>
                    <FormMultiSelect ref={selectRef} {...select} items={select.filteredItems} />
                  </div>
                </div>
                <div className="flex flex-row justify-end items-end px-4 py-3 text-right sm:px-6">
                  <div className="w-1/4">
                    <SubmitButton
                      text={t('pages:addTournament.form.submit')}
                      loading={loadingAddRequest}
                      readonly={!errors}
                    />
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) },
  };
};

export default authenticatedRoute(authorizedRoute(AddTournamentPage, RoleEnum.Admin));
