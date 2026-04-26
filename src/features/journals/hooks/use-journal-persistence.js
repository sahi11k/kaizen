import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuthStore } from "@/features/auth";
import useJournalsStore from "@/features/journals/store";
import {
  extractImageSrcsFromJson,
  getWordCount,
} from "@/features/journals/utils";
import { debounce } from "@/shared/lib/utils";
import {
  AUTO_SAVE_DEBOUNCE_TIME,
  AUTO_SAVE_STATUS,
  JOURNAL_DEFAULT_BACKEND_TITLE,
} from "@/features/journals/constants";
import { useSaveJournalMutation } from "@/features/journals/mutations";
import { journalLoadPartsFromRecord } from "@/shared/lib/tiptap-editor-content";

/**
 * @param {{ isSaveError: boolean; isSavePending: boolean; lastSavedAt?: string }} args
 * @returns {{ showSaveStatus: boolean; saveStatus: string }}
 */
function getAutosaveUiState({
  isSaveError,
  isSavePending,
  lastSavedAt,
}) {
  const showSaveStatus =
    isSaveError || isSavePending || Boolean(lastSavedAt);
  const saveStatus = isSaveError
    ? AUTO_SAVE_STATUS.ERROR
    : isSavePending
      ? AUTO_SAVE_STATUS.SAVING
      : AUTO_SAVE_STATUS.SAVED;
  return { showSaveStatus, saveStatus };
}

export function useJournalPersistence() {
  const { user } = useAuthStore();
  const { currentJournal, setUnsavedJournal } = useJournalsStore();
  const [journalDate, setJournalDate] = useState(new Date());
  const [journalTitle, setJournalTitle] = useState("");
  const currentJournalRef = useRef(currentJournal);
  const lastContentJsonRef = useRef("");
  const lastBodyJsonRef = useRef("");
  const journalTitleRef = useRef("");
  const journalDateRef = useRef(journalDate);
  const lastResetEntryIdRef = useRef(undefined);
  /** Tracks the set of image src URLs present in the last-known body content. */
  const trackedImageSrcsRef = useRef(new Set());

  currentJournalRef.current = currentJournal;
  journalDateRef.current = journalDate;

  const {
    mutate: saveJournal,
    isPending: isSavePending,
    isError: isSaveError,
  } = useSaveJournalMutation();

  const journalParts = useMemo(
    () =>
      journalLoadPartsFromRecord(currentJournal, {
        defaultBackendTitle: JOURNAL_DEFAULT_BACKEND_TITLE,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload parts when id/title/content change, not whole object identity
    [currentJournal?.id, currentJournal?.title, currentJournal?.content],
  );

  useEffect(() => {
    if (currentJournal) {
      setJournalDate(
        currentJournal.date ? new Date(currentJournal.date) : new Date(),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when switching journal entry
  }, [currentJournal?.id]);

  /* Reset title + body refs only when switching entries (not after each autosave). */
  useLayoutEffect(() => {
    if (!currentJournal) {
      lastResetEntryIdRef.current = undefined;
      return;
    }
    const id = currentJournal.id;
    if (lastResetEntryIdRef.current === id) return;
    lastResetEntryIdRef.current = id;
    const { bodyForEditor, titleForField } = journalParts;
    const bodyJson = JSON.stringify(bodyForEditor);
    lastBodyJsonRef.current = bodyJson;
    lastContentJsonRef.current = bodyJson;
    journalTitleRef.current = titleForField;
    setJournalTitle(titleForField);
    trackedImageSrcsRef.current = extractImageSrcsFromJson(bodyJson);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `journalParts` tracks content/title; `id` gates applying resets to the active entry only
  }, [currentJournal?.id, journalParts]);

  const persistJournal = useCallback(
    (overrides) => {
      const journal = currentJournalRef.current;
      if (!journal || !user?.id) return;
      const isNewJournal = !journal.createdAt;
      saveJournal(
        { payload: { ...journal, ...overrides }, userId: user.id },
        {
          onSuccess: () => {
            if (isNewJournal) setUnsavedJournal(null);
          },
        },
      );
    },
    [saveJournal, setUnsavedJournal, user?.id],
  );

  const debouncedPersist = useMemo(
    () =>
      debounce((overrides) => {
        persistJournal(overrides);
      }, AUTO_SAVE_DEBOUNCE_TIME),
    [persistJournal],
  );

  const persistMergedFromParts = useCallback(
    (bodyJsonString, titleText) => {
      let bodyDoc;
      try {
        bodyDoc = JSON.parse(bodyJsonString);
      } catch {
        return;
      }
      const bodyJson = JSON.stringify(bodyDoc);

      // Detect images removed from the editor and delete them from storage
      const nextSrcs = extractImageSrcsFromJson(bodyDoc);
      const removedSrcs = [...trackedImageSrcsRef.current].filter(
        (src) => !nextSrcs.has(src),
      );
      trackedImageSrcsRef.current = nextSrcs;

      if (removedSrcs.length > 0) {
        import("@/features/journals/apis").then(
          ({ deleteJournalImages, extractStoragePathFromSignedUrl }) => {
            const paths = removedSrcs
              .map(extractStoragePathFromSignedUrl)
              .filter(Boolean);
            if (paths.length > 0) {
              deleteJournalImages(paths).catch((err) =>
                console.error("Failed to delete removed image(s):", err),
              );
            }
          },
        );
      }

      lastBodyJsonRef.current = bodyJson;
      lastContentJsonRef.current = bodyJson;
      debouncedPersist({
        content: bodyJson,
        title: titleText.trim(),
        wordCount: getWordCount(bodyJson),
        date: journalDateRef.current,
      });
    },
    [debouncedPersist],
  );

  const handleEditorUpdate = useCallback(
    (json) => {
      persistMergedFromParts(json, journalTitleRef.current);
    },
    [persistMergedFromParts],
  );

  const handleTitleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setJournalTitle(value);
      journalTitleRef.current = value;
      const bodyStr = lastBodyJsonRef.current;
      if (!bodyStr) return;
      persistMergedFromParts(bodyStr, value);
    },
    [persistMergedFromParts],
  );

  const handleJournalDateChange = useCallback(
    (nextDate) => {
      const d = nextDate instanceof Date ? nextDate : new Date(nextDate);
      setJournalDate(d);
      journalDateRef.current = d;
      const bodyStr = lastBodyJsonRef.current;
      if (!bodyStr) return;
      persistMergedFromParts(bodyStr, journalTitleRef.current);
    },
    [persistMergedFromParts],
  );

  const lastSavedAt = currentJournal?.updatedAt ?? currentJournal?.createdAt;
  const { showSaveStatus, saveStatus } = getAutosaveUiState({
    isSaveError,
    isSavePending,
    lastSavedAt,
  });

  return {
    journalParts,
    journalDate,
    journalTitle,
    handleEditorUpdate,
    handleTitleChange,
    handleJournalDateChange,
    showSaveStatus,
    saveStatus,
    lastSavedAt,
  };
}
