import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInputField, SubmitButton } from '@components';

interface FormValues {
  password: string;
  repeatPassword: string;
}

interface Props {
  submit: (data: FormValues) => void;
  loadingSubmit?: boolean;
}

export const ChangePasswordForm: React.FC<Props> = ({ submit, loadingSubmit }) => {
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
      <div className='pb-6'>
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

      <div>
        <SubmitButton loading={loadingSubmit} text={t('pages:forgot-password.form.submit')} readonly={!errors} />
      </div>
    </form>
  );
};
