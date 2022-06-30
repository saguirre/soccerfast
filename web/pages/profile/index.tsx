import { NextPage } from "next";

import { useForm, SubmitHandler } from "react-hook-form";

import { Title } from "@components";

interface FormValues {
  name: string;
  about: string;
}

const ProfilePage: NextPage = () => {
  const name = "Santiago Aguirre";
  const email = "saguirrews@gmail.com";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
  };
  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title="Perfil" subtitle="Visualiza tu información y actualizala" />
      <div className="sm:mx-auto max-w-full">
        <div className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">Información Personal</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Esta información será mostrada públicamente, así que ten cuidado con lo que compartes.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-row items-center justify-between col-span-3">
                    <div className="w-1/2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "Debes ingresar tu nombre completo.",
                          minLength: {
                            value: 8,
                            message: "El nombre es demasiado corto, debe tener al menos 8 caracteres.",
                          },
                          maxLength: { value: 50, message: "El nombre es demasiado largo." },
                        })}
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                      {errors.name && <span className="text-sm text-rose-500 mt-1">{errors.name.message}</span>}
                    </div>
                    <div className="mr-4">
                      <label className="block text-sm font-medium text-gray-700">Foto</label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          Cambiar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between col-span-3">
                    <div className="w-1/2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          required
                          value={email}
                          type="email"
                          autoComplete="email"
                          readOnly
                          className="appearance-none block bg-slate-100 text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:ring-0 focus:border focus:border-gray-300 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Acerca de mí
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        {...register("about", {
                          maxLength: {
                            value: 500,
                            message: "El mensaje es demasiado largo.",
                          },
                        })}
                        rows={3}
                        className="shadow-sm placeholder-slate-300 focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Descripción"
                        defaultValue={""}
                      />
                      {errors.about && <span className="text-sm text-rose-500 mt-1">{errors.about.message}</span>}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Breve descripción de tu perfil. Las URLs serán mostradas como hipervínculos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-sky-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
