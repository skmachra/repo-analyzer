import os
import re

COMPLEXITY_KEYWORDS = [
    "if ",
    "elif ",
    "else:",
    "for ",
    "while ",
    "try:",
    "except",
    "match ",
    "case ",
]
JS_FUNCTIONS = re.compile(
    r'function\s+\w+\s*\(|=>\s*{|const\s+\w+\s*=\s*\('
)

PY_FUNCTIONS = re.compile(
    r'def\s+\w+\s*\('
)

JS_IMPORTS = re.compile(
    r'import\s+|require\s*\('
)

PY_IMPORTS = re.compile(
    r'import\s+|from\s+.*?\s+import'
)
CPP_FUNCTIONS = re.compile(
    r'\w+\s+\w+\s*\([^;]*\)\s*\{'
)
CPP_INCLUDE = re.compile(
    r'#include\s*[<"]([^>"]+)[>"]'
)

def get_file_metrics(file_path):
    try:
        with open(
            file_path,
            "r",
            encoding="utf-8",
            errors="ignore"
        ) as f:
            content = f.read()

        lines = content.splitlines()

        loc = len([
            line for line in lines
            if line.strip()
        ])
        complexity = 0

        for keyword in COMPLEXITY_KEYWORDS:
            complexity += content.count(keyword)
        ext = file_path.split(".")[-1]
    
        functions = 0
        imports = 0

        if ext in ["js", "jsx", "ts", "tsx"]:
            functions = len(
                JS_FUNCTIONS.findall(content)
            )

            imports = len(
                JS_IMPORTS.findall(content)
            )
        elif ext in ["cpp", "c", "h", "hpp"]:
            functions = len(
                CPP_FUNCTIONS.findall(content)
            )
            imports = len(
                CPP_INCLUDE.findall(content)
            )

        elif ext == "py":
            functions = len(
                PY_FUNCTIONS.findall(content)
            )

            imports = len(
                PY_IMPORTS.findall(content)
            )

        size = os.path.getsize(file_path)

        return {
            "loc": loc,
            "functions": functions,
            "imports": imports,
            "size": size,
            "complexity": complexity
        }

    except Exception:
        return {
            "loc": 0,
            "functions": 0,
            "imports": 0,
            "size": 0,
            "complexity": 0
        }