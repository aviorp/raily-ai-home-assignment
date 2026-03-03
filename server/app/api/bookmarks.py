from fastapi import APIRouter, Depends, HTTPException

from app.api.dependencies import get_bookmark_service
from app.schemas.bookmark import BookmarkResponse, CreateBookmarkRequest
from app.services.bookmark import BookmarkNotFoundError, BookmarkService

router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.get("", response_model=list[BookmarkResponse])
async def list_bookmarks(
    service: BookmarkService = Depends(get_bookmark_service),
) -> list[BookmarkResponse]:
    bookmarks = await service.list_bookmarks()
    return [BookmarkResponse.model_validate(b) for b in bookmarks]


@router.post("", response_model=BookmarkResponse, status_code=201)
async def create_bookmark(
    payload: CreateBookmarkRequest,
    service: BookmarkService = Depends(get_bookmark_service),
) -> BookmarkResponse:
    bookmark = await service.create_bookmark(str(payload.url))
    return BookmarkResponse.model_validate(bookmark)


@router.delete("/{bookmark_id}", status_code=204)
async def delete_bookmark(
    bookmark_id: int,
    service: BookmarkService = Depends(get_bookmark_service),
) -> None:
    try:
        await service.delete_bookmark(bookmark_id)
    except BookmarkNotFoundError:
        raise HTTPException(status_code=404, detail="Bookmark not found")
