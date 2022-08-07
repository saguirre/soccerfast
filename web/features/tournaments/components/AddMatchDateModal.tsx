import { useContext, useRef, useState } from 'react';

import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Calendar, ModalWrapper, ModalWrapperProps, SubmitButton } from '@components';
import { AppContext } from '@contexts';
import { AddMatchDateModel, Day, MatchDate, Notification } from '@models';

interface FormValues {
  date?: string;
}

interface AddMatchDateModalProps extends ModalWrapperProps {
  tournamentId?: number;
  onSuccess: (newMatchDate: MatchDate) => void;
  onError: (notification: Notification) => void;
}

export const AddMatchDateModal: React.FC<AddMatchDateModalProps> = ({
  open,
  setOpen,
  tournamentId,
  onSuccess,
  onError,
}) => {
  const { tournamentService } = useContext(AppContext);
  const cancelButtonRef = useRef(null);
  const [loadingAddRequest, setLoadingAddRequest] = useState(false);
  const { t } = useTranslation('pages');

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({ defaultValues: { date: '' } });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (isFormValid()) {
      setLoadingAddRequest(true);
      const body: AddMatchDateModel = {
        title: 'Match',
        date: data.date,
      };

      if (!tournamentId) {
        onError({
          title: t('common:notification.addErrorTitle'),
          message: t('common:notification.addErrorMessage', { entity: t('common:entity.matchDate') }),
          isError: true,
        });
        setLoadingAddRequest(false);
        return;
      }

      const addResponse = await tournamentService.addMatchDate(tournamentId, body);
      if (!addResponse) {
        onError({
          title: t('common:notification.addErrorTitle'),
          message: t('common:notification.addErrorMessage', { entity: t('common:entity.matchDate') }),
          isError: true,
        });
        setLoadingAddRequest(false);
        return;
      }
      onSuccess(addResponse);
      setLoadingAddRequest(false);
      resetForm();
      setOpen(false);
    }
  };

  const resetForm = () => {
    reset();
  };

  const isFormValid = () => {
    return isValid && watch('date');
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <Dialog.Panel className="relative bg-white overflow-y-show rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
              <PlusIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                {t('tournament.fixture.addMatchModal.title')}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{t('tournament.fixture.addMatchModal.subtitle')}</p>
              </div>
            </div>
            <div className="mt-3">
              <Calendar
                onSelectDate={(day: Day) => {
                  setValue('date', day.formattedDate);
                }}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-row items-center justify-between gap-3">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              ref={cancelButtonRef}
            >
              {t('tournament.fixture.addMatchModal.cancel')}
            </button>
            <SubmitButton
              loading={loadingAddRequest}
              text={t('tournament.fixture.addMatchModal.confirm')}
              readonly={!isFormValid()}
            />
          </div>
        </form>
      </Dialog.Panel>
    </ModalWrapper>
  );
};
