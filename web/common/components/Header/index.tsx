import { Fragment } from "react";
import Image from "next/image";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  ClipboardListIcon,
  ViewGridIcon,
  MenuIcon,
  XIcon,
  StarIcon,
  BadgeCheckIcon,
  LightningBoltIcon,
  SwitchVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const tournaments = [
  {
    name: "Torneo SoccerFast",
    description: "Explora nuestro principal torneo, así como su fixture y tabla de posiciones.",
    href: "#",
    icon: ClipboardListIcon,
  },
  {
    name: "Semifinales",
    description: "Información acerca de las semifinales. Quién pasará a la final?",
    href: "#",
    icon: SwitchVerticalIcon,
  },
  {
    name: "Finales",
    description: "Mira qué equipos son los mejores y cuándo se enfrentan.",
    href: "#",
    icon: LightningBoltIcon,
  },
  {
    name: "Copa de Campeones",
    description: "Toda la información acerca de la prestigiosa Copa de Campeones.",
    href: "#",
    icon: StarIcon,
  },
  {
    name: "Torneos Paralelos",
    description: "Aquí podes encontrar toda la información de nuestros torneos alternativos.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Tabla FairPlay",
    description: "Mira qué equipos son los que mejor comportamiento deportivo tienen en el campeonato.",
    href: "#",
    icon: BadgeCheckIcon,
  },
];

const teams = [
  { name: "C.A. Cerro", imageUrl: "/escudo-cerro.png", href: "#" },
  { name: "Monterrey F.C.", imageUrl: "/escudo-monterrey.png", href: "#" },
  { name: "Beach City", imageUrl: "/escudo-beach-city.png", href: "#" },
  { name: "Racing Club Miami", imageUrl: "/escudo-racing.png", href: "#" },
  { name: "Rio de la Plata F.C.", imageUrl: "/escudo-rio-de-la-plata.png", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Header: React.FC = () => {
  return (
    <Popover className="relative bg-white">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <a href="/" className="flex">
            <span className="sr-only">Workflow</span>
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
                      open ? "text-gray-900" : "text-gray-500",
                      "group bg-white rounded-md px-2 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    )}
                  >
                    <span>Torneos</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
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
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                          {tournaments.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-sky-500 text-white sm:h-12 sm:w-12">
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
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
                      open ? "text-gray-900" : "text-gray-500",
                      "group bg-white rounded-md px-2 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    )}
                  >
                    <span>Equipos</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
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
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
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
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Galería
            </a>

            <Link href="/reglamento" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Reglamento
            </Link>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contacto
            </a>
          </Popover.Group>
          <div className="flex items-center md:ml-12">
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Registrarme
            </a>
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-500 hover:bg-sky-600"
            >
              Ingresar
            </a>
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
                  Existing customer?{" "}
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
