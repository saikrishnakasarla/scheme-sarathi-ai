import sys
import os

root_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(root_dir, "backend")

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Change current working directory to backend so database and static files resolve properly
os.chdir(backend_dir)

import uvicorn

if __name__ == "__main__":
    print("🌾 Starting Scheme Sarathi Backend on http://127.0.0.1:8000 ...")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
