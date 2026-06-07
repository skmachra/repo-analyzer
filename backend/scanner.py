import os

IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    "venv",
    "__pycache__"
}


def scan_repository(repo_path):
    files = []

    for root, dirs, filenames in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file in filenames:
            full_path = os.path.join(root, file)

            relative_path = os.path.relpath(
                full_path,
                repo_path
            )

            files.append({
                "name": file,
                "path": relative_path.replace("\\", "/")
            })

    return files