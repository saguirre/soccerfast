import { useTranslation } from 'next-i18next';

import { FormInputLarge, FormTitle, SubmitButton } from '@components';
import { LandingPrivacyPolicy } from './LandingPrivacyPolicy';

export const LandingMailingListSubscribe: React.FC = () => {
  const { t } = useTranslation('pages');
  return (
    <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
      <FormTitle text={t('landing.mailingList.title')} />
      <form action="#" method="POST" className="mt-3 flex flex-col items-center sm:flex">
        <FormInputLarge id="email" type="email" name="email" placeholder={t('landing.mailingList.placeholder')} />
        <SubmitButton className="w-1/4 mt-3 sm:ml-2 flex items-center justify-center" text={t('landing.mailingList.submit')} />
      </form>
      <LandingPrivacyPolicy
        prependText={t('landing.mailingList.privacyPolicy')}
        privacyPolicy={t('landing.mailingList.privacyPolicyLink')}
      />
    </div>
  );
};
