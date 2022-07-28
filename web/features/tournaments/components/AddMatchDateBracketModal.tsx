import { useContext, useRef, useState } from 'react';

import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';

import {
  FormCheckbox,
  FormInput,
  FormInputField,
  FormLabel,
  FormSelect,
  ModalWrapper,
  ModalWrapperProps,
  NotificationAlert,
  SubmitButton,
} from '@components';
import { AddMatchDateBracketModel, MatchDate, SelectItem, Team } from '@models';
import { useSelect } from 'hooks/useSelect.hook';
import { AppContext } from 'contexts/app.context';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNotification } from 'hooks/useNotification.hook';

interface FormValues {
  time?: string;
  firstTeamGoals?: number;
  secondTeamGoals?: number;
}

interface AddMatchDateBracketModalProps extends ModalWrapperProps {
  fixtureId?: number;
  matchDateId?: number;
  teams?: Team[];
  onSuccess?: (matchDate: MatchDate) => void;
}

export const AddMatchDateBracketModal: React.FC<AddMatchDateBracketModalProps> = ({
  open,
  setOpen,
  fixtureId,
  onSuccess,
  matchDateId,
  teams,
}) => {
  const { teamService, tournamentService } = useContext(AppContext);
  const cancelButtonRef = useRef(null);
  const [matchAlreadyHappened, setMatchAlreadyHappened] = useState(false);
  const [loadingAddRequest, setLoadingAddRequest] = useState(false);
  const { t } = useTranslation('pages');
  const firstTeamRef = useRef(null);
  const secondTeamRef = useRef(null);
  const firstTeamSelect = useSelect(teamService.getFilteredTeams);
  const secondTeamSelect = useSelect(teamService.getFilteredTeams);
  const notification = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({ defaultValues: { time: '6PM', firstTeamGoals: undefined, secondTeamGoals: undefined } });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (isDirty && isFormValid()) {
      setLoadingAddRequest(true);
      const body: AddMatchDateBracketModel = {
        time: data.time,
        firstTeam: { team: firstTeamSelect.selectedItem, goals: data.firstTeamGoals, scorers: [] },
        secondTeam: { team: secondTeamSelect.selectedItem, goals: data.secondTeamGoals, scorers: [] },
      };

      console.log({ matchDateId, body });
      if (!fixtureId || !matchDateId) {
        notification.createNotification({
          title: 'Error creating Bracket',
          message:
            'An error occurred while requesting data from the server. Please reload the page and try again later.',
          isError: true,
        });
        setLoadingAddRequest(false);
        return;
      }

      const addResponse = await tournamentService.addBracketToMatchDate(fixtureId, matchDateId, body);
      if (!addResponse) {
        notification.createNotification({
          title: 'Error creating Bracket',
          message:
            'An error occurred while attempting to add the bracket. Please check your information and try again later.',
          isError: true,
        });
        setLoadingAddRequest(false);
        return;
      }
      notification.createNotification({
        title: 'Success creating Bracket',
        message: 'Bracket successfully created!',
      });
      if (onSuccess) onSuccess(addResponse);

      console.log(addResponse);
      setLoadingAddRequest(false);
      resetForm();
      setOpen(false);
    }
  };

  const resetForm = () => {
    firstTeamSelect.setSelectedItem(undefined);
    secondTeamSelect.setSelectedItem(undefined);
    firstTeamSelect.setItems(teams);
    firstTeamSelect.setSelectOpen(false);
    firstTeamSelect.setFilteredItems(teams);
    secondTeamSelect.setSelectOpen(false);
    secondTeamSelect.setItems(teams);
    secondTeamSelect.setFilteredItems(teams);
    setMatchAlreadyHappened(false);
    reset();
  };

  const onFirstTeamSelectChange = (selectedItem?: SelectItem) => {
    if (selectedItem) {
      secondTeamSelect.setItems(teams?.filter((team) => team.id !== selectedItem.id));
      secondTeamSelect.setFilteredItems(teams?.filter((team) => team.id !== selectedItem.id));
    } else {
      secondTeamSelect.setItems(teams);
      secondTeamSelect.setFilteredItems(teams);
    }
  };

  const onSecondTeamSelectChange = (selectedItem?: SelectItem) => {
    if (selectedItem) {
      firstTeamSelect.setItems(teams?.filter((team) => team.id !== selectedItem.id));
      firstTeamSelect.setFilteredItems(teams?.filter((team) => team.id !== selectedItem.id));
    } else {
      firstTeamSelect.setItems(teams);
      firstTeamSelect.setFilteredItems(teams);
    }
  };

  const isFormValid = () => {
    return isValid && firstTeamSelect.selectedItem && secondTeamSelect.selectedItem;
  };

  useEffect(() => {
    resetForm();
  }, [open]);

  useEffect(() => {
    firstTeamSelect.setItems(teams);
    firstTeamSelect.setFilteredItems(teams);
    secondTeamSelect.setItems(teams);
    secondTeamSelect.setFilteredItems(teams);
  }, []);

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <Dialog.Panel
        onClick={() => {
          firstTeamSelect.handleFocus();
          secondTeamSelect.handleFocus();
        }}
        className="relative bg-white overflow-y-show rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
              <PlusIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                {t('tournament.fixture.addMatchBracketModal.title')}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{t('tournament.fixture.addMatchBracketModal.subtitle')}</p>
              </div>
            </div>
            <div className="mt-3">
              <FormInputField
                labelText={t('tournament.fixture.addMatchBracketModal.time')}
                defaultValue="6PM"
                placeholder="6PM"
                {...register('time', { required: true })}
              />
            </div>
            <div className="mt-3">
              <FormLabel labelText={t('tournament.fixture.addMatchBracketModal.firstTeam')} />
              <FormSelect
                onChange={(selectedItem) => onFirstTeamSelectChange(selectedItem)}
                ref={firstTeamRef}
                {...firstTeamSelect}
              />
            </div>
            <div className="mt-3">
              <FormLabel labelText={t('tournament.fixture.addMatchBracketModal.secondTeam')} />
              <FormSelect
                onChange={(selectedItem) => onSecondTeamSelectChange(selectedItem)}
                ref={secondTeamRef}
                {...secondTeamSelect}
              />
            </div>
            <div className="mt-3">
              <div className="flex flex-row w-full justify-end items-center">
                <FormCheckbox
                  id="matchAlreadyHappened"
                  name="matchAlreadyHappened"
                  checked={matchAlreadyHappened}
                  setChecked={setMatchAlreadyHappened}
                  label={t('tournament.fixture.addMatchBracketModal.matchAlreadyHappened')}
                  description={''}
                />
              </div>
            </div>
            {matchAlreadyHappened && (
              <div className="mt-3">
                <FormLabel labelText={t('tournament.fixture.addMatchBracketModal.addResult')} />
                <div className="mt-3 flex flex-row items-center justify-between">
                  <div className="flex flex-col justify-center items-start">
                    <span className="text-sm font-medium text-sky-500 mb-2">
                      {t('tournament.fixture.addMatchBracketModal.teamGoals', {
                        team:
                          firstTeamSelect.selectedItem?.name || t('tournament.fixture.addMatchBracketModal.firstTeam'),
                      })}
                    </span>
                    <FormInput type="number" placeholder="0" {...register('firstTeamGoals', { min: 0, max: 99 })} />
                    {errors && errors.firstTeamGoals && (
                      <span className="text-sm text-rose-500 mt-1">{errors.firstTeamGoals?.message}</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <span className="text-sm font-medium text-sky-500 mb-2">
                      {t('tournament.fixture.addMatchBracketModal.teamGoals', {
                        team:
                          secondTeamSelect.selectedItem?.name ||
                          t('tournament.fixture.addMatchBracketModal.secondTeam'),
                      })}
                    </span>
                    <FormInput type="number" placeholder="0" {...register('secondTeamGoals', { min: 0, max: 99 })} />
                    {errors && errors.secondTeamGoals && (
                      <span className="text-sm text-rose-500 mt-1">{errors.secondTeamGoals?.message}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
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
              {t('tournament.fixture.addMatchBracketModal.cancel')}
            </button>
            <SubmitButton
              loading={loadingAddRequest}
              text={t('tournament.fixture.addMatchBracketModal.confirm')}
              readonly={!isFormValid()}
            />
          </div>
        </form>
        <NotificationAlert {...notification} />
      </Dialog.Panel>
    </ModalWrapper>
  );
};
