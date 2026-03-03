import React from "react";
import EmptyJournalIllustration from "@/assets/illustrations/empty-journal.svg?react";
import { Button } from "@/shared/ui/button";
import { SquarePen } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";

const EmptyJournal = ({ onClick }) => {
  return (
    <EmptyState
      icon={
        <div className="w-80 md:w-100">
          <EmptyJournalIllustration />
        </div>
      }
      title="No Journal Selected"
      description="Choose a journal from the list or create a new one."
      action={
        <Button
          onClick={onClick}
          className="mt-2"
          icon={<SquarePen className="size-4" />}
        >
          New Journal
        </Button>
      }
    />
  );
};

export default EmptyJournal;
