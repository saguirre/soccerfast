import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInputField, FormTextAreaField, FormTitle, SubmitButton } from '@components';
import { emailRegex } from '@utils';

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

interface Props {
  submit: (data: FormValues) => void;
}

export const ContactInformationForm: React.FC<Props> = ({ submit }) => {
  const { t } = useTranslation('pages');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => submit(data);

  return (
    <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 ">
      <FormTitle text={t('contact.form.title')} />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <FormInputField
          htmlFor="name"
          labelText={t('contact.form.name')}
          id="name"
          type="text"
          autoComplete="given-name"
          placeholder={t('contact.form.namePlaceholder')}
          {...register('name', {
            required: 'Debes ingresar tu nombre.',
            maxLength: { value: 50, message: 'El nombre es demasiado largo.' },
          })}
          errors={errors}
        />
        <FormInputField
          htmlFor="lastName"
          labelText={t('contact.form.lastname')}
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder={t('contact.form.lastnamePlaceholder')}
          {...register('lastName', {
            required: 'Debes ingresar tu apellido.',
            maxLength: { value: 50, message: 'El apellido es demasiado largo.' },
          })}
          errors={errors}
        />
        <FormInputField
          htmlFor="email"
          labelText={t('contact.form.email')}
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t('contact.form.emailPlaceholder')}
          {...register('email', {
            required: 'Debes ingresar un email.',
            pattern: {
              value: emailRegex,
              message: 'El formato del email es incorrecto.',
            },
            maxLength: {
              value: 50,
              message: 'El email es demasiado largo.',
            },
          })}
          errors={errors}
        />
        <FormInputField
          id="phone"
          type="text"
          htmlFor="phone"
          labelText={t('contact.form.phone')}
          optional
          optionalDescription={t('contact.form.optional')}
          autoComplete="tel"
          placeholder={t('contact.form.phonePlaceholder')}
          {...register('phone', {
            maxLength: {
              value: 13,
              message: 'El teléfono es demasiado largo.',
            },
          })}
          errors={errors}
        />
        <FormInputField
          id="subject"
          type="text"
          htmlFor="subject"
          labelText={t('contact.form.subject')}
          {...register('subject', {
            required: 'Debes ingresar un asunto.',
            maxLength: {
              value: 50,
              message: 'El asunto es demasiado largo.',
            },
          })}
          className="sm:col-span-2"
          placeholder={t('contact.form.subjectPlaceholder')}
          errors={errors}
        />
        <FormTextAreaField
          className="sm:col-span-2"
          id="message"
          htmlFor="message"
          labelText={t('contact.form.message')}
          optional
          rows={4}
          optionalDescription={t('contact.form.messageMax')}
          placeholder={t('contact.form.phonePlaceholder')}
          {...register('message', {
            required: 'Debes ingresar un mensaje.',
            maxLength: {
              value: 500,
              message: 'El mensaje es demasiado largo.',
            },
          })}
          errors={errors}
        />
        <div className="sm:col-span-2 sm:flex sm:justify-end">
          <SubmitButton className="w-fit px-6 py-3" text={t('contact.form.submit')} />
        </div>
      </form>
    </div>
  );
};
