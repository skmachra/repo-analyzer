import re

JS_IMPORT = re.compile(
    r'import\s+(?:.*?\s+from\s+)?[\'"](.+?)[\'"]'
)

JS_REQUIRE = re.compile(
    r'require\([\'"](.+?)[\'"]\)'
)

JS_DYNAMIC_IMPORT = re.compile(
    r'import\([\'"](.+?)[\'"]\)'
)

PY_IMPORT = re.compile(
    r'import\s+([a-zA-Z0-9_\.]+)'
)

PY_FROM_IMPORT = re.compile(
    r'from\s+([a-zA-Z0-9_\.]+)\s+import'
)

CPP_INCLUDE = re.compile(
    r'#include\s*[<"]([^>"]+)[>"]'
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

            deps.extend(
                JS_IMPORT.findall(content)
            )

            deps.extend(
                JS_REQUIRE.findall(content)
            )

            deps.extend(
                JS_DYNAMIC_IMPORT.findall(content)
            )

            normalized = []

            for dep in deps:

                # Next.js alias support
                if dep.startswith("@/"):
                    dep = dep[2:]

                normalized.append(dep)

            deps = normalized

        elif ext == "py":

            deps.extend(
                PY_IMPORT.findall(content)
            )

            deps.extend(
                PY_FROM_IMPORT.findall(content)
            )

        elif ext in [
            "cpp",
            "c",
            "h",
            "hpp"
        ]:

            deps.extend(
                CPP_INCLUDE.findall(content)
            )

    except Exception:
        pass

    return list(set(deps))