import React, { useState } from "react";
import styles from "./style.module.css";
import VisibilityOffIcon from "@/assets/icons/visibilityOff.svg?react";
import VisibilityIcon from "@/assets/icons/visibility.svg?react";

export const FormItemWrapper = ({ children, className = "" }) => {
  return <div className={`${styles.formItem} ${className}`}>{children}</div>;
};

const Input = ({ type = "text", ...props }) => (
  <FormItemWrapper>
    <input type={type} {...props} />
  </FormItemWrapper>
);

const Textarea = ({ rows = 4, ...props }) => (
  <FormItemWrapper>
    <textarea rows={rows} {...props} />
  </FormItemWrapper>
);

const Password = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItemWrapper className={styles.passwordInput}>
      <input {...props} type={showPassword ? "text" : "password"} />
      <span
        className={styles.passwordToggle}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </span>
    </FormItemWrapper>
  );
};

const DefaultFormItem = (props) => <Input {...props} />;
DefaultFormItem.Input = Input;
DefaultFormItem.Textarea = Textarea;
DefaultFormItem.Password = Password;

export default DefaultFormItem;
