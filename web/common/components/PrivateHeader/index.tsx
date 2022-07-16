import { Fragment, useContext, useState } from 'react';
import Image from 'next/image';

import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/solid';
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
import { AuthContext, UserContext } from '@contexts';
import { User } from '@models';
import { useEffect } from 'react';

const userNavigation = [
  { name: 'Perfil', href: '/profile' },
  { name: 'Salir', href: '/' },
];

const tournaments = [
  {
    name: 'Torneo SoccerFast',
    description: 'Explora nuestro principal torneo, así como su fixture y tabla de posiciones.',
    href: '/tournaments/soccerfast',
    icon: ClipboardListIcon,
  },
  {
    name: 'Semifinales',
    description: 'Información acerca de las semifinales. Quién pasará a la final?',
    href: '/tournaments/semifinales',
    icon: SwitchVerticalIcon,
  },
  {
    name: 'Finales',
    description: 'Mira qué equipos son los mejores y cuándo se enfrentan.',
    href: '/tournaments/finales',
    icon: LightningBoltIcon,
  },
  {
    name: 'Copa de Campeones',
    description: 'Toda la información acerca de la prestigiosa Copa de Campeones.',
    href: '/tournaments/copa-de-campeones',
    icon: StarIcon,
  },
  {
    name: 'Torneos Paralelos',
    description: 'Aquí podes encontrar toda la información de nuestros torneos alternativos.',
    href: '/torneos/paralelos',
    icon: ViewGridIcon,
  },
  {
    name: 'Tabla FairPlay',
    description: 'Mira qué equipos son los que mejor comportamiento deportivo tienen en el campeonato.',
    href: '#',
    icon: BadgeCheckIcon,
  },
];

const teams = [
  { name: 'C.A. Cerro', imageUrl: '/escudo-cerro.png', href: '#' },
  { name: 'Monterrey F.C.', imageUrl: '/escudo-monterrey.png', href: '#' },
  { name: 'Beach City', imageUrl: '/escudo-beach-city.png', href: '#' },
  { name: 'Racing Club Miami', imageUrl: '/escudo-racing.png', href: '#' },
  { name: 'Rio de la Plata F.C.', imageUrl: '/escudo-rio-de-la-plata.png', href: '#' },
  { name: 'Furiosos F.C.', imageUrl: '/escudo-furiosos.png', href: '#' },
];

export const PrivateHeader: React.FC = () => {
  const router = useRouter();
  const { userService } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);
  const { setUserToken } = useContext(AuthContext);
  const goToTournament = (href: string) => {
    router.push(href);
  };

  const logout = () => {
    localStorage.setItem('access_token', '');
    setUserToken('');
    router.push('/');
  };

  const getUser = async () => {
    setUser(await userService.getUser());
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Popover className="relative bg-white">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <a href="/" className="flex">
            <span className="sr-only">SoccerFast</span>
            <Image width={200} height={60} src="/logo-black.svg" alt="Logo" />
          </a>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-500' : 'text-gray-600',
                      'group bg-white rounded-md px-2 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                    )}
                  >
                    <span>Torneos</span>
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
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll overflow-x-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                          {tournaments.map((item) => (
                            <div
                              key={item.name}
                              onClick={() => goToTournament(item.href)}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-sky-500 text-white sm:h-12 sm:w-12">
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-5 bg-gray-50 sm:p-8">
                          <div className="-m-3 p-3 flow-root rounded-md">
                            <div className="flex items-center">
                              <div className="text-base font-medium text-gray-900">Anuncio</div>
                              <span className="ml-1 inline-flex items-center py-0.5 px-2.5 rounded-full text-xs font-medium leading-5 bg-sky-100 text-sky-800">
                                {/* <InformationCircleIcon className="w-4 h-4"/> */}!
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Este Jueves 23 de Junio se realizará la reunión del próximo torneo a partir de las 8PM.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

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
                          {teams.map((team) => (
                            <a
                              key={team.name}
                              href={team.href}
                              className="-m-3 p-3 flex flex-row items-center justify-start gap-3 rounded-md hover:bg-gray-50"
                            >
                              <img className="h-10 w-10" src={team.imageUrl} alt={team.name} />
                              <p className="text-base font-medium text-gray-900">{team.name}</p>
                            </a>
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
                  <div className="bg-sky-600 flex p-2 mr-3 items-center justify-center text-sm rounded-full text-white focus:outline-none ">
                    <UserIcon className="h-7 w-7" />
                  </div>
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
                  {userNavigation.map((item) => (
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
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-sky-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-6">
                  {tournaments.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-sky-500 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Pricing
                </a>

                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>

                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Enterprise
                </a>
                {teams.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-sky-600 hover:text-sky-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
