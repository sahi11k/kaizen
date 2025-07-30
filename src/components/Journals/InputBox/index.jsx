import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.css";
import FormItem from "@/utils/components/FormItem";
import { createJournal, updateJournal } from "@/db/apis/journals";
import useAuthStore from "@/store/auth";
import { Toast } from "@/utils/components/Toast";
import Spinner from "@/utils/components/Spinner";
import useJournalsStore from "@/store/journals";
import { CREATE, EDIT } from "@/utils/constants";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";

const { toast } = Toast;

const DEFAULT_STATE = {
  title: "Untitled Journal",
  content: "",
  date: new Date(),
};

const InputBox = ({ mode, currentJournal, onResetFormCallback }) => {
  const { user } = useAuthStore();
  const {
    journals,
    setJournals,
    updateJournal: updateJournalInStore,
  } = useJournalsStore();
  const [formValues, setFormValues] = useState(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const disabled = !formValues.content.trim().length;

  const textareaRef = useRef(null);

  useEffect(() => {
    if (mode === EDIT && currentJournal) {
      setFormValues({
        title: currentJournal.title,
        content: currentJournal.content,
        date: new Date(currentJournal.date),
      });
    }
  }, [mode, currentJournal]);

  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight;

    if (newHeight <= 500) {
      textarea.style.height = newHeight + "px";
      textarea.style.overflow = "hidden";
    } else {
      textarea.style.height = "500px";
      textarea.style.overflow = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTimeout(() => {
        autoResize(e.target);
      }, 0);
    }
  };

  const handleInput = (e) => {
    autoResize(e.target);
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (mode === CREATE) {
      await handleCreate();
    } else {
      await handleUpdate();
    }

    onResetFormCallback();
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
  };

  const handleCancel = () => {
    setFormValues(DEFAULT_STATE);
    onResetFormCallback();
  };

  return (
    <div className={`card ${styles.inputBox}`}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox__header}>
          <FormItem.Input
            label="Title"
            placeholder="Enter title"
            className={styles.inputBox__input}
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
            maxLength={50}
          />
          <DatePicker
            showIcon
            className={styles.inputBox__date}
            popperClassName={styles.inputBox__datePopper}
            toggleCalendarOnIconClick
            selected={formValues.date}
            onChange={(date) => setFormValues({ ...formValues, date })}
            onSelect={(date) => setFormValues({ ...formValues, date })}
            popperContainer={({ children }) => (
              <div style={{ position: "relative" }}>{children}</div>
            )}
            showPopperArrow={false}
            popperPlacement="bottom-start"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <FormItem.Textarea
          ref={textareaRef}
          className={styles.inputBox__textarea}
          placeholder="How was your day?"
          rows={5}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          value={formValues.content}
          onChange={(e) =>
            setFormValues({ ...formValues, content: e.target.value })
          }
        />
        <div className={styles.inputBox__buttons}>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={`btn btn--primary ${disabled ? styles.disabled : ""}`}
            type="submit"
            disabled={disabled}
          >
            <span className="btn__icon">{isLoading ? <Spinner /> : ""}</span>
            <span className="btn__label">Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
