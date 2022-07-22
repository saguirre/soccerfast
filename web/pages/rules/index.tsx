import { GetServerSideProps, NextPage } from 'next';

import { AnnotationIcon, ChevronDownIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { DotsDivider } from '@components';

const articles = [
  {
    name: 'Artículo 1',
    title: 'Datos del Equipo',
    content: [
      { title: 'Nombre del Equipo', description: '' },
      { title: 'Encargado', description: '' },
      { title: 'Teléfonos', description: '' },
      { title: 'Email del Equipo', description: '' },
      {
        title: 'Indumentaria',
        description: 'Se requiere al menos una indumentaria. La misma deberá estar en condiciones.',
      },
      { title: 'Lista de Jugadores', description: 'Se permite hasta un máximo de 25 jugadores por equipo' },
      { title: 'Waiver del Equipo y de menor notarizados', description: '' },
      {
        title: 'Inscripción',
        description:
          'Se deberá abonar $350 por la inscripción (hasta la 5ta fecha), más un depósito de $300 antes del comienzo del torneo.',
      },
    ],
    contentDescription: '',
    icon: GlobeAltIcon,
  },
  {
    name: 'Artículo 2',
    title: 'Reglamento del Partido',
    content: [
      { title: 'El equipo debe estar en la cancha a la hora fijada por la organización.', description: '' },
      {
        title: 'Presentar la lista de jugadores diaria antes del comienzo del encuentro.',
        description:
          'El director tecnico, encargado o persona encargada deberá presentar la lista de jugadores diaria antes del comienzo del encuentro. Deberá ponerse el número antes del partido.',
      },
      {
        title: 'Cada equipo tendrá la opción de efectuar 3 paradas por tiempo (con cambios ilimitados).',
        description: 'En el entretiempo se pueden realizar cambios.',
      },
      {
        title: 'Los tiempos serán de 35 minutos cada uno, con un descanso de 5 minutos.',
        description: '',
      },
      {
        title: 'Los tiempos serán de 35 minutos cada uno, con un descanso de 5 minutos.',
        description: '',
      },
      {
        title: 'Aquel jugador que sea expulsado no podrá permanecer en el banco de suplentes.',
        description: '',
      },
      {
        title: 'Los jugadores deberán avisar cada cambio al Sr. Lineman.',
        description: '',
      },
      {
        title: 'Los equipos podrán fichar jugadores hasta la 5ta fecha del torneo.',
        description:
          'Esto ocurrirá siempre y cuando no hayan jugado en otro equipo durante el torneo en curso. Aquellos jugadores que hayan jugado en algún equipo podrán jugar después de la 5ta fecha en otro equipo.',
      },
    ],
    contentDescription: '',
    icon: ScaleIcon,
  },
  {
    name: 'Artículo 3',
    title: 'Copas y Clasificación',
    content: [{ title: '', description: '' }],
    contentDescription: '',
    icon: LightningBoltIcon,
  },
  {
    name: 'Artículo 4',
    title: 'Fichajes',
    content: [{ title: '', description: '' }],
    contentDescription: '',
    icon: AnnotationIcon,
  },
  {
    name: 'Artículo 5',
    title: 'Sanciones y multas',
    content: [{ title: '', description: '' }],
    contentDescription: '',
    icon: AnnotationIcon,
  },
];

const Rules: NextPage = () => {
  const { t } = useTranslation('pages');
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className="py-12 bg-white h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-sky-500 font-semibold tracking-wide uppercase">{t('rules.title')}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"></p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{t('rules.subtitle')}</p>
          <DotsDivider />
        </div>

        <div className="mt-10">
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {articles.map((article, index: number) => (
              <Disclosure as="div" key={article.name} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <div className="flex flex-row items-center justify-start gap-3">
                          <span className="font-semibold text-xl text-gray-900">
                            {t('rules.article', { articleNumber: index + 1 })}
                          </span>
                          <span className="font-regular text-gray-700">{article.title}</span>
                        </div>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12"></Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default Rules;
