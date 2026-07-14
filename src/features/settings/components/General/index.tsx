import imageCompression from "browser-image-compression";
import { Camera, Moon, Sun, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  deleteProfileAvatar,
  updateUserMetadata,
  uploadProfileAvatar,
  useAuthStore,
} from "@/features/auth";
import { getUserDisplayName } from "@/features/auth/utils";
import { THEME } from "@/features/theme/constants";
import useThemeStore from "@/features/theme/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Switch,
  Toast,
} from "@/shared/ui";

const { toast } = Toast;

const AVATAR_MAX_SIZE_BYTES = 2 * 1024 * 1024;
const AVATAR_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const GeneralSettings = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const avatarInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    email: "",
    displayName: "",
    avatarUrl: "",
    avatarPath: "",
  });
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const getDefaultUserValues = useCallback(() => {
    return {
      email: user?.email || "",
      displayName: getUserDisplayName(user) || "",
      avatarUrl: user?.user_metadata?.avatar_url || "",
      avatarPath: user?.user_metadata?.avatar_path || "",
    };
  }, [user]);

  useEffect(() => {
    const defaultUserValues = getDefaultUserValues();
    setFormValues(defaultUserValues);
  }, [getDefaultUserValues]);

  const displayName = formValues.displayName.trim();
  const displayNameError =
    displayName.length === 0 ? "Display name is required" : "";
  const avatarFallback =
    displayName.charAt(0) || formValues.email.charAt(0) || "K";
  const isDarkMode = theme === THEME.DARK;
  const defaultValues = getDefaultUserValues();
  const isDirty = displayName !== defaultValues.displayName.trim();

  const handleFormChange = (e) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormCancel = () => {
    setFormValues(defaultValues);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (displayNameError || !user?.id) return;

    setIsProfileLoading(true);
    try {
      await updateUserMetadata({
        display_name: displayName,
        avatar_url: formValues.avatarUrl,
        avatar_path: formValues.avatarPath,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsProfileLoading(false);
    }
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

  const handleThemeChange = (checked) => {
    if (checked !== isDarkMode) {
      toggleTheme();
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
      <section className="rounded-lg border border-border p-4 sm:p-6 bg-card">
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
              <h5 className="truncate heading-5">{displayName}</h5>
              <p className="truncate body-base">{formValues.email}</p>
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

      <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <div className="grid gap-5">
          <label className="form-label flex flex-col gap-2">
            Display name
            <Input
              name="displayName"
              value={formValues.displayName}
              onChange={handleFormChange}
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={!!displayNameError}
              className="w-full"
            />
            {displayNameError && (
              <span className="form-error">{displayNameError}</span>
            )}
          </label>
          <label className="form-label">
            Email
            <Input
              type="email"
              name="email"
              value={formValues.email}
              className="mt-1"
              disabled
            />
          </label>
        </div>
      </section>

      <section className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 sm:p-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            {isDarkMode ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
          </span>
          <div>
            <label htmlFor="settings-theme-toggle" className="form-label">
              Dark mode
            </label>
            <p className="body-description">
              {isDarkMode ? "Dark mode is on" : "Dark mode is off"}
            </p>
          </div>
        </div>
        <Switch
          id="settings-theme-toggle"
          checked={isDarkMode}
          onCheckedChange={handleThemeChange}
        />
      </section>

      <div className="flex gap-3 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleFormCancel}
          disabled={isProfileLoading || !isDirty}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isProfileLoading}
          disabled={!isDirty || !!displayNameError}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default GeneralSettings;
