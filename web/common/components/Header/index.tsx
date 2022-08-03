import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';

import { AppContext, AuthContext, UserContext } from '@contexts';
import { RoleEnum } from '@enums';
import { MenuPopover } from '../MenuPopover';
import { UserDropdown } from '../UserDropdown';
import { LanguageDropdown } from '../LanguageDropdown';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, setUser, userService } = useContext(UserContext);
  const { setUserToken, userToken, authService } = useContext(AuthContext);
  const { teams, setTeams, tournaments, setTournaments, teamService, tournamentService } = useContext(AppContext);

  const { t } = useTranslation('common');

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
    setUser(null);
    router.push({ pathname: '/' });
  };

  const getUser = async () => {
    if (!user && userToken) {
      setUser(await userService.getUser());
    }
  };

  const getHeaderEntities = () => {
    if (!teams && !tournaments) {
      axios.all([getTeams(), getTournaments()]);
    } else if (!teams) {
      getTeams();
    } else {
      getTournaments();
    }
  };

  useEffect(() => {
    getUser();
    getHeaderEntities();
  }, []);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [userToken]);

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
              items={
                !user || !authService.userHasRole(RoleEnum.Admin)
                  ? tournaments?.filter((tournament) => tournament.active) || []
                  : tournaments || []
              }
              title={t('header.tournaments.title')}
              noItemsText={t('header.tournaments.noItems')}
              goToItem={(id: number) => goToTournament(id)}
              addTitle={user && authService.userHasRole(RoleEnum.Admin) ? t('header.tournaments.add') : undefined}
              announcement="Este Jueves 23 de Junio se realizará la reunión del próximo torneo a partir de las 8PM."
              goToAdd={user && authService.userHasRole(RoleEnum.Admin) ? goToAddTournament : undefined}
            />

            <MenuPopover
              items={
                !user || !authService.userHasRole(RoleEnum.Admin)
                  ? teams?.filter((team) => team.active) || []
                  : teams || []
              }
              title={t('header.teams.title')}
              noItemsText={t('header.teams.noItems')}
              goToItem={(id: number) => goToTeamPage(id)}
              addTitle={user && authService.userHasRole(RoleEnum.Admin) ? t('header.teams.add') : undefined}
              goToAdd={user && authService.userHasRole(RoleEnum.Admin) ? goToAddTeam : undefined}
            />
            <Link href="/gallery" className="text-base font-medium text-gray-500 hover:text-gray-900">
              {t('header.gallery')}
            </Link>

            <Link href="/rules" className="text-base font-medium text-gray-500 hover:text-gray-900">
              {t('header.rules')}
            </Link>
            <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              {t('header.contact')}
            </Link>
          </Popover.Group>
          <div className="flex flex-row items-center justify-end">
            <LanguageDropdown />
            {user ? (
              <UserDropdown user={user} logout={logout} />
            ) : (
              <div className="flex items-center md:ml-12">
                <Link href="/signup" className="text-base font-medium text-gray-600 hover:text-gray-900">
                  {t('header.signup')}
                </Link>
                <Link href="/signin">
                  <button className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-500 hover:bg-sky-600">
                    {t('header.signin')}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};
