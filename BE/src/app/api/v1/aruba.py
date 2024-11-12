import httpx
from typing import Annotated, Any

from urllib.parse import quote_plus

from fastapi import APIRouter, Depends, Request
from fastcrud.paginated import PaginatedListResponse, compute_offset, paginated_response
from sqlalchemy.ext.asyncio import AsyncSession

from ...api.dependencies import get_current_superuser, get_current_user
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import DuplicateValueException, ForbiddenException, NotFoundException
from ...core.security import blacklist_token, get_password_hash, oauth2_scheme
from ...crud.crud_rate_limit import crud_rate_limits
from ...crud.crud_tier import crud_tiers
from ...crud.crud_users import crud_users
from ...models.tier import Tier
from ...schemas.tier import TierRead
from ...schemas.user import UserCreate, UserCreateInternal, UserRead, UserTierUpdate, UserUpdate
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(tags=["aruba"])

@router.post("/aruba/login")
async def get_token():
    url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        'grant_type': 'client_credentials',
        'client_id': 'cmp-8542d30e-1cec-4f41-928a-52f4263c555a',
        'client_secret': 'qpVOYrJ6clZEJSngiQNiDAv8KajarBTu'
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, data=data)
        return response.json()

#use('aruba-catalog');
#db.createCollection("catalog_products");

@router.get("/aruba/catalog_products")
async def get_catalog_products():
    encoded_username = quote_plus("mongoadmin")
    encoded_password = quote_plus("bMMZ9yGEgHgmT@2Dv6")
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    products = await collection.find().to_list()
    return products
