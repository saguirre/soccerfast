import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInputField, SubmitButton } from '@components';
import { emailRegex } from '@utils';

interface FormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface Props {
  submit: (data: FormValues) => void;
  loadingSubmit?: boolean;
}

export const SignUpForm: React.FC<Props> = ({ submit, loadingSubmit }) => {
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
      <FormInputField
        htmlFor="name"
        labelText={t('pages:signup.form.name')}
        id="name"
        type="name"
        {...register('name', {
          required: 'Debes ingresar tu nombre completo.',
          minLength: {
            value: 8,
            message: 'El nombre es demasiado corto, debe tener al menos 8 caracteres.',
          },
          maxLength: { value: 50, message: 'El nombre es demasiado largo.' },
        })}
        placeholder={t('pages:signup.form.namePlaceholder')}
        autoComplete="name"
        errors={errors}
      />
      <FormInputField
        htmlFor="email"
        labelText={t('pages:signup.form.email')}
        id="email"
        placeholder={t('pages:signup.form.emailPlaceholder')}
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
        labelText={t('pages:signup.form.password')}
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
        placeholder={t('pages:signup.form.passwordPlaceholder')}
        autoComplete="current-password"
        required
        errors={errors}
      />
      <div>
        <FormInputField
          htmlFor="repeatPassword"
          labelText={t('pages:signup.form.repeatPassword')}
          id="repeatPassword"
          placeholder={t('pages:signup.form.repeatPasswordPlaceholder')}
          {...register('repeatPassword', {
            required: 'Debes confirmar tu contraseña.',
            validate: (value) => value === watch('password'),
          })}
          type="password"
          autoComplete="current-repeatPassword"
          required
          errors={errors}
        />
        {errors.repeatPassword && errors.repeatPassword.type === 'validate' && (
          <span className="text-sm text-rose-500 mt-1">Las contraseñas no coinciden</span>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="text-sm">
          <span className="text-slate-500">{t('pages:signup.form.alreadyHaveAnAccount')}</span>
          <Link href="/signin">
            <span className="ml-1 font-medium text-sky-600 hover:text-sky-500 hover:cursor-pointer">
              {t('pages:signup.form.alreadyHaveAnAccountLink')}
            </span>
          </Link>
        </div>
      </div>

      <div>
        <SubmitButton loading={loadingSubmit} text={t('pages:signup.form.submit')} errors={errors} />
      </div>
    </form>
  );
};
