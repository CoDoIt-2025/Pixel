import sys
from pathlib import Path
import uvicorn

# Fix Windows console unicode print
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to sys.path
sys.path.append(str(Path(__file__).resolve().parent))

import os

if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Starting Pixel Admin Backend on http://{host}:{port}")
    print(f"📚 API Documentation: http://{host}:{port}/docs")
    uvicorn.run("app.main:app", host=host, port=port, reload=False)
