import { Team } from '@models/*';
import { AppContext } from 'contexts/app.context';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const images = [
  {
    title: 'C.A. Cerro',
    description: '',
    href: '/gallery/ca-cerro',
    source: '/escudo-cerro.png',
  },
  {
    title: 'Monterrey F.C.',
    description: '',
    href: '/gallery/monterrey-fc',
    source: '/escudo-monterrey.png',
  },
  {
    title: 'Beach City',
    description: '',
    href: '/gallery/beach-city-fc',
    source: '/escudo-beach-city.png',
  },
  {
    title: 'Racing Club Miami',
    description: '',
    href: '/racing-club-miami',
    source: '/escudo-racing.png',
  },
];

export const TeamGallery: React.FC = () => {
  const router = useRouter();
  const goToImageGallery = (id: string) => {
    router.push({ pathname: `/gallery/${id}` });
  };
  const { teamService } = useContext(AppContext);
  const [teams, setTeams] = useState<Team[]>();
  const getTeams = async () => {
    setTeams(await teamService.getTeams());
  };

  useEffect(() => {
    if (router.isReady) {
      getTeams();
    }
  }, []);

  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {teams?.map((team: Team, index: number) => (
        <li key={team.id} className="relative">
          <div
            onClick={() => goToImageGallery(String(team.id))}
            className="group flex items-center justify-center rounded-lg hover:border-slate-400 border border-slate-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-sky-500 overflow-hidden"
          >
            <img src={team.logo} alt="" className="h-96 aspect-square pointer-events-none group-hover:opacity-75 p-4" />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {team.name}</span>
            </button>
          </div>
          <p className="mt-2 block text-medium font-medium text-gray-900 truncate pointer-events-none">{team.name}</p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">{team.description}</p>
        </li>
      ))}
    </ul>
  );
};
