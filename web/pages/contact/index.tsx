import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { SubmitHandler, useForm } from 'react-hook-form';

import { LogoComponent, Title } from '@components';
import { emailRegex } from '@utils';
import { AppContext } from '@contexts';
import { ContactInfo, ContactInfoEmail, ContactInfoPhone, ContactInfoSocialMedia } from '@models';

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

const ContactPage: NextPage = () => {
  const { contactInfoService } = useContext(AppContext);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => console.log(data);

  const getContactInfo = async () => {
    setContactInfo(await contactInfoService.getContactInfo());
  };

  useEffect(() => {
    getContactInfo();
  }, []);

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
                    {contactInfo?.phones?.map((phone: ContactInfoPhone) => (
                      <dd key={phone.id} className="flex text-base text-sky-50">
                        <PhoneIcon className="flex-shrink-0 w-6 h-6 text-sky-300" aria-hidden="true" />
                        <span className="ml-2">{phone.number}</span>
                      </dd>
                    ))}
                    <dt>
                      <span className="sr-only">Email</span>
                    </dt>
                    {contactInfo?.emails?.map((email: ContactInfoEmail) => (
                      <dd key={email.id} className="flex text-base text-sky-50">
                        <MailIcon className="flex-shrink-0 w-6 h-6 text-sky-300" aria-hidden="true" />
                        <span className="ml-2">{email.email}</span>
                      </dd>
                    ))}
                  </dl>
                  <div className="mt-8 flex space-x-12">
                    {contactInfo?.socialMedias?.map((socialMedia: ContactInfoSocialMedia) => (
                      <a key={socialMedia.name} href={socialMedia.url} className="text-sky-300 hover:text-sky-100">
                        <span className="sr-only">{socialMedia.name}</span>
                        <LogoComponent logo={socialMedia.logo} />
                      </a>
                    ))}
                  </div>
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
                          {...register('name', {
                            required: 'Debes ingresar tu nombre.',
                            maxLength: { value: 50, message: 'El nombre es demasiado largo.' },
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
                          {...register('lastName', {
                            required: 'Debes ingresar tu apellido.',
                            maxLength: { value: 50, message: 'El apellido es demasiado largo.' },
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
                          {...register('phone', {
                            maxLength: {
                              value: 13,
                              message: 'El teléfono es demasiado largo.',
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
                          {...register('subject', {
                            required: 'Debes ingresar un asunto.',
                            maxLength: {
                              value: 50,
                              message: 'El asunto es demasiado largo.',
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
                          {...register('message', {
                            required: 'Debes ingresar un mensaje.',
                            maxLength: {
                              value: 500,
                              message: 'El mensaje es demasiado largo.',
                            },
                          })}
                          rows={4}
                          placeholder="Mensaje"
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-sky-500 focus:border-sky-500 border border-gray-300 rounded-md placeholder-gray-400 text-sm"
                          aria-describedby="message-max"
                          defaultValue={''}
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
