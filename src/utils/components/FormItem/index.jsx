import React, { useState } from "react";
import styles from "./style.module.css";
import VisibilityOffIcon from "@/assets/icons/visibilityOff.svg?react";
import VisibilityIcon from "@/assets/icons/visibility.svg?react";

const FormItem = ({ children, className = "" }) => {
  return <div className={`${styles.formItem} ${className}`}>{children}</div>;
};

const Input = ({ type = "text", ...props }) => (
  <FormItem>
    <input type={type} {...props} />
  </FormItem>
);

const Textarea = ({ rows = 4, ...props }) => (
  <FormItem>
    <textarea rows={rows} {...props} />
  </FormItem>
);

const Password = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem className={styles.passwordInput}>
      <input {...props} type={showPassword ? "text" : "password"} />
      <span
        className={styles.passwordToggle}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </span>
    </FormItem>
  );
};

const DefaultFormItem = (props) => <Input {...props} />;
DefaultFormItem.Input = Input;
DefaultFormItem.Textarea = Textarea;
DefaultFormItem.Password = Password;

export default DefaultFormItem;
