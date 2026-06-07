from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from scanner import scan_repository

app = FastAPI()


class ScanRequest(BaseModel):
    repo_path: str


@app.get("/")
def home():
    return {
        "message": "Repository Analyzer API Running"
    }


@app.post("/scan")
def scan_repo(data: ScanRequest):
    try:
        files = scan_repository(data.repo_path)

        return {
            "total_files": len(files),
            "files": files
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )