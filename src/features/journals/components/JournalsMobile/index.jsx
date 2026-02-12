import JournalOutline from "@/assets/icons/journal-outline.svg?react";
import JournalFilled from "@/assets/icons/journal.filled.svg?react";

import JournalListContent from "@/features/journals/components/JournalList/JournalListContent";
import JournalDetail from "@/features/journals/components/JournalDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useState } from "react";
import { List } from "lucide-react";

const LIST_TAB = "list";
const REFLECT_TAB = "reflect";

const JournalsMobile = () => {
  const [currentTab, setCurrentTab] = useState(LIST_TAB);

  const handleTabChange = (tabKey) => {
    setCurrentTab(tabKey);
  };

  const onItemClick = () => {
    setCurrentTab(REFLECT_TAB);
  };

  const TABS = [
    {
      key: LIST_TAB,
      label: "Journals",
      icon: <List />,
      iconFilled: <List />,
      content: <JournalListContent onItemClick={onItemClick} />,
    },
    {
      key: REFLECT_TAB,
      label: "Reflect",
      icon: <JournalOutline fill="currentColor" />,
      iconFilled: <JournalFilled fill="currentColor" />,
      content: <JournalDetail />,
    },
  ];

  return (
    <div className="md:hidden h-[calc(100vh-64px)]">
      <Tabs
        defaultValue={LIST_TAB}
        value={currentTab}
        onValueChange={handleTabChange}
        className="gap-0 h-full"
      >
        {TABS.map((tab) => (
          <TabsContent
            key={tab.key}
            value={tab.key}
            className="flex flex-col min-h-0"
          >
            {tab.content}
          </TabsContent>
        ))}
        <TabsList className="w-full rounded-none p-0 h-16">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={`rounded-none !bg-muted !shadow-none cursor-pointer ${
                currentTab === tab.key ? "!text-primary " : ""
              } `}
            >
              <span
                className={`rounded-full py-2 px-4 flex items-center justify-center [&>svg]:!size-5 ${
                  currentTab === tab.key ? "bg-primary-container" : ""
                }`}
              >
                {currentTab === tab.key ? tab.iconFilled : tab.icon}{" "}
                <span className="ml-2">{tab.label}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default JournalsMobile;
