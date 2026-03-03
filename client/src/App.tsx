import { Bookmark } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AddBookmarkForm } from "@/components/add-bookmark-form";
import { BookmarkList } from "@/components/bookmark-list";

function App() {
  return (
    <div className="relative min-h-svh">
      {/* Gradient mesh background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-900/20" />
        <div className="absolute -bottom-[30%] -left-[20%] h-[70%] w-[50%] rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/20" />
        <div className="absolute top-[20%] left-[30%] h-[40%] w-[40%] rounded-full bg-rose-100/30 blur-3xl dark:bg-rose-900/10" />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Bookmark className="size-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Raily AI - Smart Bookmarks
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Save URLs and auto-extract tags from their content
          </p>
        </header>

        {/* Add form */}
        <div className="rounded-xl border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <AddBookmarkForm />
        </div>

        <Separator className="my-8" />

        {/* List */}
        <BookmarkList />
      </div>
    </div>
  );
}

export default App;
