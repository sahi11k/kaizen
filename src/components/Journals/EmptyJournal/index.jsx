import React from "react";
import ErrorIllustation from "@/assets/illustrations/empty-journal.svg?react";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

const EmptyJournal = ({ onClick }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-80 md:w-100">
          <ErrorIllustation className="text-primary fill-current" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="heading-2">No Journal Selected</h2>
          <p className="body-description text-center">
            Choose a journal from the list or create a new one.
          </p>
        </div>
        <Button
          onClick={onClick}
          className="mt-2"
          icon={<SquarePen className="size-4" />}
        >
          New Journal
        </Button>
      </div>
    </div>
  );
};

export default EmptyJournal;
