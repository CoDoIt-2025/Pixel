import os
import uuid
import shutil
import base64
import json
import urllib.request
import urllib.parse
from typing import Optional
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Request

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = Path(__file__).resolve().parents[3] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"}
ALLOWED_VIDEO_EXTS = {".mp4", ".webm", ".ogg", ".mov", ".m4v"}

IMGBB_API_KEY = os.environ.get("IMGBB_API_KEY", "34b1022bc8d3afbe2dc9875cba76714d")

def upload_to_imgbb(file_bytes: bytes, filename: str) -> Optional[dict]:
    try:
        b64 = base64.b64encode(file_bytes).decode('ascii')
        url = f"https://api.imgbb.com/1/upload?key={IMGBB_API_KEY}"
        data = urllib.parse.urlencode({
            'image': b64,
            'name': filename
        }).encode('utf-8')
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            if result.get("success"):
                return result.get("data")
    except Exception as e:
        print(f"ImgBB upload fallback: {e}")
    return None

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

    file_bytes = await file.read()

    # If it is an image, upload to ImgBB CDN for fast global hosting
    if is_image:
        imgbb_data = upload_to_imgbb(file_bytes, filename)
        if imgbb_data and imgbb_data.get("url"):
            return {
                "url": imgbb_data["url"],
                "displayUrl": imgbb_data.get("display_url", imgbb_data["url"]),
                "thumbUrl": imgbb_data.get("thumb", {}).get("url") if isinstance(imgbb_data.get("thumb"), dict) else None,
                "filename": imgbb_data.get("image", {}).get("filename", filename) if isinstance(imgbb_data.get("image"), dict) else filename,
                "mediaType": "image",
                "size": len(file_bytes),
                "provider": "imgbb",
            }

    # Fallback to local storage (or for video files)
    unique_filename = f"{uuid.uuid4().hex[:12]}_{filename.replace(' ', '_')}"
    file_path = UPLOAD_DIR / unique_filename

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not save file: {str(e)}"
        )

    base_url = str(request.base_url).rstrip("/")
    media_url = f"{base_url}/uploads/{unique_filename}"

    return {
        "url": media_url,
        "filename": unique_filename,
        "mediaType": "video" if is_video else "image",
        "size": file_path.stat().st_size,
        "provider": "local",
    }
