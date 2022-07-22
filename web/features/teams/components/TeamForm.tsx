import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  FormImageUploadAndRender,
  FormInputField,
  FormLabel,
  FormMultiSelect,
  FormMultiSelectProps,
  FormTextAreaField,
  SubmitButton,
} from '@components';
import { Team } from '@models';
import { useRef } from 'react';

interface FormValues {
  name: string;
  description?: string;
}

interface Props extends FormMultiSelectProps {
  submit: (data: FormValues) => void;
  team: Team | null;
  loadingSubmit?: boolean;
  loadingImageUpload?: boolean;
  newlyUploadedLogo: string | null;
  inputFileRef: any;
  handleSetImage: (e: any) => void;
  openFileExplorer: () => void;
}

export const TeamForm: React.FC<Props> = ({
  submit,
  team,
  loadingSubmit,
  loadingImageUpload,
  newlyUploadedLogo,
  inputFileRef,
  handleSetImage,
  openFileExplorer,
  ...props
}) => {
  const { t } = useTranslation('pages');
  const selectRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">
              {t('team.form.title')} {team?.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{t('team.form.subtitle')}</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-row items-center justify-between col-span-3">
              <FormInputField
                className="w-1/2"
                htmlFor="name"
                defaultValue={team?.name || ''}
                labelText={t('pages:team.form.name')}
                id="name"
                type="name"
                {...register('name', {
                  required: 'El nombre del equipo es requerido',
                  minLength: {
                    value: 1,
                    message: 'El nombre es demasiado corto, debe tener al menos 1 caracter.',
                  },
                  maxLength: { value: 50, message: 'El nombre es demasiado largo.' },
                })}
                placeholder={t('pages:team.form.namePlaceholder')}
                autoComplete="name"
                errors={errors}
              />
              <FormImageUploadAndRender
                title={t('team.form.photo')}
                changeButtonText={t('team.form.changePhoto')}
                openFileExplorer={openFileExplorer}
                loadingImageUpload={loadingImageUpload}
                newlyUploadedLogo={newlyUploadedLogo}
                image={team?.logo}
                inputFileRef={inputFileRef}
                handleSetImage={handleSetImage}
              />
            </div>
            <FormTextAreaField
              htmlFor="description"
              labelText={t('team.form.description')}
              id="description"
              defaultValue={team?.description || ''}
              {...register('description', {
                maxLength: {
                  value: 500,
                  message: 'El mensaje es demasiado largo.',
                },
              })}
              rows={3}
              className="col-span-3"
              placeholder={t('team.form.descriptionPlaceholder')}
              errors={errors}
            />
          </div>
          <div>
            <FormLabel labelText={t('team.form.owners')} />
            <FormMultiSelect ref={selectRef} {...props} />
          </div>
        </div>
        <div className="flex flex-row justify-end items-end px-4 py-3 text-right sm:px-6">
          <div className="w-1/4">
            <SubmitButton text={t('team.form.submit')} loading={loadingSubmit} errors={errors} />
          </div>
        </div>
      </div>
    </form>
  );
};
