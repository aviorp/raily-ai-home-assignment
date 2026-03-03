import re
from collections import Counter

import httpx
from bs4 import BeautifulSoup

# Common stop words to filter out when extracting tags
STOP_WORDS = frozenset(
    {
        "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
        "of", "is", "it", "be", "as", "by", "was", "are", "with", "that",
        "this", "from", "not", "have", "has", "had", "will", "can", "do",
        "does", "did", "been", "being", "all", "each", "every", "both",
        "few", "more", "most", "other", "some", "such", "than", "too",
        "very", "just", "about", "above", "after", "also", "any", "back",
        "because", "before", "between", "could", "get", "how", "into",
        "its", "like", "make", "many", "may", "might", "much", "must",
        "new", "no", "now", "only", "our", "out", "over", "own", "say",
        "she", "should", "so", "still", "take", "their", "them", "then",
        "there", "these", "they", "thing", "think", "those", "through",
        "time", "up", "us", "use", "way", "we", "well", "what", "when",
        "which", "who", "would", "you", "your", "one", "two", "even",
        "first", "go", "good", "him", "his", "her", "he", "i", "me", "my",
        "if", "s", "t", "re", "ve", "d", "ll", "m", "don", "here",
    }
)

MIN_WORD_LENGTH = 3
MAX_TAGS = 5


class MetadataService:
    """Fetches a URL and extracts title + content-based tags."""

    async def fetch_metadata(self, url: str) -> tuple[str, list[str]]:
        """Returns (title, tags) for the given URL."""
        try:
            async with httpx.AsyncClient(
                follow_redirects=True, timeout=10.0
            ) as client:
                resp = await client.get(
                    url,
                    headers={
                        "User-Agent": "Mozilla/5.0 (compatible; RailyBot/1.0)"
                    },
                )
                resp.raise_for_status()
        except httpx.HTTPError:
            return self._fallback_title(url), []

        soup = BeautifulSoup(resp.text, "html.parser")
        title = self._extract_title(soup, url)
        tags = self._extract_tags(soup)
        return title, tags

    def _extract_title(self, soup: BeautifulSoup, fallback_url: str) -> str:
        if soup.title and soup.title.string:
            return soup.title.string.strip()

        og_title = soup.find("meta", property="og:title")
        if og_title and og_title.get("content"):
            return str(og_title["content"]).strip()

        return self._fallback_title(fallback_url)

    def _extract_tags(self, soup: BeautifulSoup) -> list[str]:
        # 1. Try meta keywords first
        meta_kw = soup.find("meta", attrs={"name": "keywords"})
        if meta_kw and meta_kw.get("content"):
            keywords = [
                k.strip().lower()
                for k in str(meta_kw["content"]).split(",")
                if k.strip()
            ]
            if len(keywords) >= 3:
                return keywords[:MAX_TAGS]

        # 2. Fall back to TF analysis of heading + paragraph text
        text_parts: list[str] = []
        for tag in soup.find_all(["h1", "h2", "h3", "p"]):
            text_parts.append(tag.get_text(separator=" ", strip=True))

        text = " ".join(text_parts)
        words = re.findall(r"[a-z]{3,}", text.lower())
        filtered = [w for w in words if w not in STOP_WORDS and len(w) >= MIN_WORD_LENGTH]

        if not filtered:
            return []

        counter = Counter(filtered)
        return [word for word, _ in counter.most_common(MAX_TAGS)]

    @staticmethod
    def _fallback_title(url: str) -> str:
        from urllib.parse import urlparse

        parsed = urlparse(url)
        return parsed.netloc or url
