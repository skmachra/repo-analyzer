from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from scanner import scan_repository
from graph_builder import build_graph
import os
from metrics import get_file_metrics

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ScanRequest(BaseModel):
    repo_path: str

class FileRequest(BaseModel):
    repo_path: str
    file_path: str

@app.post("/scan")
def scan_repo(data: ScanRequest):
    files = scan_repository(data.repo_path)

    return {
        "total_files": len(files),
        "files": files
    }


@app.post("/graph")
def graph(data: ScanRequest):
    try:
        return build_graph(data.repo_path)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.post("/file")
def get_file(data: FileRequest):

    full_path = os.path.join(
        data.repo_path,
        data.file_path
    )

    if not os.path.exists(full_path):
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    with open(
        full_path,
        "r",
        encoding="utf-8",
        errors="ignore"
    ) as f:
        lines = f.readlines()

    preview = "".join(lines[:50])

    return {
        "name": os.path.basename(full_path),
        "path": data.file_path,
        "preview": preview
    }