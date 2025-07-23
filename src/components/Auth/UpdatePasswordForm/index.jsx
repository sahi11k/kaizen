import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "@/components/Auth/OtpVerification/style.module.css";
import authStyles from "@/components/Auth/style.module.css";
import FormItem from "@/utils/components/FormItem";
import { Toast } from "@/utils/components/Toast";
import Spinner from "@/utils/components/Spinner";
import { ErrorText } from "@/components/Auth/ErrorText";
import { validateField } from "@/utils/utils";
import { updatePassword } from "@/db/apis/auth";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
};

const UpdatePasswordForm = () => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;
    setIsLoading(true);
    const response = await updatePassword(formValues);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      setTimeout(() => {
        setFormValues(DEFAULT_FORM_VALUES);
        setErrors({});
        navigate("/");
      }, 1000);
    }
    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
    setFormValues({ ...formValues, [field]: value });
  };

  return (
    <>
      <div className={styles.otpHeader}>
        <h2>Update Your Password</h2>
        <p>Enter your new password.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormItem.Password
          type="password"
          id="password"
          value={formValues.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          placeholder="Enter password"
        />
        {errors.password && <ErrorText error={errors.password} />}
        <button type="submit" className={`btn ${authStyles.submitButton}`}>
          {isLoading ? (
            <span className="btn__icon">
              <Spinner />
            </span>
          ) : (
            ""
          )}
          Update Password
        </button>
      </form>
      <div className={styles.footer}>
        <div className={styles.redirectLink}>
          <Link to="/" className="btn">
            Skip for now
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordForm;
