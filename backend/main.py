from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from scanner import scan_repository
from graph_builder import build_graph

app = FastAPI()


class ScanRequest(BaseModel):
    repo_path: str


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