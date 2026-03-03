import { ExternalLink, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/tag-badge";
import { BookmarkFactory } from "@/factories/bookmark.factory";
import type { Bookmark } from "@/types";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function BookmarkCard({
  bookmark,
  onDelete,
  isDeleting,
}: BookmarkCardProps) {
  return (
    <Card className="group bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-4">
        {/* Favicon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <img
            src={`https://www.google.com/s2/favicons?domain=${BookmarkFactory.getDomain(bookmark.url)}&sz=32`}
            alt=""
            className="size-5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold leading-tight">
                {bookmark.title}
              </h3>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {BookmarkFactory.getDomain(bookmark.url)}
                <ExternalLink className="size-3" />
              </a>
            </div>

            <Button
              variant="ghost"
              size="icon-xs"
              className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              onClick={() => onDelete(bookmark.id)}
              disabled={isDeleting}
              aria-label="Delete bookmark"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>

          {/* Tags */}
          {bookmark.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {bookmark.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}

          {/* Date */}
          <p className="mt-2 text-[11px] text-muted-foreground">
            {BookmarkFactory.formatDate(bookmark.created_at)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
