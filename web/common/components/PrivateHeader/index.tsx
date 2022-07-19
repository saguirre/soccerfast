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
    router.push({ pathname: `/teams/${id}` });
  };

  const getTeams = async () => {
    setTeams(await teamService.getTeams());
  };
  const getTournaments = async () => {
    setTournaments(await tournamentService.getTournaments());
  };

  const goToTournament = (id: number) => {
    router.push({ pathname: `/tournaments/${id}` });
  };

  const goToAddTeam = () => {
    router.push({ pathname: '/teams/add-team' });
  };

  const goToAddTournament = () => {
    router.push({ pathname: '/tournaments/add-tournament' });
  };

  const logout = () => {
    localStorage.setItem('access_token', '');
    setUserToken('');
    router.push({ pathname: '/' });
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

            <MenuPopover
              items={teams || []}
              title="Equipos"
              goToItem={(id: number) => goToTeamPage(id)}
              addTitle="Agregar equipo"
              goToAdd={goToAddTeam}
            />
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
