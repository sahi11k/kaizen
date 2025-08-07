import React, { useState } from "react";
import styles from "./style.module.css";
import VisibilityOffIcon from "@/assets/icons/visibilityOff.svg?react";
import VisibilityIcon from "@/assets/icons/visibility.svg?react";
import AddIcon from "@/assets/icons/add.svg?react";
import MinusIcon from "@/assets/icons/minus.svg?react";

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

const InputNumber = ({
  value,
  onChange,
  min = 1,
  max = 120,
  name,
  ...props
}) => {
  const handleChange = (e) => {
    const numValue = parseInt(e.target.value, 10);
    onChange({
      target: {
        name,
        value: numValue,
      },
    });
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange({
        target: {
          name,
          value: value + 1,
        },
      });
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange({
        target: {
          name,
          value: value - 1,
        },
      });
    }
  };

  return (
    <div className={styles.inputNumberWrapper}>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className={styles.inputNumber}
        {...props}
      />
      <div className={styles.stepper}>
        <button
          type="button"
          className={`btn ${styles.stepperBtn} ${styles.stepperBtnDown}`}
          onClick={handleDecrement}
          disabled={value <= min}
        >
          <MinusIcon className={styles.stepperBtnIcon} width={20} height={20} />
        </button>
        <button
          type="button"
          className={`btn ${styles.stepperBtn} ${styles.stepperBtnUp}`}
          onClick={handleIncrement}
          disabled={value >= max}
        >
          <AddIcon className={styles.stepperBtnIcon} width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

const DefaultFormItem = (props) => <Input {...props} />;
DefaultFormItem.Input = Input;
DefaultFormItem.Textarea = Textarea;
DefaultFormItem.Password = Password;
DefaultFormItem.InputNumber = InputNumber;

export default DefaultFormItem;
