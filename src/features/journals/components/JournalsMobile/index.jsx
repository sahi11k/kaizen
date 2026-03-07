import JournalOutline from "@/assets/icons/journal-outline.svg?react";
import JournalFilled from "@/assets/icons/journal.filled.svg?react";
import JournalList from "@/features/journals/components/JournalList";
import JournalEditor from "@/features/journals/components/JournalEditor";
import { MobileTabLayout } from "@/app/layouts";
import { useMemo, useState, useCallback } from "react";
import { List } from "lucide-react";

const LIST_TAB = "list";
const REFLECT_TAB = "reflect";

const JournalsMobile = () => {
  const [currentTab, setCurrentTab] = useState(LIST_TAB);

  const onItemClick = useCallback(() => {
    setCurrentTab(REFLECT_TAB);
  }, [setCurrentTab]);

  const TABS = useMemo(
    () => [
      {
        key: LIST_TAB,
        label: "Journals",
        icon: <List />,
        iconFilled: <List />,
        content: <JournalList onItemClick={onItemClick} showHeader={false} />,
      },
      {
        key: REFLECT_TAB,
        label: "Reflect",
        icon: <JournalOutline fill="currentColor" />,
        iconFilled: <JournalFilled fill="currentColor" />,
        content: <JournalEditor />,
      },
    ],
    [onItemClick],
  );

  return (
    <MobileTabLayout
      tabs={TABS}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    />
  );
};

export default JournalsMobile;
