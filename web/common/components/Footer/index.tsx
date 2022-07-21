import { useContext, useEffect, useState } from 'react';

import { MailIcon, PhoneIcon } from '@heroicons/react/solid';

import { LogoComponent } from '@components';
import { AppContext } from '@contexts';
import { ContactInfo, ContactInfoEmail, ContactInfoPhone, ContactInfoSocialMedia } from '@models';
import { useTranslation } from 'next-i18next';

export const Footer: React.FC = () => {
  const { contactInfoService } = useContext(AppContext);
  const { t } = useTranslation('common');
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const getContactInfo = async () => {
    const contactInfoResponse = await contactInfoService.getContactInfo();
    setContactInfo(contactInfoResponse);
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <footer className="bg-gray-900 border-t border-slate-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-md mx-auto py-12 px-4 sm:max-w-lg sm:pt-8 sm:px-6 lg:max-w-7xl lg:pt-8 lg:pb-8 lg:px-8">
        <div className="flex flex-row items-center justify-start gap-20">
          <div className="xl:col-span-1">
            <img className="h-14" src={'/' + contactInfo?.companyLogo} alt="Company name" />
            <p className="text-gray-400 text-base mt-4">{t('footer.slogan')}</p>
            <div className="flex mt-4 space-x-6">
              {contactInfo?.socialMedias?.map((socialMedia: ContactInfoSocialMedia) => (
                <a key={socialMedia.id} href={socialMedia.url} className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{socialMedia.name}</span>
                  <LogoComponent logo={socialMedia.logo} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm leading-6 font-medium uppercase text-gray-200">{t('footer.contact')}</h3>
            <dl className="mt-2 space-y-1.5">
              <dt>
                <span className="sr-only">Phone number</span>
              </dt>
              {contactInfo?.phones?.map((phone: ContactInfoPhone) => (
                <dd key={phone.id} className="flex text-base text-sky-50 items-center">
                  <PhoneIcon className="flex-shrink-0 w-5 h-5 text-slate-400" aria-hidden="true" />

                  <span className="ml-2">{phone.number}</span>
                </dd>
              ))}
              <dt>
                <span className="sr-only">Email</span>
              </dt>
              {contactInfo?.emails?.map((email: ContactInfoEmail) => (
                <dd key={email.id} className="flex text-base text-sky-50 items-center">
                  <MailIcon className="flex-shrink-0 w-5 h-5 text-slate-400" aria-hidden="true" />
                  <span className="ml-2">{email.email}</span>
                </dd>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-6 border-t opacity-30 border-slate-300 pt-6"></div>
        <p className="text-base text-gray-400 xl:text-center">&copy; {t('footer.copyright')}</p>
      </div>
    </footer>
  );
};
