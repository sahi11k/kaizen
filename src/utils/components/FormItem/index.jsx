import React from "react";
import styles from "./style.module.css";

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

const DefaultFormItem = (props) => <Input {...props} />;
DefaultFormItem.Input = Input;
DefaultFormItem.Textarea = Textarea;

export default DefaultFormItem;
