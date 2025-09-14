import { deepCopy } from "@/utils/jsUtils";
import dayjs from "dayjs";

export const groupByMonth = (journals = []) => {
  const sortedJournals = getSortedJournals(journals);

  const byMonth = sortedJournals.reduce((acc, j) => {
    const key = dayjs(j.date).format("YYYY-MM");
    if (!acc[key]) acc[key] = [];
    acc[key].push(j);
    return acc;
  }, {});

  const keys = Object.keys(byMonth).sort((a, b) => (a > b ? -1 : 1));

  return keys.map((k) => ({
    key: k,
    label: dayjs(k + "-01").format("MMMM YYYY"),
    items: byMonth[k],
  }));
};

export const getSortedJournals = (journals = []) => {
  const sortedJournals = deepCopy(journals);
  return sortedJournals.sort((a, b) => {
    const dayA = a.date
      ? dayjs(a.date).startOf("day").valueOf()
      : Number.NEGATIVE_INFINITY;
    const dayB = b.date
      ? dayjs(b.date).startOf("day").valueOf()
      : Number.NEGATIVE_INFINITY;
    if (dayB !== dayA) return dayB - dayA; // newer day first

    // If created_at is missing => treat as newest => +Infinity
    const createdA = a.created_at
      ? dayjs(a.created_at).valueOf()
      : Number.POSITIVE_INFINITY;
    const createdB = b.created_at
      ? dayjs(b.created_at).valueOf()
      : Number.POSITIVE_INFINITY;

    if (createdB === createdA) return 0;
    return createdB - createdA;
  });
};

export const getTotalWordsWritten = (journals = []) => {
  if (journals.length === 0) return 0;
  const totalWords = journals.reduce((acc, j) => {
    const words = j.word_count || 0;
    return acc + words;
  }, 0);
  return totalWords;
};

export const getJournalStreak = (sortedJournals = []) => {
  if (!sortedJournals.length) return 0;

  const today = dayjs().startOf("day");
  const mostRecent = dayjs(sortedJournals[0]?.created_at || "").startOf("day");

  // If most recent entry is too old, streak is already broken
  if (today.diff(mostRecent, "day") > 1) return 0;

  let streak = 1;
  let prevDay = mostRecent;

  for (let i = 1; i < sortedJournals.length; i++) {
    const currDay = dayjs(sortedJournals[i]?.created_at).startOf("day");

    if (currDay.isSame(prevDay, "day")) {
      // same-day duplicate → skip
      continue;
    }

    const diff = prevDay.diff(currDay, "day");

    if (diff === 1) {
      // consecutive → extend streak
      streak++;
      prevDay = currDay;
    } else {
      // gap → streak broken
      break;
    }
  }

  return streak;
};

export const getSelfReflectionDate = (dateInput) => {
  if (!dateInput) return "NA";
  const inputDay = dayjs(dateInput).startOf("day");
  const today = dayjs().startOf("day");
  const diff = today.diff(inputDay, "day");

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return inputDay.format("ddd, D MMM");
};
