import { PhoneIcon, MailIcon } from '@heroicons/react/solid';

import { ContactInfoPhone, ContactInfoEmail } from '@models';
import { ContactInfo } from '../ContactInfo';

interface Props {
  title: string;
  phones?: ContactInfoPhone[];
  emails?: ContactInfoEmail[];
}

export const FooterContactInfo: React.FC<Props> = ({ title, phones, emails }) => {
  return (
    <div>
      <h3 className="text-sm leading-6 font-medium uppercase text-gray-200">{title}</h3>
      <dl className="mt-2 space-y-1.5">
        <ContactInfo
          entities={phones?.map(({ id, number }: ContactInfoPhone) => ({
            id,
            value: number,
            icon: PhoneIcon,
            iconClass: 'flex-shrink-0 w-5 h-5 text-slate-400',
          }))}
        />
        <ContactInfo
          entities={emails?.map(({ id, email }: ContactInfoEmail) => ({
            id,
            value: email,
            icon: MailIcon,
            iconClass: 'flex-shrink-0 w-5 h-5 text-slate-400',
          }))}
        />
      </dl>
    </div>
  );
};
