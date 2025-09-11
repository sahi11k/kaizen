import { Button } from "@/components/ui/button";
import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import {
  createJournal,
  deleteJournal,
  updateJournal,
} from "@/db/apis/journals";
import useAuthStore from "@/store/auth";
import { Toast } from "@/components/ui/toast";
import useJournalsStore from "@/store/journals";
import { CREATE } from "@/constants/global";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { debounce } from "@/utils/jsUtils";
import EmptyJournal from "../EmptyJournal";
import {
  AUTO_SAVE_DEBOUNCE_TIME,
  AUTO_SAVE_STATUS,
  DEFAULT_JOURNAL_STATE,
} from "@/constants/journals";

const { toast } = Toast;

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

  const [isSaving, setIsSaving] = useState(AUTO_SAVE_STATUS.PENDING);
  const [mode, setMode] = useState(CREATE);

  useEffect(() => {
    if (currentJournal) {
      setFormValues({
        title: currentJournal.title,
        content: currentJournal.content,
        date: currentJournal.date,
      });
    }
  }, [currentJournal]);

  // const removeJournal = async (journalId) => {
  //   const res = await deleteJournal(journalId, user.id);
  //   if (res.error) {
  //     return toast.error(res.error);
  //   }
  //   const updatedJournals = journals.filter((j) => j.id !== journalId);
  //   setJournals(updatedJournals);
  //   toast.success("Journal deleted successfully");
  //   // handleReset();
  // };

  const handleSubmit = async (payload) => {
    if (mode === CREATE) {
      await handleCreate(payload);
    } else {
      await handleUpdate();
    }
  };

  const handleUpdate = async () => {
    const res = await updateJournal(
      {
        ...currentJournal,
        ...formValues,
        date: dayjs(formValues.date).format("YYYY-MM-DD"),
      },
      user.id
    );
    if (res.error) {
      return toast.error(res.error);
    }
    updateJournalInStore(res.data[0]);
    setCurrentJournal(res.data[0]);
    toast.success("Journal updated successfully");
  };

  const handleCreate = async (payload) => {
    const res = await createJournal(
      {
        ...payload,
        date: dayjs(formValues.date).format("YYYY-MM-DD"),
      },
      user.id
    );
    if (res.error) {
      setIsSaving(AUTO_SAVE_STATUS.ERROR);
      return;
    }
    setIsSaving(AUTO_SAVE_STATUS.SAVED);
  };

  const debouncedSave = useMemo(
    () =>
      debounce((value) => {
        setIsSaving(AUTO_SAVE_STATUS.SAVING);
        handleSubmit(value);
      }, AUTO_SAVE_DEBOUNCE_TIME),
    []
  );

  const handleContentChange = (e) => {
    const payload = { ...formValues, content: e.target.value };
    setFormValues(payload);
    debouncedSave(payload);
  };

  const handleNewJournalClick = () => {
    setCurrentJournal(DEFAULT_JOURNAL_STATE);
    setJournals([...journals, DEFAULT_JOURNAL_STATE]);
    setMode(CREATE);
  };

  if (!currentJournal) {
    return <EmptyJournal onClick={handleNewJournalClick} />;
  }

  return (
    <div className="hidden md:flex h-full flex-1  px-6 xl:px-24 flex flex-col">
      <div className="flex flex-col  flex-1  py-4 h-full ">
        <div className="flex gap-4 items-center">
          <DatePicker
            defautDate={formValues.date}
            onDateChange={(date) => setFormValues({ ...formValues, date })}
            triggerClassName="border-none !px-0 !text-xs xl:!text-sm font-medium tracking-wide shadow-none text-muted-foreground hover:bg-transparent"
            format="dddd, MMMM D, YYYY"
            tooltip="Click to update"
            showIcon={false}
            popoverClassName="border-border"
            side="bottom"
            align="start"
          />
          <span className="text-xs italic text-muted-foreground font-medium">
            {/* {isSaving ? "Saving..." : ""} */}
          </span>
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
              onChange={(e) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
              maxLength={50}
              className="-mt-1 text-2xl xl:!text-3xl !h-auto !font-normal !px-0 border-none  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent "
            />
          </div>
          <div className="flex-1 ">
            <Textarea
              placeholder="Write about your day..."
              value={formValues.content}
              onChange={handleContentChange}
              className="h-full !px-1 !pt-4 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalDetail;
