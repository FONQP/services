from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from services.backend.app.core.config import settings
from services.backend.app.api.routes import router as api_router

app = FastAPI(title=settings.PROJECT_NAME)

# Mount API
app.include_router(api_router, prefix="/api")

if settings.FRONTEND_DIST.exists():
    # Serve all static files (including assets, logos, favicons)
    app.mount(
        "/static",
        StaticFiles(directory=settings.FRONTEND_DIST),
        name="static",
    )

    index_file = settings.FRONTEND_DIST / "index.html"

    # SPA fallback for everything except API and static files
    @app.get("/{full_path:path}")
    async def spa_fallback(full_path: str):
        if (settings.FRONTEND_DIST / full_path).exists():
            return FileResponse(settings.FRONTEND_DIST / full_path)
        return FileResponse(index_file)

else:
    print(f"⚠️ Frontend build folder not found at {settings.FRONTEND_DIST}. Run `npm run build` in frontend/")
