import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";
import { TASK_CATEGORIES } from "@/utils/constants";
import EmptyIcon from "@/assets/icons/empty.svg?react";

const Dropdown = ({
  trigger,
  options = [],
  onSelect,
  placeholder = "Select an option",
  disabled = false,
  closeOnSelect = true,
  customStyles = { dropdown: {}, trigger: {}, menu: {} },
  value = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option, index) => {
    if (onSelect) {
      onSelect(option, index);
    }
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
      style={{
        ...customStyles.dropdown,
      }}
    >
      <div
        className={`${styles.trigger}`}
        onClick={handleTriggerClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTriggerClick();
          }
        }}
        style={{
          ...customStyles.trigger,
        }}
      >
        {trigger || (
          <span className={styles.placeholder}>{value || placeholder}</span>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={styles.menu}
          style={{
            ...customStyles.menu,
          }}
        >
          {options.length === 0 ? (
            <div className={styles.emptyState}>
              <EmptyIcon />
              <span>No options available</span>
            </div>
          ) : (
            options.map((option, index) => {
              const isObject = typeof option === "object" && option !== null;
              const label = isObject ? option.label : option;
              const value = isObject ? option.value : option;
              const disabled = isObject ? option.disabled : false;
              const icon = isObject ? option.icon : null;

              return (
                <div
                  key={index}
                  className={`${styles.option} ${
                    disabled ? styles.optionDisabled : ""
                  }`}
                  onClick={() => !disabled && handleOptionClick(option, index)}
                  role="option"
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (!disabled && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleOptionClick(option, index);
                    }
                  }}
                >
                  {icon && <span className={styles.optionIcon}>{icon}</span>}
                  <span className={styles.optionLabel}>{label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
