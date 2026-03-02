export const getFormattedTime = (
  seconds: number,
): { minutes: string; seconds: string } => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return {
    minutes,
    seconds: remainingSeconds,
  };
};
