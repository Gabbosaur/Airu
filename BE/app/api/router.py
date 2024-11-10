from fastapi import APIRouter
from app.api.v1.endpoints import user_endpoint

api_router = APIRouter()
api_router.include_router(user_endpoint.router, prefix="/users", tags=["Users"])
