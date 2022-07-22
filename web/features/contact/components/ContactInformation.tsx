import { PhoneIcon, MailIcon } from '@heroicons/react/solid';

import { ContactInfo, LogoComponent } from '@components';
import { ContactInfoPhone, ContactInfoEmail, ContactInfoSocialMedia } from '@models';
import { ContactInformationDecorativeBackgrounds } from './ContactInformationDecorativeBackgrounds';
import { ContactInformationSubtitle } from './ContactInformationSubtitle';
import { ContactInformationTitle } from './ContactInformationTitle';

interface Props {
  title: string;
  subtitle: string;
  phones?: ContactInfoPhone[];
  emails?: ContactInfoEmail[];
  socialMedias?: ContactInfoSocialMedia[];
}

export const ContactInformation: React.FC<Props> = ({ title, subtitle, phones, emails, socialMedias }) => {
  return (
    <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-b rounded-l-xl from-sky-500 to-sky-700 sm:px-10 xl:p-12">
      <ContactInformationDecorativeBackgrounds />
      <ContactInformationTitle title={title} />
      <ContactInformationSubtitle subtitle={subtitle} />
      <dl className="mt-8 space-y-6">
        <ContactInfo
          entities={phones?.map(({ id, number }: ContactInfoPhone) => ({
            id,
            value: number,
            icon: PhoneIcon,
            entityClass: 'mt-6 items-center',
            iconClass: 'flex-shrink-0 w-6 h-6 text-sky-300',
          }))}
        />
        <ContactInfo
          entities={emails?.map(({ id, email }: ContactInfoEmail) => ({
            id,
            value: email,
            icon: MailIcon,
            iconClass: 'flex-shrink-0 w-6 h-6 text-sky-300',
          }))}
        />
      </dl>
      <div className="mt-8 flex space-x-12">
        {socialMedias?.map((socialMedia: ContactInfoSocialMedia) => (
          <a key={socialMedia.name} href={socialMedia.url} className="text-sky-300 hover:text-sky-100">
            <span className="sr-only">{socialMedia.name}</span>
            <LogoComponent logo={socialMedia.logo} />
          </a>
        ))}
      </div>
    </div>
  );
};
