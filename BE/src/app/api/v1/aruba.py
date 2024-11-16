import httpx
from urllib.parse import quote_plus
from fastapi import APIRouter, FastAPI, Request
from threading import Thread
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import logging
from contextlib import asynccontextmanager
from pydantic import BaseModel
from bson import ObjectId
from typing import List

app = FastAPI()
router = APIRouter(tags=["aruba"])
aruba_login_url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"
aruba_client_id = "cmp-8542d30e-1cec-4f41-928a-52f4263c555a"
aruba_client_secret = "qpVOYrJ6clZEJSngiQNiDAv8KajarBTu"
aruba_token = ""

aruba_base_url = "https://api.arubacloud.com"

    
@router.post("/aruba/login")
async def get_token():
    url = aruba_login_url
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
            'grant_type': 'client_credentials',
            'client_id': aruba_client_id,
            'client_secret': aruba_client_secret
        }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, data=data)
    return response.json()


#Catalog products
#
#

@router.get("/aruba/catalog_products")
async def get_catalog_products():
    #todo get from env
    encoded_username = quote_plus("mongoadmin")
    encoded_password = quote_plus("bMMZ9yGEgHgmT@2Dv6")
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    products = await collection.find().to_list()
    return products

@router.get("/aruba/catalog_products/{product_id}")
async def read_product(product_id: str):
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    product = await collection.find_one({"_id": product_id})
    if product is None:
        return {"error": "Product not found"}
    return product


# Projects
#
#
@router.get("/aruba/projects")
async def get_projects(request: Request):
    url = f"{aruba_base_url}/projects"
    headers = {
        'Authorization': f'Bearer {aruba_token}',
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            return {"error": "Failed to fetch projects"}
        return response.json()