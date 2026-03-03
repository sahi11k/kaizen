import {
  getSortedJournals,
  getTotalWordsWritten,
  getJournalStreak,
  JOURNAL_CONTENT_TRUNCATION_LENGTH,
} from "@/features/journals";

export const getJournalsWidgetData = (journals) => {
  const sortedJournals = getSortedJournals(journals);
  const latestJournal = sortedJournals[0];
  const totalWordsWritten = getTotalWordsWritten(journals);
  const journalStreak = getJournalStreak(sortedJournals);

  const contentLength = latestJournal?.content.length;
  const truncatedContent = latestJournal?.content
    ?.slice(
      0,
      contentLength > JOURNAL_CONTENT_TRUNCATION_LENGTH
        ? JOURNAL_CONTENT_TRUNCATION_LENGTH
        : contentLength,
    )
    .concat(contentLength > JOURNAL_CONTENT_TRUNCATION_LENGTH ? "..." : "");

  return { latestJournal, totalWordsWritten, journalStreak, truncatedContent };
};
