import { SquarePen } from "lucide-react";
import JournalList from "@/features/journals/components/JournalList";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const JournalListPage = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.JOURNALS);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col">
      <JournalList
        showHeader
        headerTitle="Journals"
        headerButtonLabel="New"
        headerButtonIcon={<SquarePen className="size-4" />}
      />
    </div>
  );
};

export default JournalListPage;
