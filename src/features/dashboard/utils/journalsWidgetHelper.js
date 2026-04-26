import {
  getSortedJournals,
  getTotalWordsWritten,
  getJournalStreak,
  JOURNAL_CONTENT_TRUNCATION_LENGTH,
  getJournalPlainText,
} from "@/features/journals";

export const getJournalsWidgetData = (journals) => {
  const sortedJournals = getSortedJournals(journals);
  const latestJournal = sortedJournals[0];
  const totalWordsWritten = getTotalWordsWritten(journals);
  const journalStreak = getJournalStreak(sortedJournals);

  const plain = latestJournal?.content
    ? getJournalPlainText(latestJournal.content)
    : "";
  const truncatedContent =
    plain.length > JOURNAL_CONTENT_TRUNCATION_LENGTH
      ? `${plain.slice(0, JOURNAL_CONTENT_TRUNCATION_LENGTH)}...`
      : plain;

  return { latestJournal, totalWordsWritten, journalStreak, truncatedContent };
};
