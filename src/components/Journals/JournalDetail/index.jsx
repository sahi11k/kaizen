import { Button } from "@/components/ui/button";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { createJournal, updateJournal } from "@/db/apis/journals";
import useAuthStore from "@/store/auth";
import { Toast } from "@/utils/components/Toast";
import useJournalsStore from "@/store/journals";
import { CREATE, EDIT } from "@/utils/constants";
import dayjs from "dayjs";
// import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

const { toast } = Toast;

const DEFAULT_STATE = {
  title: "Untitled Journal",
  content: "",
  date: new Date(),
};

const JournalDetail = ({ currentJournal, setCurrentJournal }) => {
  const { user } = useAuthStore();
  const {
    journals,
    setJournals,
    updateJournal: updateJournalInStore,
  } = useJournalsStore();
  const [formValues, setFormValues] = useState(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const disabled = !formValues.content.trim().length;
  const mode = currentJournal?.id ? EDIT : CREATE;

  useEffect(() => {
    if (currentJournal?.id) {
      setFormValues({
        title: currentJournal.title,
        content: currentJournal.content,
        date: currentJournal.date,
      });
    }
  }, [currentJournal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (mode === CREATE) {
      await handleCreate();
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
    setIsLoading(false);
    if (res.error) {
      return toast.error(res.error);
    }
    updateJournalInStore(res.data[0]);
    toast.success("Journal updated successfully");
  };

  const handleCreate = async () => {
    const res = await createJournal(
      {
        ...formValues,
        date: dayjs(formValues.date).format("YYYY-MM-DD"),
      },
      user.id
    );
    setIsLoading(false);
    if (res.error) {
      return toast.error(res.error);
    }
    setJournals([...res.data, ...journals]);
    toast.success("Journal created successfully");
    handleReset();
  };

  const handleReset = () => {
    setFormValues(DEFAULT_STATE);
    setCurrentJournal(null);
  };

  // const removeJournal = async (journalId) => {
  //   const res = await deleteJournal(journalId, user.id);
  //   if (res.error) {
  //     return toast.error(res.error);
  //   }
  //   const updatedJournals = journals.filter((j) => j.id !== journalId);
  //   setJournals(updatedJournals);
  //   toast.success("Journal deleted successfully");
  // };

  return (
    <div className="flex-1 px-6 flex flex-col">
      <div className="flex-1 px-12 py-6">
        <form className="flex flex-col gap-6 h-full">
          <div className="flex flex-col">
            <DatePicker
              defautDate={formValues.date}
              onDateChange={(date) => setFormValues({ ...formValues, date })}
              triggerClassName="border-none !px-0 !text-sm font-medium tracking-wide shadow-none text-muted-foreground hover:bg-transparent w-56"
              showIcon={false}
              format="dddd, MMMM D, YYYY"
            />

            <Input
              label="Title"
              placeholder="How are you feeling today?"
              value={formValues.title}
              onChange={(e) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
              maxLength={50}
              className="-mt-2 !text-3xl !h-auto !font-normal !px-0 border-none  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent "
            />
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Reflect on your day..."
              value={formValues.content}
              onChange={(e) =>
                setFormValues({ ...formValues, content: e.target.value })
              }
              className="h-full !px-0 border-none body-base focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent resize-none"
            />
          </div>
        </form>
      </div>
      <div className="h-16 flex items-center justify-center border-t border-border -mx-6 px-6">
        <div className="flex items-center justify-center gap-6">
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            disabled={disabled}
          >
            {mode === CREATE ? "Add Journal" : "Update Journal"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalDetail;
