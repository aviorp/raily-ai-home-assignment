from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.bookmark import Bookmark, Tag


class BookmarkRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all(self) -> list[Bookmark]:
        result = await self.db.execute(
            select(Bookmark).order_by(Bookmark.created_at.desc())
        )
        return list(result.scalars().all())

    async def get_by_id(self, bookmark_id: int) -> Bookmark | None:
        return await self.db.get(Bookmark, bookmark_id)

    async def create(self, url: str, title: str, tag_names: list[str]) -> Bookmark:
        bookmark = Bookmark(url=url, title=title)
        bookmark.tags = [Tag(name=name) for name in tag_names]
        self.db.add(bookmark)
        await self.db.commit()
        await self.db.refresh(bookmark)
        return bookmark

    async def delete(self, bookmark: Bookmark) -> None:
        await self.db.delete(bookmark)
        await self.db.commit()
