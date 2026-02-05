/**
 * Gets the display name for a user
 * @param {Object} user - The user object
 * @returns {string} The display name or email prefix
 */
export const getUserDisplayName = (user) => {
  return user?.user_metadata?.display_name || user?.email?.split("@")[0];
};
