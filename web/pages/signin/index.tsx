import { NextPage } from 'next';

import { SubmitHandler, useForm } from 'react-hook-form';

import { NotificationAlert, SubmitButton, Title } from '@components';
import { classNames, emailRegex } from '@utils';
import { useContext, useState } from 'react';
import { AuthContext, UserContext } from '@contexts';
import { useRouter } from 'next/router';
import { useNotification } from '@hooks';

interface FormValues {
  email: string;
  password: string;
}

const SignInPage: NextPage = () => {
  const router = useRouter();

  const [loadingRequest, setLoadingRequest] = useState(false);
  const { setUserToken, authService } = useContext(AuthContext);
  const { createNotification, closeNotification, notification, showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingRequest(true);
    const user = await authService.login(data);
    setLoadingRequest(false);
    if (!user) {
      createNotification({
        title: 'Error al Ingresar',
        message: 'Ha ocurrido un error al ingresar, por favor verifica tus datos e inténtalo de nuevo.',
        isError: true,
      });
      return;
    }
    createNotification({
      title: 'Ingreso correcto!',
      message: 'Te estamos redirigiendo a la pantalla de inicio...',
    });
    setTimeout(() => {
      setUserToken(user.token);
      router.push('/');
    }, 2000);
  };

  return (
    <>
      <div className="h-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
        <Title title="Ingresar" subtitle="Ingresa con tu email o con tus redes sociales." />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md border border-slate-100 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    placeholder="pablo.bengoechea@gmail.com"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                {errors.email && <span className="text-sm text-rose-500 mt-1">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
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
                    placeholder="Escribe tu contraseña"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                  {errors.password && <span className="text-sm text-rose-500 mt-1">{errors.password.message}</span>}
                </div>
              </div>

              <div className="flex items-center justify-start">
                <div className="text-sm">
                  <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div>
                <SubmitButton loading={loadingRequest} text="Ingresar" errors={errors}/>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continua con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Ingresar con Facebook</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Ingresar con Google</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 64 64">
                      <path d="M 32.521484 6 C 18.158484 6 6.515625 17.642 6.515625 32 C 6.515625 46.358 18.158484 58 32.521484 58 C 54.209484 58 59.098453 37.865969 57.064453 27.667969 L 51.181641 27.667969 L 49.269531 27.667969 L 32.515625 27.667969 L 32.515625 36.333984 L 49.279297 36.333984 C 47.351759 43.804816 40.588119 49.332031 32.515625 49.332031 C 22.943625 49.332031 15.181641 41.572 15.181641 32 C 15.181641 22.428 22.943625 14.667969 32.515625 14.667969 C 36.868625 14.667969 40.834906 16.283594 43.878906 18.933594 L 50.033203 12.779297 C 45.410203 8.5672969 39.266484 6 32.521484 6 z"></path>
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Ingresar con Twitter</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationAlert
          show={showNotification}
          notification={notification}
          onClose={() => closeNotification()}
        ></NotificationAlert>
      </div>
    </>
  );
};

export default SignInPage;
