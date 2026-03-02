export const validateField = (field: string, value: string): string => {
  const trimmedValue = value?.trim();
  switch (field) {
    case "name":
      if (!trimmedValue || !trimmedValue?.length)
        return "Please enter a valid name";
      if (trimmedValue?.length > 50)
        return "Name must be less than 50 characters";
      return "";
    case "email":
      if (trimmedValue?.includes("@") && trimmedValue?.includes(".")) return "";
      return "Please enter a valid email";
    case "password":
      if (trimmedValue?.length >= 6 && trimmedValue?.length <= 32) return "";
      return "Password must be between 6 and 32 characters";
    default:
      return "";
  }
};
