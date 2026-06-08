import os

from scanner import scan_repository
from parser import extract_dependencies
from metrics import get_file_metrics
EXTENSIONS = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".cpp",
    ".c",
    ".h",
    ".hpp"
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

        full_path = os.path.join(
            repo_path,
            file["path"]
        )

        metrics = get_file_metrics(full_path)

        nodes.append({
            "id": rel_path,
            "data": {
                "label": file["name"],
                "path": rel_path,
                "loc": metrics["loc"],
                "functions": metrics["functions"],
                "imports": metrics["imports"],
                "size": metrics["size"],
                "complexity": metrics["complexity"],
            }
        })

    for file in files:

        source_path = normalize(
            file["path"]
        )

        full_path = os.path.join(
            repo_path,
            file["path"]
        )

        deps = extract_dependencies(
            full_path
        )

        current_dir = os.path.dirname(
            source_path
        )

        for dep in deps:

            found = None

            # JS/TS relative imports
            if dep.startswith("."):

                dep_path = normalize(
                    os.path.normpath(
                        os.path.join(
                            current_dir,
                            dep
                        )
                    )
                )

                if dep_path in path_map:
                    found = dep_path

                if not found:
                    for ext in EXTENSIONS:

                        candidate = (
                            dep_path + ext
                        )

                        if candidate in path_map:
                            found = candidate
                            break

                if not found:
                    for ext in EXTENSIONS:

                        candidate = normalize(
                            os.path.join(
                                dep_path,
                                "index" + ext
                            )
                        )

                        if candidate in path_map:
                            found = candidate
                            break

            # Python imports
            else:

                py_file = (
                    dep.replace(".", "/")
                    + ".py"
                )

                py_init = (
                    dep.replace(".", "/")
                    + "/__init__.py"
                )

                for file_path in path_map:

                    if (
                        file_path.endswith(
                            py_file
                        )
                        or file_path.endswith(
                            py_init
                        )
                    ):
                        found = file_path
                        break
            # C/C++ includes
            if not found:
            
                include_path = normalize(dep)

                for file_path in path_map:

                    if (
                        file_path.endswith(include_path)
                        or file_path.endswith(
                            "/" + include_path
                        )
                    ):
                        found = file_path
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