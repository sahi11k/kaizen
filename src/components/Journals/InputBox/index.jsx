import React, { useRef, useEffect } from "react";
import styles from "./style.module.css";
import FormItem from "@/utils/components/FormItem";

const InputBox = () => {
  const textareaRef = useRef(null);

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

  return (
    <div className={`card ${styles.inputBox}`}>
      <FormItem.Textarea
        ref={textareaRef}
        className={styles.inputBox__textarea}
        placeholder="How was your day?"
        rows={6}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <button className={styles.inputBox__button}>Add</button>
    </div>
  );
};

export default InputBox;
