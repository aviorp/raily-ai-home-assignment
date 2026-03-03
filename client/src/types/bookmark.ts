export interface Tag {
  id: number;
  name: string;
  bookmark_id: number;
}

export interface Bookmark {
  id: number;
  url: string;
  title: string;
  tags: Tag[];
  created_at: string;
}

export interface CreateBookmarkPayload {
  url: string;
}

export interface BookmarkListResponse {
  bookmarks: Bookmark[];
}
