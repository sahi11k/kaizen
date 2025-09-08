import { Button } from "@/components/ui/button";
import React from "react";
import { useEffect, useState } from "react";
import {
  createJournal,
  deleteJournal,
  updateJournal,
} from "@/db/apis/journals";
import useAuthStore from "@/store/auth";
import { Toast } from "@/components/ui/toast";
import useJournalsStore from "@/store/journals";
import { CREATE, EDIT } from "@/constants/global";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
  ChevronLeft,
  ChevronRight,
  Pen,
  SquareActivity,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

const { toast } = Toast;

const DEFAULT_STATE = {
  title: "",
  content: "",
  date: new Date(),
};

const JournalDetail = () => {
  const { user } = useAuthStore();
  const {
    journals,
    setJournals,
    updateJournal: updateJournalInStore,
    currentJournal,
    setCurrentJournal,
  } = useJournalsStore();

  const [formValues, setFormValues] = useState(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const mode = currentJournal?.id ? EDIT : CREATE;

  useEffect(() => {
    const current = currentJournal ? currentJournal : DEFAULT_STATE;
    setFormValues({
      title: current.title,
      content: current.content,
      date: current.date,
    });
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

  const removeJournal = async (journalId) => {
    const res = await deleteJournal(journalId, user.id);
    if (res.error) {
      return toast.error(res.error);
    }
    const updatedJournals = journals.filter((j) => j.id !== journalId);
    setJournals(updatedJournals);
    toast.success("Journal deleted successfully");
    handleReset();
  };

  return (
    <div className="hidden md:flex h-full flex-1  px-6 xl:px-24 flex flex-col">
      <div className="flex items-center justify-between gap-2 bg-muted -mx-6 xl:-mx-24 px-6 xl:px-24  border-b border-border">
        <div className="-mx-4">
          <Button variant="icon" icon={<ChevronLeft />}></Button>
          <Button variant="icon" icon={<ChevronRight />}></Button>
        </div>
        <Button
          variant="icon"
          onClick={() => removeJournal(currentJournal.id)}
          hidden={mode === CREATE}
          icon={<Trash2 className="size-5" />}
          className="hover:text-destructive"
        />
      </div>
      <div className="flex flex-col w-[70ch] flex-1 mx-auto py-4 h-full">
        <div className="flex gap-4 items-center">
          <DatePicker
            defautDate={formValues.date}
            onDateChange={(date) => setFormValues({ ...formValues, date })}
            triggerClassName="border-none !px-0 !text-xs xl:!text-sm font-medium tracking-wide shadow-none text-muted-foreground hover:bg-transparent"
            format="dddd, MMMM D, YYYY"
            tooltip="Click to update"
            showIcon={false}
            popoverClassName="border-border"
          />
          <span className="text-xs italic text-muted-foreground font-medium">
            {/* Saving... */}
          </span>
        </div>
        <form className="flex flex-col flex-1">
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
          <div className="flex-1">
            <Textarea
              placeholder="Write about your day..."
              value={formValues.content}
              onChange={(e) =>
                setFormValues({ ...formValues, content: e.target.value })
              }
              className="h-full !px-1 !pt-4 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent resize-none"
            />
          </div>
        </form>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === CREATE ? "Create" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalDetail;
