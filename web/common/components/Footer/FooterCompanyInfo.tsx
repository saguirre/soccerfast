import { ContactInfoSocialMedia } from '@models';
import { LogoComponent } from '@components/Logos';

interface Props {
  companyPhrase?: string;
  companyLogo?: string;
  socialMedias?: ContactInfoSocialMedia[];
}

export const FooterCompanyInfo: React.FC<Props> = ({ socialMedias, companyLogo, companyPhrase }) => {
  return (
    <div className="xl:col-span-1">
      <img className="h-14" src={'/' + companyLogo} alt="Company name" />
      <p className="text-gray-400 text-base mt-4">{companyPhrase}</p>
      <div className="flex mt-4 space-x-6">
        {socialMedias?.map((socialMedia: ContactInfoSocialMedia) => (
          <a key={socialMedia.id} href={socialMedia.url} className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">{socialMedia.name}</span>
            <LogoComponent logo={socialMedia.logo} />
          </a>
        ))}
      </div>
    </div>
  );
};
