import { AlertCircle, BookmarkIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkCard } from "@/components/bookmark-card";
import { useBookmarks, useDeleteBookmark } from "@/hooks/use-bookmarks";
import { toast } from "sonner";

function BookmarkListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-xl border p-4">
          <Skeleton className="size-10 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-18 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BookmarkList() {
  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
    refetch,
  } = useBookmarks();
  const deleteMutation = useDeleteBookmark();

  function handleDelete(id: number) {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Bookmark deleted"),
      onError: (err) => toast.error(String(err)),
    });
  }

  if (isLoading) return <BookmarkListSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 py-12">
        <AlertCircle className="size-8 text-destructive" />
        <p className="text-sm font-medium text-destructive">
          Failed to load bookmarks
        </p>
        <p className="text-xs text-muted-foreground">{String(error)}</p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="size-3.5" />
          Retry
        </Button>
      </div>
    );
  }

  if (!bookmarks?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <BookmarkIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">No bookmarks yet</p>
        <p className="text-xs text-muted-foreground">
          Add a URL above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={handleDelete}
          isDeleting={
            deleteMutation.isPending && deleteMutation.variables === bookmark.id
          }
        />
      ))}
    </div>
  );
}
