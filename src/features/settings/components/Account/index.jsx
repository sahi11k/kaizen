import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { AlertTriangle, Camera, Save, Trash2, Undo2, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import {
  deleteAccount,
  deleteProfileAvatar,
  signOut,
  updatePassword,
  updateUserMetadata,
  uploadProfileAvatar,
  useAuthStore,
} from "@/features/auth";
import { getUserDisplayName, validateField } from "@/features/auth/utils";
import {
  closePipWindow,
  useTasksStore,
  useTimerStore,
} from "@/features/pomodoro";
import useJournalsStore from "@/features/journals/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  ResponsiveDialog,
  Toast,
} from "@/shared/ui";

const { toast } = Toast;

const AVATAR_MAX_SIZE_BYTES = 2 * 1024 * 1024;
const AVATAR_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DELETE_CONFIRM_TEXT = "DELETE";

const DEFAULT_PASSWORD_FORM_VALUES = {
  password: "",
  confirmPassword: "",
};

const Account = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCurrentTask } = useTasksStore();
  const resetJournals = useJournalsStore((state) => state.resetJournals);
  const avatarInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    email: "",
    displayName: "",
    avatarUrl: "",
    avatarPath: "",
  });
  const [passwordValues, setPasswordValues] = useState(
    DEFAULT_PASSWORD_FORM_VALUES,
  );
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmValue, setDeleteConfirmValue] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const getDefaultUserValues = useCallback(() => {
    return {
      email: user?.email || "",
      displayName: getUserDisplayName(user) || "",
      avatarUrl: user?.user_metadata?.avatar_url || "",
      avatarPath: user?.user_metadata?.avatar_path || "",
    };
  }, [user]);

  useEffect(() => {
    setFormValues(getDefaultUserValues());
  }, [getDefaultUserValues]);

  const defaultValues = useMemo(
    () => getDefaultUserValues(),
    [getDefaultUserValues],
  );

  const displayName = formValues.displayName.trim();
  const isProfileDirty =
    formValues.email !== defaultValues.email ||
    formValues.displayName !== defaultValues.displayName;
  const canSaveProfile = isProfileDirty && displayName.length > 0;
  const avatarFallback =
    displayName.charAt(0) || formValues.email.charAt(0) || "K";
  const passwordError = passwordErrors.password;
  const confirmPasswordError = passwordErrors.confirmPassword;
  const canUpdatePassword =
    passwordValues.password.length > 0 &&
    passwordValues.confirmPassword.length > 0 &&
    !passwordError &&
    !confirmPasswordError;
  const canDeleteAccount = deleteConfirmValue === DELETE_CONFIRM_TEXT;

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!canSaveProfile) return;

    setIsProfileLoading(true);
    try {
      const res = await updateUserMetadata({
        display_name: displayName,
        avatar_url: formValues.avatarUrl,
        avatar_path: formValues.avatarPath,
      });
      if (res.data?.user) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleProfileCancel = () => {
    setFormValues(defaultValues);
  };

  const handleFormChange = (e) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarButtonClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user?.id) return;

    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WebP image");
      return;
    }

    if (file.size > AVATAR_MAX_SIZE_BYTES) {
      toast.error("Avatar image must be 2 MB or smaller");
      return;
    }

    setIsAvatarLoading(true);
    let uploadedAvatarPath = "";

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 512,
        useWebWorker: true,
        fileType: file.type,
      });
      const { avatarUrl, avatarPath } = await uploadProfileAvatar(
        compressedFile,
        user.id,
      );
      uploadedAvatarPath = avatarPath;
      const avatarUrlWithCacheBust = `${avatarUrl}?v=${Date.now()}`;

      await updateUserMetadata({
        display_name: displayName,
        avatar_url: avatarUrlWithCacheBust,
        avatar_path: avatarPath,
      });

      setFormValues((currentValues) => ({
        ...currentValues,
        avatarUrl: avatarUrlWithCacheBust,
        avatarPath,
      }));
      toast.success("Avatar updated successfully");
    } catch (error) {
      if (uploadedAvatarPath) {
        try {
          await deleteProfileAvatar(uploadedAvatarPath);
        } catch {
          // Best-effort cleanup only.
        }
      }
      toast.error(error.message || "Failed to update avatar");
    } finally {
      setIsAvatarLoading(false);
    }
  };

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
      <section className="rounded-lg border border-border p-4 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              aria-label="Upload profile photo"
              onClick={handleAvatarButtonClick}
              disabled={isAvatarLoading}
              className="group relative size-24 shrink-0 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed"
            >
              <Avatar className="size-24 border border-border">
                <AvatarImage src={formValues.avatarUrl} alt={displayName} />
                <AvatarFallback className="bg-secondary text-2xl font-semibold uppercase text-secondary-foreground">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {isAvatarLoading ? (
                  <Camera className="size-5 animate-pulse" />
                ) : (
                  <span className="flex flex-col items-center gap-1">
                    <Upload className="size-4" />
                    Upload
                  </span>
                )}
              </span>
            </button>
            <div className="min-w-0">
              <p className="truncate text-2xl font-semibold text-foreground">
                {displayName}
              </p>
              <p className="body-description truncate">{formValues.email}</p>
            </div>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept={AVATAR_ALLOWED_TYPES.join(",")}
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </section>

      <form
        className="rounded-lg border border-border p-4 sm:p-6"
        onSubmit={handleProfileSubmit}
      >
        <div className="grid gap-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
            Display name
            <Input
              name="displayName"
              value={formValues.displayName}
              onChange={handleFormChange}
              placeholder="Your name"
              autoComplete="name"
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
            Email
            <Input
              type="email"
              name="email"
              value={formValues.email}
              disabled
              readOnly
              className="w-full"
            />
          </label>
        </div>
        <div className="mt-6 flex gap-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            icon={<Undo2 className="size-4" />}
            onClick={handleProfileCancel}
            disabled={isProfileLoading || !isProfileDirty}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            icon={<Save className="size-4" />}
            loading={isProfileLoading}
            disabled={!canSaveProfile}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Save
          </Button>
        </div>
      </form>

      <form
        className="rounded-lg border border-border p-4 sm:p-6"
        onSubmit={handlePasswordSubmit}
      >
        <div className="grid gap-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
            New password
            <Input
              type="password"
              value={passwordValues.password}
              onChange={(e) => handlePasswordChange("password", e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
              aria-invalid={!!passwordError}
              className="w-full"
            />
            {passwordError && <span className="form-error">{passwordError}</span>}
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
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
              className="w-full"
            />
            {confirmPasswordError && (
              <span className="form-error">{confirmPasswordError}</span>
            )}
          </label>
        </div>
        <div className="mt-6 flex gap-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            icon={<Undo2 className="size-4" />}
            onClick={handlePasswordCancel}
            disabled={
              isPasswordLoading ||
              (!passwordValues.password && !passwordValues.confirmPassword)
            }
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            icon={<Save className="size-4" />}
            loading={isPasswordLoading}
            disabled={!canUpdatePassword}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Update
          </Button>
        </div>
      </form>

      <section className="rounded-lg border border-destructive/60 bg-destructive/5 p-4 sm:p-6">
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
        title="Delete account"
        description="This permanently deletes your account data and cannot be recovered."
        className="!text-left"
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDeleteDialogOpenChange(false)}
              disabled={isDeleteLoading}
              size="sm"
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
              size="sm"
            >
              Delete Account
            </Button>
          </>
        }
      >
        <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
          Type DELETE to confirm
          <Input
            value={deleteConfirmValue}
            onChange={(e) => setDeleteConfirmValue(e.target.value)}
            placeholder={DELETE_CONFIRM_TEXT}
            autoComplete="off"
          />
        </label>
      </ResponsiveDialog>
    </div>
  );
};

export default Account;
