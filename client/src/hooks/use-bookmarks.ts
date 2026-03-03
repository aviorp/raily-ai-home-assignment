import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { Bookmark } from "@/types";

const BOOKMARKS_KEY = ["bookmarks"] as const;

export function useBookmarks() {
  return useQuery<Bookmark[]>({
    queryKey: BOOKMARKS_KEY,
    queryFn: () => api.bookmarks.getAll(),
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (url: string) => api.bookmarks.create({ url }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_KEY });
    },
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.bookmarks.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_KEY });
    },
  });
}
