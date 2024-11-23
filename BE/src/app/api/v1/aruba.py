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

router = APIRouter(tags=["aruba"])

aruba_login_url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"
aruba_client_id = "cmp-8542d30e-1cec-4f41-928a-52f4263c555a"
aruba_client_secret = "qpVOYrJ6clZEJSngiQNiDAv8KajarBTu"
aruba_token = ""
aruba_base_url = "https://api.arubacloud.com"

#
# 00-Authentication
#
    
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


#
# Catalog products
#

@router.get("/aruba/catalog_products")
async def get_catalog_products(request: Request):
    logging.info("Getting catalog products")
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    products = await collection.find().to_list()
    return products

@router.get("/aruba/catalog_products/getById/{product_id}")
async def read_product(product_id: str):
    logging.info("Getting catalog products by id")
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    product = await collection.find_one({"_id": product_id})
    if product is None:
        return {"error": "Product not found"}
    return product

@router.get("/aruba/catalog_products/filter")
async def filter_catalog_products(request: Request, name: str = None, category: str = None, price_min: float = None, price_max: float = None):
    logging.info("Filtering catalog products")
    client = AsyncIOMotorClient("mongodb://mongoadmin:"+quote_plus("bMMZ9yGEgHgmT@2Dv6")+"@mongo:27017")
    db = client["aruba-catalog"]
    collection = db["catalog_products"]
    
    """
    Groups resources by the 'resourceCategory' field and returns the result.
    """
    try:
        # MongoDB aggregation pipeline
        pipeline = [
            {
                "$group": {
                    "_id": "$resourceCategory",  # Group by resourceCategory
                    "resources": {"$push": "$$ROOT"},  # Include all documents in the group
                    "count": {"$sum": 1}  # Count documents in each group
                }
            }
        ]

        # Execute the aggregation pipeline
        cursor = collection.aggregate(pipeline)
        results = await cursor.to_list(length=None)

        return {"grouped_data": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

#

#
# 01-Projects
#

@router.get("/aruba/projects")
async def get_projects(request: Request):
    logging.info("Getting projects")
    url = f"{aruba_base_url}/projects"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        if response.status_code != 200:
            return {"error": "Failed to fetch projects"}
        return response.json()
    
@router.post("/aruba/projects")
async def create_project(request: Request):
    body = await request.json()
    logging.info("Creating project")
    logging.info(body)
    url = f"{aruba_base_url}/projects"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=body)
        if response.status_code != 201:
            return {"error": "Failed to create project"}
        return response.json()

@router.get("/aruba/projects/{projectId}")
async def get_project(request: Request, projectId: str):
    logging.info("Getting project")
    url = f"{aruba_base_url}/projects/{projectId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            return {"error": "Failed to fetch project"}
        return response.json()    

@router.get("/aruba/projects/{projectId}/resources")
async def get_project_resources(request: Request, projectId: str):
    logging.info("Getting project resources")
    url = f"{aruba_base_url}/projects/{projectId}/resources"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            return {"error": "Failed to fetch project resources"}
        return response.json()

@router.put("/aruba/projects/{projectId}")
async def update_project(request: Request, projectId: str):
    body = await request.json()
    logging.info("Updating project")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.put(url, headers=headers, json=body)
        if response.status_code != 200:
            return {"error": "Failed to update project"}
        return response.json()

@router.delete("/aruba/projects/{projectId}")
async def delete_project(request: Request, projectId: str):
    logging.info("Deleting project")
    url = f"{aruba_base_url}/projects/{projectId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.delete(url, headers=headers)
        if response.status_code != 204:
            return {"error": "Failed to delete project"}
        return {"message": "Project deleted successfully"}

#
# 02-Network
#

#
# Vpc
#

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs")
async def get_vpcs(request: Request, projectIdCreated: str):
    logging.info("Getting vpcs")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        if response.status_code != 200:
            return {"error": "Failed to fetch vpcs"}
        return response.json()
    
@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}")
async def get_vpc(request: Request, projectIdCreated: str, vpcId: str):
    logging.info("Getting vpc")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            return {"error": "Failed to fetch vpc"}
        return response.json()

@router.post("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs")
async def create_vpc(request: Request, projectIdCreated: str):
    body = await request.json()
    logging.info("Creating vpc")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=body)
        if response.status_code != 201:
            return {"error": "Failed to create vpc"}
        return response.json()

#
# 04-Storage
#

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Storage/blockStorages")
async def get_block_storages(request: Request, projectIdCreated: str):
    logging.info("Getting block storages")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Storage/blockStorages"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            return {"error": "Failed to fetch projects"}
        return response.json()