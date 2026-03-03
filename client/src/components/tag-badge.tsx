import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/types";

const TAG_COLORS = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
] as const;

function getTagColor(name: string) {
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

export function TagBadge({ tag }: { tag: Tag }) {
  return (
    <Badge
      variant="secondary"
      className={`${getTagColor(tag.name)} border-0 text-xs font-medium`}
    >
      {tag.name}
    </Badge>
  );
}
