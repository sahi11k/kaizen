interface UserLike {
  user_metadata?: { display_name?: string };
  email?: string;
}

export const getUserDisplayName = (
  user: UserLike | null,
): string | undefined => {
  return user?.user_metadata?.display_name || user?.email?.split("@")[0];
};
