import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Title } from '@components';
import { AppContext } from '@contexts';
import { ContactInformation, ContactInformationForm } from '@features';
import { ContactInfo } from '@models';

const ContactPage: NextPage = () => {
  const { t } = useTranslation('pages');
  const { contactInfoService } = useContext(AppContext);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  const getContactInfo = async () => {
    setContactInfo(await contactInfoService.getContactInfo());
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    await contactInfoService.addContactQuestion(data);
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <div className="relative py-12 bg-white h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title={t('contact.title')} subtitle={t('contact.subtitle')} />
        <section className="relative bg-white mt-10" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="relative bg-white border-slate-100 border shadow-lg rounded-xl">
              <h2 id="contact-heading" className="sr-only">
                Contact us
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <ContactInformation title={t('contact.infotitle')} subtitle={t('contact.info')} {...contactInfo} />
                <ContactInformationForm submit={(data) => onSubmit(data)} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'es', ['common', 'pages'])),
    },
  };
};

export default ContactPage;
