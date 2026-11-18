import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { deleteAccount, signOut, updatePassword } from "@/features/auth";
import { validateField } from "@/features/auth/utils";
import useJournalsStore from "@/features/journals/store";
import {
  closePipWindow,
  useTasksStore,
  useTimerStore,
} from "@/features/pomodoro";
import { Button, Input, ResponsiveDialog, Toast } from "@/shared/ui";

const { toast } = Toast;

const DELETE_CONFIRM_TEXT = "DELETE";

type PasswordFormValues = {
  password: string;
  confirmPassword: string;
};

type PasswordFormErrors = Partial<PasswordFormValues>;

const DEFAULT_PASSWORD_FORM_VALUES: PasswordFormValues = {
  password: "",
  confirmPassword: "",
};

const SecuritySettings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCurrentTask } = useTasksStore();
  const resetJournals = useJournalsStore((state) => state.resetJournals);

  const [passwordValues, setPasswordValues] = useState(
    DEFAULT_PASSWORD_FORM_VALUES,
  );
  const [passwordErrors, setPasswordErrors] = useState<PasswordFormErrors>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmValue, setDeleteConfirmValue] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const passwordError = passwordErrors.password;
  const confirmPasswordError = passwordErrors.confirmPassword;
  const canUpdatePassword =
    passwordValues.password.length > 0 &&
    passwordValues.confirmPassword.length > 0 &&
    !passwordError &&
    !confirmPasswordError;
  const canDeleteAccount = deleteConfirmValue === DELETE_CONFIRM_TEXT;

  const handlePasswordChange = (field, value) => {
    const nextValues = {
      ...passwordValues,
      [field]: value,
    };
    const nextErrors = { ...passwordErrors };

    if (field === "password") {
      nextErrors.password = validateField("password", value);
      if (nextValues.confirmPassword) {
        nextErrors.confirmPassword =
          value === nextValues.confirmPassword ? "" : "Passwords do not match";
      }
    }

    if (field === "confirmPassword") {
      nextErrors.confirmPassword =
        value === nextValues.password ? "" : "Passwords do not match";
    }

    setPasswordValues(nextValues);
    setPasswordErrors(nextErrors);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {
      password: validateField("password", passwordValues.password),
      confirmPassword:
        passwordValues.password === passwordValues.confirmPassword
          ? ""
          : "Passwords do not match",
    };
    setPasswordErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsPasswordLoading(true);
    try {
      const response = await updatePassword({
        password: passwordValues.password,
      });
      toast.success(response.message || "Password updated successfully");
      setPasswordValues(DEFAULT_PASSWORD_FORM_VALUES);
      setPasswordErrors({});
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordValues(DEFAULT_PASSWORD_FORM_VALUES);
    setPasswordErrors({});
  };

  const handleDeleteAccount = async () => {
    if (!canDeleteAccount) return;

    setIsDeleteLoading(true);
    try {
      await deleteAccount();
      try {
        await signOut();
      } catch {
        // The auth user may already be deleted; local cleanup below still runs.
      }
      setCurrentTask(null);
      resetJournals();
      queryClient.clear();
      useTimerStore.getState().resetTimer(0);
      closePipWindow();
      toast.success("Account deleted successfully");
      setIsDeleteDialogOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleDeleteDialogOpenChange = (open) => {
    setIsDeleteDialogOpen(open);
    if (!open) {
      setDeleteConfirmValue("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form
        className="rounded-lg border border-border bg-card p-4 sm:p-6"
        onSubmit={handlePasswordSubmit}
      >
        <div className="grid gap-5">
          <label className="form-label flex flex-col gap-2">
            New password
            <Input
              type="password"
              value={passwordValues.password}
              onChange={(e) => handlePasswordChange("password", e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
              aria-invalid={!!passwordError}
              className="w-full bg-background"
            />
            {passwordError && (
              <span className="form-error">{passwordError}</span>
            )}
          </label>
          <label className="form-label flex flex-col gap-2">
            Confirm password
            <Input
              type="password"
              value={passwordValues.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              aria-invalid={!!confirmPasswordError}
              className="w-full bg-background"
            />
            {confirmPasswordError && (
              <span className="form-error">{confirmPasswordError}</span>
            )}
          </label>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handlePasswordCancel}
            disabled={
              isPasswordLoading ||
              (!passwordValues.password && !passwordValues.confirmPassword)
            }
            size="sm"
            className="flex-none border-overlay-field-border"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isPasswordLoading}
            disabled={!canUpdatePassword}
            size="sm"
            className="flex-none"
          >
            Update
          </Button>
        </div>
      </form>

      <section className="rounded-lg border border-destructive bg-destructive-soft p-4 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 size-5 shrink-0 text-destructive" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Danger Zone
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Deleting your account will permanently delete all your saved
                progress, images, journals, tasks, settings, and every entry
                linked to your profile. This data cannot be recovered and will
                be lost forever. Are you sure you want to continue?
              </p>
            </div>
          </div>
          <div className="flex sm:justify-end">
            <Button
              type="button"
              variant="destructive"
              icon={<Trash2 className="size-4" />}
              onClick={() => setIsDeleteDialogOpen(true)}
              size="sm"
              className="w-full sm:w-auto"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </section>

      <ResponsiveDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        title="Delete Account"
        description="This permanently deletes your account data and cannot be recovered."
        className="!text-left"
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDeleteDialogOpenChange(false)}
              disabled={isDeleteLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              icon={<Trash2 className="size-4" />}
              loading={isDeleteLoading}
              disabled={!canDeleteAccount}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </>
        }
      >
        <label className="form-label flex flex-col gap-2">
          Type DELETE to confirm
          <Input
            value={deleteConfirmValue}
            onChange={(e) => setDeleteConfirmValue(e.target.value)}
            placeholder={DELETE_CONFIRM_TEXT}
            autoComplete="off"
            className="!bg-background"
          />
        </label>
      </ResponsiveDialog>
    </div>
  );
};

export default SecuritySettings;
