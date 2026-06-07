import os

from scanner import scan_repository
from parser import extract_dependencies

EXTENSIONS = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py"
]


def normalize(path):
    return path.replace("\\", "/")


def build_graph(repo_path):
    files = scan_repository(repo_path)

    nodes = []
    edges = []

    path_map = {}

    for file in files:
        rel_path = normalize(file["path"])

        path_map[rel_path] = rel_path

        nodes.append({
            "id": rel_path,
            "label": file["name"]
        })

    for file in files:
        source_path = normalize(file["path"])

        full_path = os.path.join(
            repo_path,
            file["path"]
        )

        deps = extract_dependencies(full_path)

        current_dir = os.path.dirname(source_path)

        for dep in deps:

            if not dep.startswith("."):
                continue

            dep_path = normalize(
                os.path.normpath(
                    os.path.join(current_dir, dep)
                )
            )

            found = None

            if dep_path in path_map:
                found = dep_path

            if not found:
                for ext in EXTENSIONS:
                    candidate = dep_path + ext

                    if candidate in path_map:
                        found = candidate
                        break

            if not found:
                for ext in EXTENSIONS:
                    candidate = normalize(
                        os.path.join(dep_path, "index" + ext)
                    )

                    if candidate in path_map:
                        found = candidate
                        break

            if found:
                edges.append({
                    "source": source_path,
                    "target": found
                })

    return {
        "nodes": nodes,
        "edges": edges
    }