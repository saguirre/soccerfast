import { GetServerSideProps, NextPage } from 'next';

import { useForm, SubmitHandler } from 'react-hook-form';

import {
  authenticatedRoute,
  authorizedRoute,
  LoadingWrapper,
  MultiSelect,
  NotificationAlert,
  SubmitButton,
  Title,
} from '@components';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { AddTournamentModel, Team, Tournament, UpdateTournamentModel } from '@models';
import { AppContext } from 'contexts/app.context';
import { ChevronUpIcon, XIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { MouseEvent } from 'react';
import { classNames } from '@utils/*';
import { useNotification } from 'hooks/useNotification.hook';
import { RoleEnum } from 'enums/role.enum';
import axios from 'axios';

interface FormValues {
  name: string;
  description?: string;
}

interface PageProps {
  tournamentId: number;
}

const EditTournamentPage: NextPage<PageProps> = (props) => {
  const { teamService, tournamentService } = useContext(AppContext);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
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
  } = useForm<FormValues>({ mode: 'all' });

  const resetFormAndValues = () => {
    reset();
    setSelectedTeams([]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: UpdateTournamentModel = {
      name: data.name,
      description: data.description,
      teamIds: selectedTeams.map((team: Team) => team.id),
    };

    const addTournamentResult = await tournamentService.updateTournament(props.tournamentId, body);
    setLoadingAddRequest(false);
    if (!addTournamentResult) {
      createNotification({
        title: 'Error',
        message: `Ha ocurrido un error al actualizar el torneo ${body.name}. Revise los datos e inténtelo nuevamente.`,
        isError: true,
      });
      return;
    }
    createNotification({
      title: 'Torneo actualizado',
      message: `El torneo ${body.name} fue actualizad correctamente!`,
    });
  };

  const handleSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleRemoveTeam = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    removeTeam(id);
  };

  const removeTeam = (id: number) => {
    setSelectedTeams((current) => {
      return current.filter((currentTeam: Team) => currentTeam.id !== id);
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

  const handleTeamSelection = (id: number) => {
    if (selectedTeams.some((selectedTeam: Team) => selectedTeam.id === id)) {
      removeTeam(id);
    } else {
      const team = teams?.find((teamInArray: Team) => teamInArray.id === id);
      if (team) {
        setSelectedTeams((current) => [...current, team]);
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

  const getAllTeams = async () => {
    const teams = await teamService.getTeams();
    if (!teams?.length) {
      return;
    }
    setTeams(teams);
    setFilteredTeams(teams);
  };

  const getTournament = async (id: number) => {
    const tournament = await tournamentService.getTournament(id);
    console.log(tournament);
    setTournament(await tournamentService.getTournament(id));
  };

  useEffect(() => {
    axios.all([getTournament(props.tournamentId), getAllTeams()]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const tournamentTeamIds = tournament?.tournamentTeamScore?.map((teamScore) => teamScore.teamId);
    const tournamentTeams = teams?.filter((team: Team) =>
      tournamentTeamIds?.some((tournamentTeam: number) => tournamentTeam === team.id)
    );
    setSelectedTeams(tournamentTeams || []);
  }, [tournament, teams]);

  useEffect(() => {
    getFilteredTeams(searchString);
  }, [searchString]);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title="Editar Torneo" subtitle="Visualiza y edita la información del torneo." />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div onClick={handleFocus} className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">Editar Torneo</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Modifica la siguiente información. Recuarda presionar Guardar para salvar tus cambios!
                    </p>
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
                            defaultValue={tournament?.name}
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
                          defaultValue={tournament?.description}
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
                    <MultiSelect
                      handleMouseLeave={handleMouseLeave}
                      handleMouseEnter={handleMouseEnter}
                      ref={selectRef}
                      toggleDropdown={(value: boolean | undefined) => setSelectOpen(value || false)}
                      handleRemove={(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: number) =>
                        handleRemoveTeam(event, id)
                      }
                      placeholder="Buscar..."
                      handleItemSelection={(id: number) => handleTeamSelection(id)}
                      open={selectOpen}
                      selectedItems={selectedTeams}
                      items={filteredTeams || []}
                      searchString={searchString}
                      handleSearchStringChange={handleSearchStringChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-end items-end px-4 py-3 text-right sm:px-6">
                  <div className="w-1/4">
                    <SubmitButton text={'Guardar'} loading={loadingAddRequest} errors={{}} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { tournamentId: context.params?.id } };
};

export default authenticatedRoute(authorizedRoute(EditTournamentPage, RoleEnum.Admin));
