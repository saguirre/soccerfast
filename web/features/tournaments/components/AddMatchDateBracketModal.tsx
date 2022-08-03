import { useContext, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/outline';
import { ErrorMessage } from '@hookform/error-message';

import {
  FormCheckbox,
  FormInputField,
  FormLabel,
  FormSelect,
  ModalWrapper,
  ModalWrapperProps,
  SubmitButton,
} from '@components';
import { AppContext, TournamentContext } from '@contexts';
import { useSelect } from '@hooks';
import { AddMatchDateBracketModel, BracketScorer, MatchDate, Notification, SelectItem } from '@models';
import { AddTeamGoals } from './AddTeamGoals';
import { MatchScorerMultiSelect } from './MatchScorerMultiSelect';

interface FormValues {
  time?: string;
  matchAlreadyHappened?: boolean;
  firstTeamGoals?: number;
  secondTeamGoals?: number;
}

interface AddMatchDateBracketModalProps extends ModalWrapperProps {
  fixtureId?: number;
  matchDateId?: number;
  onSuccess: (matchDate: MatchDate) => void;
  onError: (notification: Notification) => void;
}

export const AddMatchDateBracketModal: React.FC<AddMatchDateBracketModalProps> = ({
  open,
  setOpen,
  fixtureId,
  onSuccess,
  onError,
  matchDateId,
}) => {
  const { teamService, tournamentService } = useContext(AppContext);
  const { tournament } = useContext(TournamentContext);
  const teams = tournament?.teams;
  const cancelButtonRef = useRef(null);
  const [loadingAddRequest, setLoadingAddRequest] = useState(false);
  const { t } = useTranslation('pages');
  const firstTeamRef = useRef(null);
  const secondTeamRef = useRef(null);
  const firstTeamSelect = useSelect(teamService.getFilteredTeams);
  const secondTeamSelect = useSelect(teamService.getFilteredTeams);
  const [firstTeamScorers, setFirstTeamScorers] = useState<BracketScorer[]>();
  const [secondTeamScorers, setSecondTeamScorers] = useState<BracketScorer[]>();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isValidating, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { time: '6PM', matchAlreadyHappened: false, firstTeamGoals: 0, secondTeamGoals: 0 },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (isFormValid()) {
      setLoadingAddRequest(true);
      const body: AddMatchDateBracketModel = {
        time: data.time,
        matchAlreadyHappened: data.matchAlreadyHappened || false,
        firstTeam: {
          team: firstTeamSelect.selectedItem,
          goals: data.firstTeamGoals,
          scorers:
            firstTeamScorers && firstTeamScorers?.length > 0
              ? firstTeamScorers.map((scorer) => ({ scorer: scorer.scorer, goals: scorer.goals }))
              : [],
        },
        secondTeam: {
          team: secondTeamSelect.selectedItem,
          goals: data.secondTeamGoals,
          scorers:
            secondTeamScorers && secondTeamScorers?.length > 0
              ? secondTeamScorers.map((scorer) => ({ scorer: scorer.scorer, goals: scorer.goals }))
              : [],
        },
      };

      if (!fixtureId || !matchDateId) {
        onError({
          title: t('common:notification.addErrorTitle'),
          message: t('common:notification.addErrorMessage', { entity: t('common:entity.teamBracket') }),
          isError: true,
        });
        setLoadingAddRequest(false);
        return;
      }

      const addResponse = await tournamentService.addBracketToMatchDate(fixtureId, matchDateId, body);
      if (!addResponse) {
        onError({
          title: t('common:notification.addErrorTitle'),
          message: t('common:notification.addErrorMessage', { entity: t('common:entity.teamBracket') }),
          isError: true,
        });
        setLoadingAddRequest(false);
        return;
      }
      if (onSuccess) onSuccess(addResponse);

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

  const onSecondTeamSelectChange = async (selectedItem?: SelectItem) => {
    if (selectedItem) {
      firstTeamSelect.setItems(teams?.filter((team) => team.id !== selectedItem.id));
      firstTeamSelect.setFilteredItems(teams?.filter((team) => team.id !== selectedItem.id));
    } else {
      firstTeamSelect.setItems(teams);
      firstTeamSelect.setFilteredItems(teams);
    }
  };

  const isFormValid = () => {
    return isValid || (firstTeamSelect.selectedItem && secondTeamSelect.selectedItem);
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
                <Controller
                  control={control}
                  name="matchAlreadyHappened"
                  defaultValue={false}
                  render={({ field: { ref, ...field } }) => (
                    <FormCheckbox
                      id="matchAlreadyHappened"
                      {...field}
                      label={t('tournament.fixture.addMatchBracketModal.matchAlreadyHappened')}
                      description={''}
                    />
                  )}
                />
              </div>
            </div>
            {watch('matchAlreadyHappened') && (
              <div className="mt-3 max-w-md">
                <FormLabel labelText={t('tournament.fixture.addMatchBracketModal.addResult')} />
                <div className="mt-3 flex flex-col gap-3 items-start">
                  <div className="flex flex-col gap-1 justify-center items-start">
                    <span className="text-sm font-medium text-sky-500 mb-2">
                      {t('tournament.fixture.addMatchBracketModal.teamGoals', {
                        team:
                          firstTeamSelect.selectedItem?.name || t('tournament.fixture.addMatchBracketModal.firstTeam'),
                      })}
                    </span>
                    <AddTeamGoals
                      setValue={(goals: number) =>
                        setValue('firstTeamGoals', goals, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                      teamGoals={watch('firstTeamGoals')}
                      {...register('firstTeamGoals', {
                        valueAsNumber: true,
                        min: 0,
                        max: 99,
                      })}
                    />
                    <MatchScorerMultiSelect
                      teamId={firstTeamSelect.selectedItem?.id}
                      onChange={(firstTeamScorers: BracketScorer[]) => setFirstTeamScorers(firstTeamScorers)}
                      teamGoals={watch('firstTeamGoals')}
                    />
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-start">
                    <span className="text-sm font-medium text-sky-500 mb-2">
                      {t('tournament.fixture.addMatchBracketModal.teamGoals', {
                        team:
                          secondTeamSelect.selectedItem?.name ||
                          t('tournament.fixture.addMatchBracketModal.secondTeam'),
                      })}
                    </span>
                    <AddTeamGoals
                      setValue={(goals: number) =>
                        setValue('secondTeamGoals', goals, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                      teamGoals={watch('secondTeamGoals')}
                      {...register('secondTeamGoals', {
                        valueAsNumber: true,
                        min: 0,
                        max: 99,
                      })}
                    />
                    <MatchScorerMultiSelect
                      onChange={(secondTeamScorers: BracketScorer[]) => setSecondTeamScorers(secondTeamScorers)}
                      teamId={secondTeamSelect.selectedItem?.id}
                      teamGoals={watch('secondTeamGoals')}
                    />
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
      </Dialog.Panel>
    </ModalWrapper>
  );
};
