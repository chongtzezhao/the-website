from fastapi import FastAPI

# Import the routers
from api.router.auth import router as auth_router

# Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# Attach the routers to the app
app.include_router(auth_router)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)