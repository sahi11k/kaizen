import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

type ComparisonVariant = "positive" | "negative" | "neutral";

type Comparison = {
  label: string;
  variant: ComparisonVariant;
};

type ComparisonBadgeProps = {
  comparison?: Comparison | null;
};

const badgeBaseClass =
  "inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold";

const comparisonBadgeVariants: Record<
  ComparisonVariant,
  { Icon: LucideIcon; className: string }
> = {
  positive: {
    Icon: TrendingUp,
    className:
      "border-success-soft bg-success-soft text-success-soft-foreground",
  },
  negative: {
    Icon: TrendingDown,
    className:
      "border-destructive-soft bg-destructive-soft text-destructive-soft-foreground",
  },
  neutral: {
    Icon: Minus,
    className: "border-border bg-muted text-muted-foreground",
  },
};

const ComparisonBadge = ({ comparison }: ComparisonBadgeProps) => {
  if (!comparison) return null;

  const badgeVariant =
    comparisonBadgeVariants[comparison.variant] ??
    comparisonBadgeVariants.neutral;
  const { Icon, className } = badgeVariant;

  return (
    <span className={`${badgeBaseClass} ${className}`}>
      <Icon className="size-3" />
      {comparison.label}
    </span>
  );
};

export default ComparisonBadge;
