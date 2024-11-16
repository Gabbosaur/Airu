import httpx
from urllib.parse import quote_plus
from fastapi import APIRouter, FastAPI
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

async def refresh_token():
    while True:
        url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = {
            'grant_type': 'client_credentials',
            'client_id': 'cmp-8542d30e-1cec-4f41-928a-52f4263c555a',
            'client_secret': 'qpVOYrJ6clZEJSngiQNiDAv8KajarBTu'
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, data=data)

            logging.info("Response json: ")
            logging.info(response.json())
            logging.info("Response : ")
            logging.info(response)
        # Wait for 50 minutes before the next refresh
        await asyncio.sleep(55*60)

def start_background_refresh():
    # Run the async function in a background thread using `asyncio.run`
    thread = Thread(target=lambda: asyncio.run(refresh_token()))
    thread.daemon = True
    thread.start()
    
@router.post("/aruba/login")
async def get_token():
    start_background_refresh()
    return {"message": "Token refresh started in background"}

#use('aruba-catalog');
#db.createCollection("catalog_products");

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

class Product(BaseModel):
    name: str
    description: str
    price: float

class ProductInDB(Product):
    id: str


@router.get("/aruba/catalog_products/{product_id}")
async def read_product(product_id: str):
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    product = await collection.find_one({"_id": product_id})
    if product is None:
        return {"error": "Product not found"}
    return product
