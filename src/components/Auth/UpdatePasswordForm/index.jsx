import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Toast } from "@/utils/components/Toast";
import { updatePassword } from "@/db/apis/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateField } from "@/utils/utils";
import { ErrorText } from "@/components/Auth/ErrorText";

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
        navigate("/dashboard");
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
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="body-description px-2">
          Secure your account by setting a new password.
        </label>
        <Input
          type="password"
          id="password"
          value={formValues.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          placeholder="Enter password"
        />
        {errors.password && <ErrorText error={errors.password} />}
        <Button type="submit" loading={isLoading} className="mt-2">
          Update Password
        </Button>
      </form>
      <div className="text-center">
        <Link to="/" className="text-link underline-offset-2">
          Skip For Now
        </Link>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
