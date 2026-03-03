import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface MobileTab {
  key: string;
  label: string;
  icon: React.ReactNode;
  iconFilled: React.ReactNode;
  content: React.ReactNode;
}

interface MobileTabLayoutProps {
  tabs: MobileTab[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  contentClassName?: string;
}

const MobileTabLayout = ({
  tabs,
  currentTab,
  onTabChange,
  contentClassName,
}: MobileTabLayoutProps): React.ReactElement => {
  return (
    <div className="md:hidden h-[calc(100vh-64px)]">
      <Tabs
        defaultValue={currentTab}
        value={currentTab}
        onValueChange={onTabChange}
        className="gap-0 h-full"
      >
        {tabs.map((tab) => (
          <TabsContent
            key={tab.key}
            value={tab.key}
            className={cn("flex flex-col min-h-0", contentClassName)}
          >
            {tab.content}
          </TabsContent>
        ))}
        <TabsList className="w-full rounded-none p-0 h-16">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={`rounded-none !bg-muted !shadow-none cursor-pointer ${
                currentTab === tab.key
                  ? "!text-primary-container-foreground"
                  : ""
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

export { MobileTabLayout };
export type { MobileTab, MobileTabLayoutProps };
