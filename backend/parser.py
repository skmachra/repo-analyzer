import re

JS_IMPORT = re.compile(
    r'import\s+(?:.*?\s+from\s+)?[\'"](.+?)[\'"]'
)

JS_REQUIRE = re.compile(
    r'require\([\'"](.+?)[\'"]\)'
)

PY_IMPORT = re.compile(
    r'import\s+([a-zA-Z0-9_\.]+)'
)

PY_FROM_IMPORT = re.compile(
    r'from\s+([a-zA-Z0-9_\.]+)\s+import'
)


def extract_dependencies(file_path):
    deps = []

    try:
        with open(
            file_path,
            "r",
            encoding="utf-8",
            errors="ignore"
        ) as f:
            content = f.read()

        ext = file_path.split(".")[-1]

        if ext in ["js", "jsx", "ts", "tsx"]:
            deps.extend(JS_IMPORT.findall(content))
            deps.extend(JS_REQUIRE.findall(content))

        elif ext == "py":
            deps.extend(PY_IMPORT.findall(content))
            deps.extend(PY_FROM_IMPORT.findall(content))

    except Exception:
        pass

    return deps