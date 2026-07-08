import React from "react";
import { JOURNAL_EDITOR_BODY_PLACEHOLDER } from "@/features/journals/constants";
import { TipTapEditor } from "@/shared/ui/tiptap-editor";
import { useJournalPersistence } from "@/features/journals/hooks/use-journal-persistence";
import JournalEditorHeader from "./JournalEditorHeader";

const JournalEditor = ({ journal, onNewJournalSaved }) => {
  const { journalParts, handleEditorUpdate, ...headerProps } =
    useJournalPersistence(journal, { onNewJournalSaved });

  return (
    <div className="w-full max-w-5xl mx-auto">
      <JournalEditorHeader journal={journal} {...headerProps} />
      <TipTapEditor
        key={journal.id}
        journalId={journal.id}
        initialContent={journalParts.bodyForEditor}
        onPersistentUpdate={handleEditorUpdate}
        showThemeToggle={false}
        bodyPlaceholder={JOURNAL_EDITOR_BODY_PLACEHOLDER}
      />
    </div>
  );
};

export default JournalEditor;
