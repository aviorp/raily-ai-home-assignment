import { type FormEvent, useRef } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateBookmark } from "@/hooks/use-bookmarks";
import { toast } from "sonner";

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function AddBookmarkForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: createBookmark, isPending } = useCreateBookmark();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const url = inputRef.current?.value.trim() ?? "";

    if (!url) return;

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL (e.g. https://example.com)");
      return;
    }

    createBookmark(url, {
      onSuccess: () => {
        if (inputRef.current) inputRef.current.value = "";
        toast.success("Bookmark added");
      },
      onError: (err) => {
        toast.error(String(err));
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        ref={inputRef}
        type="url"
        placeholder="https://example.com"
        className="h-10 flex-1"
        disabled={isPending}
        autoFocus
      />
      <Button type="submit" disabled={isPending} className="h-10 gap-1.5">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        Add
      </Button>
    </form>
  );
}
