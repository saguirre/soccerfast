import { GetServerSideProps, NextPage } from 'next';

import { DotsDivider, LoadingWrapper, PositionsTable } from '@components/*';
import { Tournament } from '@models';

import { useState, useEffect, useContext } from 'react';
import { AppContext } from 'contexts/app.context';
import { useRouter } from 'next/router';
import { AuthContext } from 'contexts/auth.context';
import { RoleEnum } from 'enums/role.enum';

const teams = [
  {
    name: 'C.A. Cerro',
    position: 1,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: '/escudo-cerro.png',
  },
  {
    name: 'Monterrey F.C.',
    position: 2,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: '/escudo-monterrey.png',
  },
  {
    name: 'Beach City',
    position: 3,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: '/escudo-beach-city.png',
  },
  {
    name: 'Racing Club Miami',
    position: 4,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: '/escudo-racing.png',
  },
  {
    name: 'Rio de la Plata F.C.',
    position: 5,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: '/escudo-rio-de-la-plata.png',
  },
  {
    name: 'Furiosos F.C.',
    position: 6,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: '/escudo-furiosos.png',
  },
];

interface PageProps {
  tournamentId: number;
}

const Tournament: NextPage<PageProps> = (props) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const { tournamentService } = useContext(AppContext);
  const router = useRouter();
  const { authService } = useContext(AuthContext);
  const isAdmin = authService.userHasRole(RoleEnum.Admin);

  const getTournament = async (id: number) => {
    setTournament(await tournamentService.getTournament(id));
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      getTournament(Number(props.tournamentId));
    }
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <div className="bg-white h-full w-screen p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="lg:text-center">
            <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase">{tournament?.name}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"></p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Aquí se puede ver toda la información relacionada al torneo {tournament?.name}.
            </p>
          </div>
          <DotsDivider />
          <PositionsTable isAdmin={isAdmin} tournamentTeamScore={tournament?.tournamentTeamScore} />
          <p className="my-4 max-w-2xl text-sm text-gray-500 lg:mx-auto">La tabla se actualiza todos los miércoles.</p>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { tournamentId: context.params?.tournament } };
};

export default Tournament;
