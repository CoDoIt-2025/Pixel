import os
import uuid
import shutil
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Request

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = Path(__file__).resolve().parents[3] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"}
ALLOWED_VIDEO_EXTS = {".mp4", ".webm", ".ogg", ".mov", ".m4v"}

@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_file(request: Request, file: UploadFile = File(...)):
    filename = file.filename or "upload"
    ext = os.path.splitext(filename)[1].lower()

    is_image = ext in ALLOWED_IMAGE_EXTS or (file.content_type and file.content_type.startswith("image/"))
    is_video = ext in ALLOWED_VIDEO_EXTS or (file.content_type and file.content_type.startswith("video/"))

    if not (is_image or is_video):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type '{ext}'. Please upload an image (PNG, JPG, WebP) or video (MP4, WebM)."
        )

    unique_filename = f"{uuid.uuid4().hex[:12]}_{filename.replace(' ', '_')}"
    file_path = UPLOAD_DIR / unique_filename

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not save file: {str(e)}"
        )

    # Base URL for static file serving
    base_url = str(request.base_url).rstrip("/")
    media_url = f"{base_url}/uploads/{unique_filename}"

    return {
        "url": media_url,
        "filename": unique_filename,
        "mediaType": "video" if is_video else "image",
        "size": file_path.stat().st_size,
    }
