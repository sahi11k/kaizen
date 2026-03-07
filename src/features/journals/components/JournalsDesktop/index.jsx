import JournalList from "@/features/journals/components/JournalList";
import JournalEditor from "@/features/journals/components/JournalEditor";

const JournalsDesktop = () => {
  return (
    <div className="hidden md:flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex md:flex-none md:w-72 xl:w-92 flex-col border-r border-border">
        <JournalList showHeader />
      </div>
      <JournalEditor />
    </div>
  );
};

export default JournalsDesktop;
