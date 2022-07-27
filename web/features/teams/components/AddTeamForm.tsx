import { useContext, useEffect, useRef, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import {
  FormImageUploadAndRender,
  FormInputField,
  FormMultiSelect,
  FormTextAreaField,
  NotificationAlert,
  SubmitButton,
} from '@components';
import { AppContext } from '@contexts';
import { useFileUpload, useNotification, useSelect } from '@hooks';
import { AddTeamModel, User } from '@models';
import { useRouter } from 'next/router';

interface FormValues {
  name: string;
  description?: string;
  logo?: string;
}

interface Props {
  users: User[];
}

export const AddTeamForm: React.FC<Props> = ({ users }) => {
  const { t } = useTranslation(['common', 'pages']);
  const router = useRouter();
  const { teamService } = useContext(AppContext);
  const [loadingAddRequest, setLoadingAddRequest] = useState<boolean>(false);
  const notificationHandler = useNotification();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const playerSelectRef = useRef<HTMLDivElement>(null);
  const ownerSelectRef = useRef<HTMLDivElement>(null);
  const fileUpload = useFileUpload(teamService.uploadLogo, inputFileRef);
  const playerSelect = useSelect(teamService.getFilteredTeams);
  const ownerSelect = useSelect(teamService.getFilteredTeams);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: AddTeamModel = {
      name: data.name,
      description: data.description,
      logo: fileUpload.uploadedImage || '',
      ownerIds: ownerSelect.selectedItems.map((owner: User) => owner.id),
      playerIds: playerSelect.selectedItems.map((player: User) => player.id),
    };
    const addTeamResult = await teamService.addTeam(body);
    setLoadingAddRequest(false);
    if (!addTeamResult) {
      notificationHandler.createNotification({
        title: t('common:notification.addErrorTitle'),
        message: t('common:notification.addErrorMessage', { entity: body.name }),
        isError: true,
      });
      return;
    }
    resetFormAndValues();
    notificationHandler.createNotification({
      title: t('common:notification.addSuccessTitle', { entity: t('common:entity.team') }),
      message: t('common:notification.addSuccessMessage', { entity: body.name }),
    });
  };

  const resetFormAndValues = () => {
    reset();
    ownerSelect.setSelectedItems([]);
    playerSelect.setSelectedItems([]);
    fileUpload.setUploadedImage(undefined);
  };

  useEffect(() => {
    if (router.isReady) {
      ownerSelect.setItems(users);
      ownerSelect.setFilteredItems(users);
      playerSelect.setItems(users);
      playerSelect.setFilteredItems(users);
    }
  }, [users]);

  return (
    <div
      onClick={() => {
        ownerSelect.handleFocus();
        playerSelect.handleFocus();
      }}
      className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 my-2">{t('pages:addTeam.form.title')}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('pages:addTeam.form.subtitle')}</p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-row items-center justify-between col-span-3">
                <FormInputField
                  className="w-1/2"
                  htmlFor="name"
                  defaultValue={''}
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
                  title={t('pages:team.form.photo')}
                  changeButtonText={t('pages:team.form.changePhoto')}
                  {...fileUpload}
                />
              </div>
              <FormTextAreaField
                htmlFor="description"
                labelText={t('pages:team.form.description')}
                id="description"
                defaultValue={''}
                {...register('description', {
                  maxLength: {
                    value: 500,
                    message: 'El mensaje es demasiado largo.',
                  },
                })}
                rows={3}
                className="col-span-3"
                placeholder={t('pages:team.form.descriptionPlaceholder')}
                errors={errors}
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('pages:addTeam.form.owners')}
              </label>
              <FormMultiSelect ref={ownerSelectRef} {...ownerSelect} items={ownerSelect.filteredItems || []} />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('pages:addTeam.form.players')}
              </label>
              <FormMultiSelect ref={playerSelectRef} {...playerSelect} items={playerSelect.filteredItems || []} />
            </div>
          </div>
          <div className="flex flex-row justify-end items-end px-4 py-3 text-right sm:px-6">
            <div className="w-1/4">
              <SubmitButton text={t('pages:addTeam.form.submit')} loading={loadingAddRequest} errors={errors} />
            </div>
          </div>
        </div>
      </form>
      <NotificationAlert {...notificationHandler}></NotificationAlert>
    </div>
  );
};
