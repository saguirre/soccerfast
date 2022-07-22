import { LandingImageBackground } from './LandingImageBackground';

export const LandingImage: React.FC = () => (
  <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
    <LandingImageBackground />
    <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
      <div className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
        <span className="sr-only">C.A. Cerro Campeón</span>
        <img className="h-fill w-full" src="/luis-campeon.jpeg" alt="SoccerFast" />
      </div>
    </div>
  </div>
);
