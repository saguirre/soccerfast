import { NextPage } from "next";

import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm } from "react-hook-form";

import { Title } from "@components";
import { emailRegex } from "@utils";

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

const ContactPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => console.log(data);

  return (
    <div className="relative py-12 bg-white h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title title="Contacto" subtitle="Envianos un mensaje con cualquier consulta y responderemos a la brevedad." />
        {/* Contact section */}
        <section className="relative bg-white mt-10" aria-labelledby="contact-heading">
          <div className="absolute w-full h-1/2 bg-warm-gray-50" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="relative bg-white border-slate-100 border shadow-lg rounded-xl">
              <h2 id="contact-heading" className="sr-only">
                Contact us
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Contact information */}
                <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-b rounded-l-xl from-sky-500 to-sky-700 sm:px-10 xl:p-12">
                  {/* Decorative angle backgrounds */}
                  <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      width={343}
                      height={388}
                      viewBox="0 0 343 388"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                        fill="url(#linear1)"
                        fillOpacity=".1"
                      />
                      <defs>
                        <linearGradient
                          id="linear1"
                          x1="254.553"
                          y1="107.554"
                          x2="961.66"
                          y2="814.66"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop offset={1} stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                    aria-hidden="true"
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      width={359}
                      height={339}
                      viewBox="0 0 359 339"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                        fill="url(#linear2)"
                        fillOpacity=".1"
                      />
                      <defs>
                        <linearGradient
                          id="linear2"
                          x1="192.553"
                          y1="28.553"
                          x2="899.66"
                          y2="735.66"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop offset={1} stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      width={160}
                      height={678}
                      viewBox="0 0 160 678"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                        fill="url(#linear3)"
                        fillOpacity=".1"
                      />
                      <defs>
                        <linearGradient
                          id="linear3"
                          x1="192.553"
                          y1="325.553"
                          x2="899.66"
                          y2="1032.66"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop offset={1} stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">Información de contacto</h3>
                  <p className="mt-6 text-base text-white max-w-3xl">
                    Envianos un mensaje para aclarar cualquier duda o enviarnos propuestas. <br />
                    Responderemos a la brevedad.
                  </p>
                  <dl className="mt-8 space-y-6">
                    <dt>
                      <span className="sr-only">Phone number</span>
                    </dt>
                    <dd className="flex text-base text-sky-50">
                      <PhoneIcon className="flex-shrink-0 w-6 h-6 text-sky-300" aria-hidden="true" />
                      <span className="ml-2">+1 (754) 231-5401</span>
                    </dd>
                    <dd className="flex text-base text-sky-50">
                      <PhoneIcon className="flex-shrink-0 w-6 h-6 text-sky-300" aria-hidden="true" />
                      <span className="ml-2">+1 (786) 306-8818</span>
                    </dd>
                    <dt>
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd className="flex text-base text-sky-50">
                      <MailIcon className="flex-shrink-0 w-6 h-6 text-sky-300" aria-hidden="true" />
                      <span className="ml-2">urucalv13@gmail.com</span>
                    </dd>
                  </dl>
                  <ul role="list" className="mt-8 flex space-x-12">
                    <li>
                      <a className="text-sky-300 hover:text-sky-100" href="#">
                        <span className="sr-only">Facebook</span>
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="text-sky-300 hover:text-sky-100" href="#">
                        <span className="sr-only">Google</span>
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 64 64">
                          <path d="M 32.521484 6 C 18.158484 6 6.515625 17.642 6.515625 32 C 6.515625 46.358 18.158484 58 32.521484 58 C 54.209484 58 59.098453 37.865969 57.064453 27.667969 L 51.181641 27.667969 L 49.269531 27.667969 L 32.515625 27.667969 L 32.515625 36.333984 L 49.279297 36.333984 C 47.351759 43.804816 40.588119 49.332031 32.515625 49.332031 C 22.943625 49.332031 15.181641 41.572 15.181641 32 C 15.181641 22.428 22.943625 14.667969 32.515625 14.667969 C 36.868625 14.667969 40.834906 16.283594 43.878906 18.933594 L 50.033203 12.779297 C 45.410203 8.5672969 39.266484 6 32.521484 6 z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="text-sky-300 hover:text-sky-100" href="#">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact form */}
                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 ">
                  <h3 className="text-lg font-medium text-warm-gray-900">Envianos un mensaje</h3>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-warm-gray-900">
                        Nombre
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Debes ingresar tu nombre.",
                            maxLength: { value: 50, message: "El nombre es demasiado largo." },
                          })}
                          id="name"
                          placeholder="Pablo"
                          autoComplete="given-name"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                      </div>
                      {errors.name && <span className="text-sm text-rose-500 mt-1">{errors.name.message}</span>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-warm-gray-900">
                        Apellido
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...register("lastName", {
                            required: "Debes ingresar tu apellido.",
                            maxLength: { value: 50, message: "El apellido es demasiado largo." },
                          })}
                          id="lastName"
                          placeholder="Bengoechea"
                          autoComplete="family-name"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                        {errors.lastName && (
                          <span className="text-sm text-rose-500 mt-1">{errors.lastName.message}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Debes ingresar un email.",
                            pattern: {
                              value: emailRegex,
                              message: "El formato del email es incorrecto.",
                            },
                            maxLength: {
                              value: 50,
                              message: "El email es demasiado largo.",
                            },
                          })}
                          placeholder="pablo.bengoechea@gmail.com"
                          autoComplete="email"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                        {errors.email && <span className="text-sm text-rose-500 mt-1">{errors.email.message}</span>}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-900">
                          Teléfono
                        </label>
                        <span id="phone-optional" className="text-sm text-gray-400">
                          Opcional
                        </span>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="phone"
                          {...register("phone", {
                            maxLength: {
                              value: 13,
                              message: "El teléfono es demasiado largo.",
                            },
                          })}
                          placeholder="+1 (786) 289-1891"
                          autoComplete="tel"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          aria-describedby="phone-optional"
                        />
                        {errors.phone && <span className="text-sm text-rose-500 mt-1">{errors.phone.message}</span>}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-warm-gray-900">
                        Asunto
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="subject"
                          {...register("subject", {
                            required: "Debes ingresar un asunto.",
                            maxLength: {
                              value: 50,
                              message: "El asunto es demasiado largo.",
                            },
                          })}
                          placeholder="Asunto"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                        {errors.subject && <span className="text-sm text-rose-500 mt-1">{errors.subject.message}</span>}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-between">
                        <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
                          Mensaje
                        </label>
                        <span id="message-max" className="text-sm text-gray-400">
                          Max. 500 caracteres
                        </span>
                      </div>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          {...register("message", {
                            required: "Debes ingresar un mensaje.",
                            maxLength: {
                              value: 500,
                              message: "El mensaje es demasiado largo.",
                            },
                          })}
                          rows={4}
                          placeholder="Mensaje"
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-sky-500 focus:border-sky-500 border border-gray-300 rounded-md placeholder-gray-400 text-sm"
                          aria-describedby="message-max"
                          defaultValue={""}
                        />
                        {errors.message && <span className="text-sm text-rose-500 mt-1">{errors.message.message}</span>}
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                      <button
                        type="submit"
                        className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
