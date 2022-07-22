import { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { AppContext } from '@contexts';
import { ContactInfo } from '@models';
import { FooterCompanyInfo } from './FooterCompanyInfo';
import { FooterContactInfo } from './FooterContactInfo';
import { FooterDivider } from './FooterDivider';
import { FooterCopyright } from './FooterCopyright';

export const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const { contactInfoService } = useContext(AppContext);
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
          <FooterCompanyInfo {...contactInfo} companyPhrase={t('footer.slogan')} />
          <FooterContactInfo title={t('footer.contact')} phones={contactInfo?.phones} emails={contactInfo?.emails} />
        </div>
        <FooterDivider />
        <FooterCopyright copyright={t('footer.copyright')} />
      </div>
    </footer>
  );
};
