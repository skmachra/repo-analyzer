import json
import hashlib
import os

CACHE_FILE = "cache_data/summaries.json"

def get_file_hash(content):
    return hashlib.sha256(
        content.encode("utf-8")
    ).hexdigest()


def load_cache():

    if not os.path.exists(CACHE_FILE):
        return {}

    with open(
        CACHE_FILE,
        "r",
        encoding="utf-8"
    ) as f:
        return json.load(f)


def save_cache(cache):

    with open(
        CACHE_FILE,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            cache,
            f,
            indent=2
        )


def get_cached_summary(file_hash):

    cache = load_cache()

    return cache.get(file_hash)


def save_summary(
    file_hash,
    summary
):

    cache = load_cache()

    cache[file_hash] = {
        "summary": summary
    }

    save_cache(cache)

def clear_cache():

    save_cache({})