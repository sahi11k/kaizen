import JournalOutline from "@/assets/icons/journal-outline.svg?react";
import JournalFilled from "@/assets/icons/journal.filled.svg?react";

import JournalListContent from "@/components/Journals/JournalList/JournalListContent";
import JournalDetail from "@/components/Journals/JournalDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      content: (
        <div className="h-full">
          <JournalListContent onItemClick={onItemClick} />
        </div>
      ),
    },
    {
      key: REFLECT_TAB,
      label: "Reflect",
      icon: <JournalOutline fill="currentColor" />,
      iconFilled: <JournalFilled fill="currentColor" />,
      content: (
        <div className="">
          <JournalDetail />
        </div>
      ),
    },
  ];

  return (
    <div className="md:hidden h-[calc(100vh-64px)]">
      <Tabs
        defaultValue={LIST_TAB}
        value={currentTab}
        onValueChange={handleTabChange}
        className="h-full gap-0 overflow-hidden"
      >
        {TABS.map((tab) => (
          <TabsContent
            key={tab.key}
            value={tab.key}
            className="flex-1 overflow-hidden px-6"
          >
            {tab.content}
          </TabsContent>
        ))}
        <TabsList className="sticky right-0 bottom-0 left-0 w-full rounded-none p-0 h-16">
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
                  currentTab === tab.key ? "bg-primary-light" : ""
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
