import type { AxiosInstance } from "axios";
import type { Bookmark, CreateBookmarkPayload } from "@/types";
import { BaseRepository } from "./repository";

export class BookmarkRepository extends BaseRepository<
  Bookmark,
  CreateBookmarkPayload
> {
  constructor(client: AxiosInstance) {
    super(client, "/bookmarks");
  }
}
