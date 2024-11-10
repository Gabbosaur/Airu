from fastapi import FastAPI
from app.api.router import api_router
from app.core.config import settings
from app.middlewares.logging_middleware import LoggingMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Production-ready FastAPI application",
    version=settings.VERSION,
)

# Register middlewares
app.add_middleware(LoggingMiddleware)

# Include routers
app.include_router(api_router)

# Run app (if not using a separate ASGI server)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
