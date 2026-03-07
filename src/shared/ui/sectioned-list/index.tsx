import { cn } from "@/shared/lib/utils";

interface SectionedListSection {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface SectionedListProps {
  sections: SectionedListSection[];
  className?: string;
}

const SectionedList = ({
  sections,
  className,
}: SectionedListProps): React.ReactElement => {
  return (
    <div className={cn(className)}>
      {sections.map(({ key, label, content }) => (
        <section key={key}>
          <div className="sticky top-0 z-10 px-4 py-2 bg-muted">
            <h4 className="text-xs font-semibold text-muted-foreground">
              {label}
            </h4>
          </div>
          <ul className="m-2 flex flex-col gap-2" role="listbox">
            {content}
          </ul>
        </section>
      ))}
    </div>
  );
};

export { SectionedList };
export type { SectionedListProps, SectionedListSection };
