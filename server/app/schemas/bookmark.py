from datetime import datetime

from pydantic import BaseModel, HttpUrl


class CreateBookmarkRequest(BaseModel):
    url: HttpUrl


class TagResponse(BaseModel):
    id: int
    name: str
    bookmark_id: int

    model_config = {"from_attributes": True}


class BookmarkResponse(BaseModel):
    id: int
    url: str
    title: str
    tags: list[TagResponse]
    created_at: datetime

    model_config = {"from_attributes": True}
