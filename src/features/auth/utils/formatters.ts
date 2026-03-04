interface UserLike {
  user_metadata?: { display_name?: string; name?: string };
  email?: string;
}

export const getUserDisplayName = (
  user: UserLike | null,
): string | undefined => {
  return (
    user?.user_metadata?.display_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0]
  );
};
