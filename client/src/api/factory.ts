import type { AxiosInstance } from "axios";
import { BookmarkRepository } from "./bookmarks.repository";

interface ApiFactory {
  bookmarks: BookmarkRepository;
}

function createApiFactory(client: AxiosInstance): ApiFactory {
  return {
    bookmarks: new BookmarkRepository(client),
  };
}

export type { ApiFactory };
export default createApiFactory;
