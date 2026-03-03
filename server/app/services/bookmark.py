from app.models.bookmark import Bookmark
from app.repositories.bookmark import BookmarkRepository
from app.services.metadata import MetadataService


class BookmarkService:
    def __init__(
        self,
        repo: BookmarkRepository,
        metadata: MetadataService,
    ) -> None:
        self.repo = repo
        self.metadata = metadata

    async def list_bookmarks(self) -> list[Bookmark]:
        return await self.repo.get_all()

    async def create_bookmark(self, url: str) -> Bookmark:
        title, tags = await self.metadata.fetch_metadata(url)
        return await self.repo.create(url=url, title=title, tag_names=tags)

    async def delete_bookmark(self, bookmark_id: int) -> None:
        bookmark = await self.repo.get_by_id(bookmark_id)
        if bookmark is None:
            raise BookmarkNotFoundError(bookmark_id)
        await self.repo.delete(bookmark)


class BookmarkNotFoundError(Exception):
    def __init__(self, bookmark_id: int) -> None:
        self.bookmark_id = bookmark_id
        super().__init__(f"Bookmark {bookmark_id} not found")
