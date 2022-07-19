import { Fragment, useContext, useState } from 'react';
import Image from 'next/image';

import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon, UserIcon } from '@heroicons/react/solid';
import {
  ClipboardListIcon,
  ViewGridIcon,
  MenuIcon,
  XIcon,
  StarIcon,
  BadgeCheckIcon,
  LightningBoltIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '@utils';
import { AppContext, AuthContext, UserContext } from '@contexts';
import { useEffect } from 'react';
import { Team, Tournament } from '@models/*';
import { MenuPopover } from '../MenuPopover';
import axios from 'axios';

const userNavigation = [
  { name: 'Perfil', href: '/profile' },
  { name: 'Salir', href: '/' },
];

export const PrivateHeader: React.FC = () => {
  const router = useRouter();
  const { user, setUser, userService } = useContext(UserContext);
  const { setUserToken } = useContext(AuthContext);
  const { teamService, tournamentService } = useContext(AppContext);
  const [teams, setTeams] = useState<Team[]>();
  const [tournaments, setTournaments] = useState<Tournament[]>();

  const goToTeamPage = (id: number) => {
    router.push(`/teams/${id}`);
  };

  const getTeams = async () => {
    setTeams(await teamService.getTeams());
  };
  const getTournaments = async () => {
    setTournaments(await tournamentService.getTournaments());
  };

  const goToTournament = (id: number) => {
    router.push(`/tournaments/${id}`);
  };

  const goToAddTeam = () => {
    router.push('/teams/add-team');
  };

  const goToAddTournament = () => {
    router.push('/tournaments/add-tournament');
  };

  const logout = () => {
    localStorage.setItem('access_token', '');
    setUserToken('');
    router.push('/');
  };

  const getUser = async () => {
    if (!user) {
      setUser(await userService.getUser());
    }
  };

  useEffect(() => {
    getUser();
    axios.all([getTeams(), getTournaments()]);
  }, []);

  return (
    <Popover className="relative bg-white">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <Link href="/">
            <div className="flex hover:cursor-pointer">
              <span className="sr-only">SoccerFast</span>
              <Image width={200} height={60} src="/logo-black.svg" alt="Logo" />
            </div>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            <MenuPopover
              items={tournaments || []}
              title="Torneos"
              goToItem={(id: number) => goToTournament(id)}
              addTitle="Agregar torneo"
              announcement="Este Jueves 23 de Junio se realizará la reunión del próximo torneo a partir de las 8PM."
              goToAdd={goToAddTournament}
            />

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-600' : 'text-gray-600',
                      'group bg-white rounded-md px-2 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                    )}
                  >
                    <span>Equipos</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-400' : 'text-gray-600',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 max-h-96 ring-black ring-opacity-5 overflow-y-scroll overflow-x-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-8">
                          <button
                            onClick={goToAddTeam}
                            className="-m-3 p-4 flex flex-row items-center justify-between gap-3 rounded-lg hover:ring-2 hover:ring-sky-500"
                          >
                            <p className="text-md font-medium text-gray-900">Agregar equipo</p>
                            <PlusIcon className="w-6 h-6 text-sky-600" />
                          </button>
                          {teams?.map((team) => (
                            <div
                              key={team.name}
                              onClick={() => goToTeamPage(team?.id)}
                              className="-m-3 p-3 flex flex-row hover:cursor-pointer items-center justify-start gap-3 rounded-lg hover:bg-gray-50"
                            >
                              <img className="h-10 w-10" src={team?.logo} alt={team?.name} />
                              <p className="text-base font-medium text-gray-900">{team?.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <Link href="/gallery" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Galería
            </Link>

            <Link href="/rules" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Reglamento
            </Link>
            <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contacto
            </Link>
          </Popover.Group>
          <div className="flex items-center md:ml-12">
            <Menu as="div" className="ml-4 relative flex-shrink-0">
              <div>
                <Menu.Button className="flex flex-row items-center justify-between hover:ring-2 hover:ring-offset-2 hover:ring-offset-sky-500 rounded-xl hover:ring-white hover:cursor-pointer p-2">
                  <span className="ml-2 mr-3">{user?.name}</span>
                  <span className="sr-only">Open user menu</span>
                  {user?.avatar ? (
                    <div className="flex items-center mr-3 h-11 w-11 justify-center text-sm rounded-full text-white focus:outline-none">
                      <img src={user?.avatar} className="h-full w-full" />
                    </div>
                  ) : (
                    <div className="bg-sky-600 flex p-2 mr-3 items-center justify-center text-sm rounded-full text-white focus:outline-none ">
                      <UserIcon className="h-7 w-7" />
                    </div>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-50 origin-top-right absolute right-6 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => {
                    return (
                      <Link key={item.href} href={item.href}>
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <div
                              onClick={() => item.name == 'Salir' && logout()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block hover:cursor-pointer px-4 py-3 text-md text-gray-700'
                              )}
                            >
                              {item.name}
                            </div>
                          )}
                        </Menu.Item>
                      </Link>
                    );
                  })}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Popover>
  );
};
