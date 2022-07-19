import { NextPage } from 'next';

import { useForm, SubmitHandler } from 'react-hook-form';

import {
  authenticatedRoute,
  authorizedRoute,
  LoadingWrapper,
  NotificationAlert,
  SubmitButton,
  Title,
} from '@components';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { AddTournamentModel, Team } from '@models';
import { AppContext } from 'contexts/app.context';
import { ChevronUpIcon, XIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { MouseEvent } from 'react';
import { classNames } from '@utils/*';
import { useNotification } from 'hooks/useNotification.hook';
import { RoleEnum } from 'enums/role.enum';

interface FormValues {
  name: string;
  description?: string;
}

const AddTournamentPage: NextPage = () => {
  const { teamService, tournamentService } = useContext(AppContext);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [filteredTeams, setFilteredTeams] = useState<Team[] | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAddRequest, setLoadingAddRequest] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [isOverSelect, setIsOverSelect] = useState<boolean>(false);
  const { createNotification, notification, showNotification, closeNotification } = useNotification();
  const selectRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const resetFormAndValues = () => {
    reset();
    setSelectedTeams([]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: AddTournamentModel = {
      name: data.name,
      description: data.description,
      teamIds: selectedTeams.map((team: Team) => team.id),
    };

    const addTournamentResult = await tournamentService.addTournament(body);
    setLoadingAddRequest(false);
    if (!addTournamentResult) {
      createNotification({
        title: 'Error',
        message: `Ha ocurrido un error al crear el torneo ${body.name}. Revise los datos e inténtelo nuevamente.`,
        isError: true,
      });
      return;
    }
    resetFormAndValues();
    createNotification({
      title: 'Torneo agregado',
      message: `El torneo ${body.name} fue agregado correctamente!`,
    });
  };

  const getAllTeams = async () => {
    const teams = await teamService.getTeams();
    if (!teams?.length) {
      return;
    }
    setTeams(teams);
    setFilteredTeams(teams);
  };

  const handleSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleRemoveTeam = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, team: Team) => {
    event.preventDefault();
    event.stopPropagation();
    removeTeam(team);
  };

  const removeTeam = (team: Team) => {
    setSelectedTeams((current) => {
      return current.filter((currentTeam: Team) => currentTeam.id !== team.id);
    });
  };

  const getFilteredTeams = async (searchString?: string) => {
    if (!searchString?.length) {
      setFilteredTeams(teams);
    } else {
      setSelectOpen(true);
      setFilteredTeams(await teamService.getFilteredTeams(searchString));
    }
  };

  const handleTeamSelection = (team: Team) => {
    if (selectedTeams.some((selectedTeam: Team) => selectedTeam.id === team.id)) {
      removeTeam(team);
    } else {
      setSelectedTeams((current) => [...current, team]);
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

  useEffect(() => {
    getAllTeams();
    setLoading(false);
  }, []);

  useEffect(() => {
    getFilteredTeams(searchString);
  }, [searchString]);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title="Agregar Torneo" subtitle="Rellena la información para agregar un torneo." />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div onClick={handleFocus} className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">Agregar Torneo</h3>
                    <p className="mt-1 text-sm text-gray-500">Recuerda agregar equipos!</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-row items-center justify-between col-span-3">
                      <div className="w-1/2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nombre
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
                            placeholder="Torneo SoccerFast"
                            autoComplete="name"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
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
                          placeholder="Descripción del torneo"
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
                      Equipos
                    </label>
                    <div
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={handleMouseEnter}
                      className="col-span-12 flex flex-col items-center h-32 mx-auto"
                    >
                      <div className="w-full">
                        <div className="flex flex-col items-center relative">
                          <div className="w-full">
                            <div
                              ref={selectRef}
                              onClick={() => setSelectOpen((current) => !current)}
                              className="my-2 p-1 flex border border-gray-300 shadow-sm bg-white rounded-md"
                            >
                              <div className="flex flex-auto flex-wrap">
                                {selectedTeams?.map((team: Team, index: number) => (
                                  <div
                                    key={index}
                                    className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-sky-500 ring-1 ring-sky-500 "
                                  >
                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                      {team?.name}
                                    </div>
                                    <div className="flex flex-auto flex-row-reverse">
                                      <div onClick={(event) => handleRemoveTeam(event, team)}>
                                        <XIcon className="feather feather-x cursor-pointer text-sky-500 hover:text-sky-400 rounded-full w-4 h-4 ml-2" />
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                <div className="flex-1">
                                  <input
                                    value={searchString}
                                    onChange={handleSearchStringChange}
                                    placeholder={'Escribe para buscar entre los equipos...'}
                                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800 placeholder:text-gray-300 placeholder:text-base "
                                  />
                                </div>
                              </div>
                              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                                <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                  {selectOpen ? (
                                    <ChevronUpIcon className="feather feather-chevron-up w-4 h-4" />
                                  ) : (
                                    <ChevronDownIcon className="feather feather-chevron-up w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                          {selectOpen && (
                            <div className="absolute shadow mt-14 bg-white z-40 w-full left-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                              <div className="flex flex-col w-full">
                                {filteredTeams?.map((team: Team, index: number) => (
                                  <div
                                    key={index}
                                    onClick={() => handleTeamSelection(team)}
                                    className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-sky-100"
                                  >
                                    <div
                                      className={classNames(
                                        selectedTeams.some((selectedTeam: Team) => team.id === selectedTeam.id)
                                          ? 'border-l-4 border-sky-500'
                                          : '',
                                        'flex w-full items-center p-2 pl-2 border-transparent  relative '
                                      )}
                                    >
                                      <div className="w-full items-center flex">
                                        <div className="mx-2 leading-6  ">{team?.name} </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-end items-end px-4 py-3 text-right sm:px-6">
                  <div className="w-1/4">
                    <SubmitButton text={'Guardar'} loading={loadingAddRequest} errors={errors} />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <NotificationAlert
            notification={notification}
            show={showNotification}
            onClose={closeNotification}
          ></NotificationAlert>
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default authenticatedRoute(authorizedRoute(AddTournamentPage, RoleEnum.Admin));
