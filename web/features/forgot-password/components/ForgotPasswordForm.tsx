import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInputField, SubmitButton } from '@components';
import { emailRegex } from '@utils';

interface FormValues {
  email: string;
}

interface Props {
  submit: (data: FormValues) => void;
  loadingSubmit?: boolean;
}

export const ForgotPasswordForm: React.FC<Props> = ({ submit, loadingSubmit }) => {
  const { t } = useTranslation('pages');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    submit(data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col'>
        <FormInputField
          htmlFor="email"
          labelText={t('pages:forgot-password.form.email')}
          id="email"
          placeholder={t('pages:forgot-password.form.emailPlaceholder')}
          required
          type="email"
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
          autoComplete="email"
          errors={errors}
        />
        <span className="text-xs text-gray-500 text-center my-3">{t('pages:forgot-password.form.notice')}</span>
      </div>

      <div>
        <SubmitButton loading={loadingSubmit} text={t('pages:forgot-password.form.submit')} readonly={!errors} />
      </div>
    </form>
  );
};
