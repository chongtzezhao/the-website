from fastapi import FastAPI

# Import the routers
from api.router.auth import router as auth_router
from api.router.tutor import router as tutor_router

from api.storage.storage_service import StorageService

# Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# Attach the routers to the app
app.include_router(auth_router)
app.include_router(tutor_router)

@app.get("/api/")

StorageService.init_db()

if __name__ == "__main__":
  print(StorageService.get_tutor_summaries())
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)