import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInputField, SubmitButton } from '@components';
import { emailRegex } from '@utils';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (data: FormValues) => void;
  loadingSubmit?: boolean;
}

export const SignInForm: React.FC<Props> = ({ submit, loadingSubmit }) => {
  const { t } = useTranslation('pages');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    submit(data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        htmlFor="email"
        labelText={t('pages:signin.form.email')}
        id="email"
        placeholder={t('pages:signin.form.emailPlaceholder')}
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
      <FormInputField
        htmlFor="password"
        labelText={t('pages:signin.form.password')}
        id="password"
        type="password"
        {...register('password', {
          required: 'Debes ingresar una contraseña.',
          minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres.',
          },
          maxLength: { value: 50, message: 'La contraseña es demasiado larga.' },
        })}
        placeholder={t('pages:signin.form.passwordPlaceholder')}
        autoComplete="current-password"
        required
        errors={errors}
      />

      <div className="flex items-center justify-start">
        <div className="text-sm">
          <a href="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
            {t('pages:signin.form.forgotPassword')}
          </a>
        </div>
      </div>

      <div>
        <SubmitButton loading={loadingSubmit} text={t('pages:signin.form.submit')} readonly={!errors} />
      </div>
    </form>
  );
};
