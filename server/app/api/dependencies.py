from collections.abc import AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.repositories.bookmark import BookmarkRepository
from app.services.bookmark import BookmarkService
from app.services.metadata import MetadataService


async def get_bookmark_repository(
    db: AsyncSession = Depends(get_db),
) -> AsyncGenerator[BookmarkRepository, None]:
    yield BookmarkRepository(db)


def get_metadata_service() -> MetadataService:
    return MetadataService()


async def get_bookmark_service(
    repo: BookmarkRepository = Depends(get_bookmark_repository),
    metadata: MetadataService = Depends(get_metadata_service),
) -> AsyncGenerator[BookmarkService, None]:
    yield BookmarkService(repo, metadata)
