import React, { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/features/auth/store/auth";
import useJournalsStore from "@/features/journals/store/journals";
import { getWordCount } from "@/features/journals/helpers";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { DatePicker } from "@/shared/ui/date-picker";
import { debounce } from "@/shared/lib/utils";
import EmptyJournal from "../EmptyJournal";
import {
  AUTO_SAVE_DEBOUNCE_TIME,
  AUTO_SAVE_STATUS,
  DATEPICKER_DATE_FORMAT,
  DEFAULT_JOURNAL_STATE,
} from "@/features/journals/constants";
import { useSaveJournalMutation } from "@/features/journals/services/mutations";
import SavingStatus from "@/features/journals/components/SavingStatus";

const JournalDetail = () => {
  const { user } = useAuthStore();
  const {
    unsavedJournal,
    setUnsavedJournal,
    currentJournal,
    setCurrentJournal,
  } = useJournalsStore();

  const [formValues, setFormValues] = useState(DEFAULT_JOURNAL_STATE);
  const [saveStatus, setSaveStatus] = useState(AUTO_SAVE_STATUS.PENDING);

  const { mutate: saveJournal } = useSaveJournalMutation();

  useEffect(() => {
    if (currentJournal) {
      setFormValues({
        title: currentJournal.title,
        content: currentJournal.content,
        date: currentJournal.date,
      });
    }
  }, [currentJournal?.id]);

  const handleSave = (payload) => {
    const isNewJournal = !currentJournal?.createdAt;
    setSaveStatus(AUTO_SAVE_STATUS.SAVING);
    saveJournal(
      { payload, userId: user?.id },
      {
        onSuccess: () => {
          if (isNewJournal) setUnsavedJournal(null);
          setSaveStatus(AUTO_SAVE_STATUS.SAVED);
        },
        onError: () => setSaveStatus(AUTO_SAVE_STATUS.ERROR),
      },
    );
  };

  const debouncedSave = useMemo(
    () =>
      debounce((payload) => {
        handleSave(payload);
      }, AUTO_SAVE_DEBOUNCE_TIME),
    [],
  );

  const handleChange = (key, value) => {
    const payload = {
      ...formValues,
      [key]: value,
    };
    setFormValues(payload);
    debouncedSave({
      ...currentJournal,
      ...payload,
      wordCount: getWordCount(payload.content),
    });
  };

  const handleNewJournalClick = () => {
    if (unsavedJournal) {
      setCurrentJournal(unsavedJournal);
      return;
    }
    const journal = { ...DEFAULT_JOURNAL_STATE, id: crypto.randomUUID() };
    setUnsavedJournal(journal);
    setCurrentJournal(journal);
  };

  if (!currentJournal) {
    return <EmptyJournal onClick={handleNewJournalClick} />;
  }

  return (
    <div className="flex h-full flex-1 px-6 lg:px-12 flex flex-col">
      <div className="flex flex-col  flex-1  py-4 h-full ">
        <div className="flex flex-col-reverse items-start md:flex-row md:gap-4 md:items-center justify-between">
          <DatePicker
            defautDate={formValues.date}
            onDateChange={(date) => handleChange("date", date)}
            triggerClassName="border-none !px-0 !text-xs xl:!text-sm font-medium tracking-wide shadow-none text-muted-foreground hover:bg-transparent"
            format={DATEPICKER_DATE_FORMAT}
            tooltip="Click to update"
            showIcon={false}
            popoverClassName="border-border"
            side="bottom"
            align="start"
          />
          <SavingStatus
            status={saveStatus}
            updatedAt={currentJournal.updatedAt}
          />
        </div>
        <form
          className="flex flex-col flex-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col border-b border-border pb-1">
            <Input
              label="Title"
              placeholder="Give your day a title"
              value={formValues.title}
              onChange={(e) => handleChange("title", e.target.value)}
              maxLength={50}
              className="-mt-1 text-2xl xl:!text-3xl !h-auto !font-normal !px-0 border-none  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent "
            />
          </div>
          <div className="flex-1 ">
            <Textarea
              placeholder="Write about your day..."
              value={formValues.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="h-full !px-1 !pt-4 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalDetail;
