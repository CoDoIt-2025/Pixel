import sys
from pathlib import Path
import uvicorn

# Fix Windows console unicode print
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to sys.path
sys.path.append(str(Path(__file__).resolve().parent))

if __name__ == "__main__":
    print("🚀 Starting Pixel Admin Backend on http://127.0.0.1:8000")
    print("📚 API Documentation: http://127.0.0.1:8000/docs")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
