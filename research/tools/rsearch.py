"""Bounded Reddit (Arctic Shift archive) + Hacker News (Algolia) search for research agents.

Every call has a hard timeout and a result cap so an agent can never hang on it.

Usage:
  python -I rsearch.py reddit-posts    <subreddit> "<query>" [limit=25] [after=2024-06-01]
  python -I rsearch.py reddit-comments <subreddit> "<query>" [limit=25] [after=2024-06-01]
  python -I rsearch.py hn              "<query>" [story|comment] [limit=20] [after=2024-06-01]

Output: one compact line per hit, highest score first: score | title/excerpt (<=300 chars) | url
"""
import json
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone

TIMEOUT_S = 20
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
UA = "contextops-research/0.2 (student startup research)"


def fetch(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(2):
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT_S) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except Exception as e:  # noqa: BLE001 - research tool, report and move on
            if attempt == 1:
                print(f"# ERROR fetching ({e.__class__.__name__}): {e}")
                return None
            time.sleep(2)


def clean(s: str, n: int = 300) -> str:
    return " ".join((s or "").split())[:n]


def reddit(kind: str, sub: str, query: str, limit: int, after: str):
    base = "https://arctic-shift.photon-reddit.com/api/"
    time.sleep(1.5)  # the archive asks clients to slow down
    if kind == "posts":
        attempts = [{"query": query, "limit": 100, "sort": "desc"}, {"title": query, "limit": 100, "sort": "desc"}]
        endpoint = "posts/search?"
    else:
        attempts = [{"body": query, "limit": 100, "sort": "desc"}]
        endpoint = "comments/search?"
    rows = None
    for extra in attempts:
        data = fetch(base + endpoint + urllib.parse.urlencode({"subreddit": sub, **extra}))
        if data and data.get("data") is not None:
            rows = data["data"]
            break
        time.sleep(2)
    if rows is None:
        print(f"# no result (archive timeout) r/{sub} '{query}' - try a shorter query or another subreddit")
        return
    cutoff = int(datetime.strptime(after, "%Y-%m-%d").replace(tzinfo=timezone.utc).timestamp())
    rows = [r for r in rows if (r.get("created_utc") or 0) >= cutoff]
    rows.sort(key=lambda r: r.get("score") or 0, reverse=True)
    print(f"# {len(rows)} hits (showing top {min(limit, len(rows))}) r/{sub} '{query}' {kind}")
    for r in rows[:limit]:
        if kind == "posts":
            text = clean(r.get("title", "")) + " :: " + clean(r.get("selftext", ""), 220)
            link = "https://reddit.com" + (r.get("permalink") or f"/r/{sub}/comments/{r.get('id')}")
            extra = f"{r.get('num_comments', 0)}c"
        else:
            text = clean(r.get("body", ""))
            lid = (r.get("link_id") or "").replace("t3_", "")
            link = f"https://reddit.com/r/{sub}/comments/{lid}/_/{r.get('id')}"
            extra = ""
        print(f"{r.get('score', 0)}{('/' + extra) if extra else ''} | {text} | {link}")


def hn(query: str, tag: str, limit: int, after: str):
    ts = int(datetime.strptime(after, "%Y-%m-%d").replace(tzinfo=timezone.utc).timestamp())
    params = {"query": query, "tags": tag, "numericFilters": f"created_at_i>{ts}", "hitsPerPage": 50}
    data = fetch("https://hn.algolia.com/api/v1/search?" + urllib.parse.urlencode(params))
    if not data:
        return
    hits = data.get("hits") or []  # keep Algolia relevance order
    print(f"# {data.get('nbHits')} total hits (showing top {min(limit, len(hits))}) HN {tag} '{query}'")
    for h in hits[:limit]:
        text = clean(h.get("title") or h.get("story_title") or "", 120)
        body = clean(h.get("comment_text") or h.get("story_text") or "", 220)
        print(f"{h.get('points') or 0}/{h.get('num_comments') or 0}c | {text} :: {body} | https://news.ycombinator.com/item?id={h.get('objectID')}")


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return
    cmd = argv[1]
    if cmd in ("reddit-posts", "reddit-comments"):
        sub, query = argv[2], argv[3]
        limit = int(argv[4]) if len(argv) > 4 else 25
        after = argv[5] if len(argv) > 5 else "2024-06-01"
        reddit("posts" if cmd == "reddit-posts" else "comments", sub, query, limit, after)
    elif cmd == "hn":
        query = argv[2]
        tag = argv[3] if len(argv) > 3 else "story"
        limit = int(argv[4]) if len(argv) > 4 else 20
        after = argv[5] if len(argv) > 5 else "2024-06-01"
        hn(query, tag, limit, after)
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv)
