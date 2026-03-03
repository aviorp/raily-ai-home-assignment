# Smart Bookmark Manager

A full-stack take-home assignment. Users save URLs; the system auto-extracts page titles and generates relevant tags from page content.

---

## Quick Start

**Terminal 1 — Backend**

```bash
cd server
uv sync
uv run uvicorn main:app --reload
# Runs on http://localhost:8000
```

**Terminal 2 — Frontend**

```bash
cd client
pnpm install
pnpm dev
# Runs on http://localhost:5173
```

No `.env` files needed. SQLite database is created automatically on first run.

---

## Tech Stack

| Layer    | Technology                                                            |
| -------- | --------------------------------------------------------------------- |
| Backend  | Python 3.12, FastAPI, SQLAlchemy (async), SQLite + aiosqlite, uvicorn |
| Metadata | httpx, BeautifulSoup4                                                 |
| Frontend | React 19, TypeScript, Vite, TanStack React Query, Axios               |
| UI       | Tailwind CSS, shadcn/ui (Radix), Sonner                               |

---

## Requirements Coverage

**API**

- `POST /bookmarks` — accepts `{ "url": string }`, fetches page title, extracts 3–5 tags via TF analysis, stores and returns the full bookmark with tags
- `GET /bookmarks` — returns all bookmarks with tags, sorted by most recent
- `DELETE /bookmarks/{id}` — deletes a bookmark by ID
- Interactive API docs at `http://localhost:8000/docs`

**UI**

- List of bookmarks with tags displayed as badges
- Input field to add a new bookmark URL
- Delete button per bookmark
- Loading and error states throughout
- Professional UI built with shadcn/ui components

---

## Architecture

**Backend — layered**

```
API Routes → Services → Repositories → SQLAlchemy Models
```

- `MetadataService` handles URL fetching and tag extraction using term-frequency analysis with stop-word filtering
- `BookmarkRepository` owns all database access
- SQLite database is auto-created on startup — no migration step needed

**Frontend — repository pattern**

```
React Components → TanStack Query hooks → API Factory → Repositories → Axios client
```

- All server state is managed by TanStack Query
- Mutations invalidate the query cache on success rather than using optimistic updates, keeping the UI consistent with server state
- `api/factory.ts` wires together repositories; consumers import `api` from `@/api` and call `api.bookmarks.*`

---

## What I'd Add With Another Hour

With more time I'd add pytest coverage for the backend service and repository layers and Vitest tests for the React hooks and components. On the product side: stricter URL validation with user-friendly error messages on the frontend, the ability to edit or remove individual tags, a search/filter bar to query bookmarks by title or tag, and server-side pagination with a cursor for large bookmark collections.
