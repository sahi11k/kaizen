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
} from "lucide-react";

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
  const [deleteLoading, setDeleteLoading] = useState(false);
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
    DEFAULT_STATE;
    setCurrentJournal(null);
  };

  const removeJournal = async (journalId) => {
    setDeleteLoading(true);
    const res = await deleteJournal(journalId, user.id);
    if (res.error) {
      setDeleteLoading(false);
      return toast.error(res.error);
    }
    const updatedJournals = journals.filter((j) => j.id !== journalId);
    setJournals(updatedJournals);
    toast.success("Journal deleted successfully");
    handleReset();
    setDeleteLoading(false);
  };

  return (
    <div className="hidden xl:flex flex-1 px-6 flex flex-col">
      {/* <div className="h-16 flex items-center justify-center border-b border-border -mx-6 px-6"> */}
      {/* <div className="flex items-center justify-center gap-6">
          <Button
            variant="text"
            className="!text-muted-foreground hover:bg-accent"
            onClick={handleReset}
          >
            Reset
          </Button>
          {mode === EDIT && (
            <Button
              variant="outline"
              loading={deleteLoading}
              onClick={() => removeJournal(currentJournal.id)}
              className="text-destructive hover:text-destructive hover:bg-transparent"
            >
              Delete
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            disabled={disabled}
          >
            {mode === CREATE ? "Add Journal" : "Update Journal"}
          </Button>
        </div> */}
      {/* </div> */}
      <div className="flex-1 px-12 py-6">
        <div className="flex items-center justify-between">
          <DatePicker
            defautDate={formValues.date}
            onDateChange={(date) => setFormValues({ ...formValues, date })}
            triggerClassName="border-none !px-0 !text-sm font-medium tracking-wide shadow-none text-muted-foreground hover:bg-transparent w-56"
            showIcon={false}
            format="dddd, MMMM D, YYYY"
          />
          <div className="flex items-center gap-1">
            <Button
              variant="icon"
              icon={<SquarePen className="size-5" />}
              onClick={handleReset}
            />
            {/* <div className="flex items-center">
              <Button
                variant="icon"
                icon={<ChevronLeft className="size-5" />}
              />
              <Button
                variant="icon"
                icon={<ChevronRight className="size-5" />}
              />
            </div> */}
          </div>
        </div>
        <form className="flex flex-col gap-6 h-full">
          <div className="flex flex-col border-b border-border pb-3">
            <Input
              label="Title"
              placeholder="Give your day a title"
              value={formValues.title}
              onChange={(e) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
              maxLength={50}
              className="-mt-1 !text-3xl !h-auto !font-normal !px-0 border-none  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent "
            />
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Write about your day..."
              value={formValues.content}
              onChange={(e) =>
                setFormValues({ ...formValues, content: e.target.value })
              }
              className="h-full !px-0 border-none body-base focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalDetail;
