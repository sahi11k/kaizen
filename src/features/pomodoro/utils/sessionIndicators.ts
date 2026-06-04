import {
  MAX_SESSION_INDICATOR_DOTS,
  MIN_SESSIONS,
} from "@/features/pomodoro/constants";

type SessionIndicatorState = "completed" | "active" | "upcoming";

type SessionIndicator = {
  index: number;
  state: SessionIndicatorState;
};

export const getSessionProgress = (
  completedSessions = 0,
  totalSessions = MIN_SESSIONS,
) => {
  const normalizedTotal = Math.max(MIN_SESSIONS, Math.floor(totalSessions));
  const nextSession = Math.max(MIN_SESSIONS, Math.floor(completedSessions) + 1);
  const currentSession = Math.min(
    normalizedTotal,
    nextSession,
  );

  return {
    currentSession,
    isExtraSession: nextSession > normalizedTotal,
    nextSession,
    totalSessions: normalizedTotal,
  };
};

export const getSessionIndicators = (
  completedSessions = 0,
  totalSessions = MIN_SESSIONS,
): SessionIndicator[] => {
  const { currentSession, totalSessions: normalizedTotal } = getSessionProgress(
    completedSessions,
    totalSessions,
  );
  const dotCount = Math.min(normalizedTotal, MAX_SESSION_INDICATOR_DOTS);
  const isComplete = completedSessions >= normalizedTotal;
  const currentDot = Math.min(
    dotCount,
    Math.max(
      MIN_SESSIONS,
      Math.ceil((currentSession / normalizedTotal) * dotCount),
    ),
  );
  const completedDots = Math.min(currentDot - 1, completedSessions);

  return Array.from({ length: dotCount }, (_, index) => {
    const dotNumber = index + 1;

    if (isComplete || dotNumber <= completedDots) {
      return { index, state: "completed" };
    }

    if (dotNumber === currentDot) {
      return { index, state: "active" };
    }

    return { index, state: "upcoming" };
  });
};
