import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { saveJournal } from "@/db/apis/journals";
import useAuthStore from "@/store/auth";
import useJournalsStore from "@/store/journals";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { debounce } from "@/utils/jsUtils";
import EmptyJournal from "../EmptyJournal";
import {
  AUTO_SAVE_DEBOUNCE_TIME,
  AUTO_SAVE_STATUS,
  DATEPICKER_DATE_FORMAT,
  DEFAULT_JOURNAL_STATE,
} from "@/constants/journals";
import { CloudAlertIcon, CloudCheck, RefreshCcw } from "lucide-react";

const JournalDetail = () => {
  const { user } = useAuthStore();
  const {
    journals,
    setJournals,
    updateJournal: updateJournalInStore,
    currentJournal,
    setCurrentJournal,
  } = useJournalsStore();

  const [formValues, setFormValues] = useState(DEFAULT_JOURNAL_STATE);

  const [saveStatus, setSaveStatus] = useState(AUTO_SAVE_STATUS.PENDING);

  useEffect(() => {
    if (currentJournal) {
      setFormValues({
        title: currentJournal.title,
        content: currentJournal.content,
        date: currentJournal.date,
      });
    }
  }, [currentJournal?.id]);

  const handleSave = async (payload) => {
    const res = await saveJournal(payload, user.id);
    if (res.error) {
      setSaveStatus(AUTO_SAVE_STATUS.ERROR);
      return;
    }
    setSaveStatus(AUTO_SAVE_STATUS.SAVED);
    updateJournalInStore(res.data[0]);
    setCurrentJournal(res.data[0]);
  };

  const debouncedSave = useMemo(
    () =>
      debounce((payload) => {
        setSaveStatus(AUTO_SAVE_STATUS.SAVING);
        handleSave(payload);
      }, AUTO_SAVE_DEBOUNCE_TIME),
    []
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
      word_count: getWordCount(payload.content),
    });
  };

  const handleNewJournalClick = () => {
    const unsavedJournal = journals.find((j) => !j.created_at);
    if (unsavedJournal) {
      setCurrentJournal(unsavedJournal);
      return;
    }
    const newJournal = { ...DEFAULT_JOURNAL_STATE, id: crypto.randomUUID() };
    setCurrentJournal(newJournal);
    setJournals([...journals, newJournal]);
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

const SavingStatus = ({ status, updatedAt }) => {
  let icon = null;
  let text = null;

  if (status === AUTO_SAVE_STATUS.SAVING) {
    icon = (
      <RefreshCcw className="size-4 text-muted-foreground cursor-pointer animate-spin" />
    );
    text = "Saving";
  }

  if (status === AUTO_SAVE_STATUS.SAVED) {
    icon = (
      <CloudCheck className="size-4 text-muted-foreground cursor-pointer" />
    );

    text = `Last saved at ${dayjs(updatedAt).format("DD/MM/YYYY HH:mm")}`;
  }

  if (status === AUTO_SAVE_STATUS.ERROR) {
    icon = (
      <CloudAlertIcon className="size-4 text-muted-foreground cursor-pointer" />
    );
    text = "Failed to save";
  }

  return (
    <div className="flex self-start md:self-center items-center gap-2">
      {icon}
      <span className="text-xs md:text-sm text-muted-foreground font-medium">
        {text}
      </span>
    </div>
  );
};

const getWordCount = (content) => {
  const text = content || "";
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

export default JournalDetail;
