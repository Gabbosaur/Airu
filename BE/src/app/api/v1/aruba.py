from urllib.parse import quote_plus
from fastapi import APIRouter, Request
from motor.motor_asyncio import AsyncIOMotorClient
import logging
import json
import random
import string
import asyncio
import requests

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

    response = requests.request("POST", url, headers, data)
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

    response = requests.request("GET", url, headers=headers, params=params)
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
    response = requests.request("POST", url, headers=headers, json=body)
    return response.json()
    
@router.get("/aruba/projects/{projectId}")
async def get_project(request: Request, projectId: str):
    logging.info("Getting project")
    url = f"{aruba_base_url}/projects/{projectId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    
    params = request.query_params
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()

@router.get("/aruba/projects/{projectId}/resources")
async def get_project_resources(request: Request, projectId: str):
    logging.info("Getting project resources")
    url = f"{aruba_base_url}/projects/{projectId}/resources"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params
    response = requests.request("GET", url, headers=headers, params=params)
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

    response = requests.request("PUT", url, headers=headers, json=body)
    return response.json()


@router.delete("/aruba/projects/{projectId}")
async def delete_project(request: Request, projectId: str):
    logging.info("Deleting project")
    url = f"{aruba_base_url}/projects/{projectId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("DELETE", url, headers=headers)
    return response.json()


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
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()
    
@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}")
async def get_vpc(request: Request, projectIdCreated: str, vpcId: str):
    logging.info("Getting vpc")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("GET", url, headers=headers)
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
    response = requests.request("POST", url, headers=headers, json=body)
    return response.json()

@router.put("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}")
async def update_vpc(request: Request, projectIdCreated: str, vpcId: str):
    body = await request.json()
    logging.info("Updating vpc")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("PUT", url, headers=headers, json=body)
    return response.json()

@router.delete("/aruba/providers/projects/{projectIdCreated}/Aruba.Network/vpcs/{vpcId}")
async def delete_vpc(request: Request, projectIdCreated: str, vpcId: str):
    logging.info("Deleting vpc")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("DELETE", url, headers=headers)
    return response.json()


#
# Subnet
#

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets")
async def get_subnets(request: Request, projectIdCreated: str, vpcIdCreated: str):
    logging.info("Getting subnets")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params

    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()

@router.post("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets")
async def create_subnet(request: Request, projectIdCreated: str, vpcIdCreated: str):
    body = await request.json()
    logging.info("Creating subnet")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, json=body)
    return response.json()


@router.put("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets/{subnetId}")
async def update_subnet(request: Request, projectIdCreated: str, vpcIdCreated: str, subnetId: str):
    body = await request.json()
    logging.info("Updating subnet")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets/{subnetId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("PUT", url, headers=headers, json=body)
    return response.json()

@router.delete("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/subnets/{subnetId}")
async def delete_subnet(request: Request, projectIdCreated: str, vpcIdCreated: str, subnetId: str):
    logging.info("Deleting subnet")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/Aruba.Network/vpcs/{vpcIdCreated}/subnets/{subnetId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    
    response = requests.request("DELETE", url, headers=headers)
    return response.json()
    
#
# SecurityGroup
#    
@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups")
async def get_security_groups(request: Request, projectIdCreated: str, vpcIdCreated: str):
    logging.info("Getting security groups")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params
    
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups/{securityGroupId}")
async def get_security_group(request: Request, projectIdCreated: str, vpcIdCreated: str, securityGroupId: str):
    logging.info("Getting security group")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups/{securityGroupId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("GET", url, headers=headers)
    return response.json()


@router.post("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups")
async def create_security_group(request: Request, projectIdCreated: str, vpcIdCreated: str):
    body = await request.json()
    logging.info("Creating security group")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, json=body)
    return response.json()
    
@router.put("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups/{securityGroupId}")
async def update_security_group(request: Request, projectIdCreated: str, vpcIdCreated: str, securityGroupId: str):
    body = await request.json()
    logging.info("Updating security group")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups/{securityGroupId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("PUT", url, headers=headers, json=body)
    return response.json()

@router.delete("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups/{securityGroupId}")
async def delete_security_group(request: Request, projectIdCreated: str, vpcIdCreated: str, securityGroupId: str):
    logging.info("Deleting security group")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/vpcs/{vpcIdCreated}/securityGroups/{securityGroupId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("DELETE", url, headers=headers)
    return response.json()


#
# ElasticIp
#

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps")
async def get_elastic_ips(request: Request, projectIdCreated: str):
    logging.info("Getting elastic ips")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()
    
@router.post("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps")
async def create_elastic_ip(request: Request, projectIdCreated: str):
    body = await request.json()
    logging.info("Creating elastic ip")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, json=body)
    return response.json()

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps/{elasticIpId}")
async def get_elastic_ip(request: Request, projectIdCreated: str, elasticIpId: str):
    logging.info("Getting elastic ip")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps/{elasticIpId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("GET", url, headers=headers)
    return response.json()

@router.put("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps/{elasticIpId}")
async def update_elastic_ip(request: Request, projectIdCreated: str, elasticIpId: str):
    body = await request.json()
    logging.info("Updating elastic ip")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps/{elasticIpId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("PUT", url, headers=headers, json=body)
    return response.json()

@router.delete("/aruba/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps/{elasticIpId}")
async def delete_elastic_ip(request: Request, projectIdCreated: str, elasticIpId: str):
    logging.info("Deleting elastic ip")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Network/elasticIps/{elasticIpId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("DELETE", url, headers=headers)
    return response.json()


#
# 03-Container
#
@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Container/kaas")
async def get_containers(request: Request, projectIdCreated: str):
    logging.info("Getting containers")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Container/kaas"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params
    
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()
    
@router.post("/aruba/projects/{projectIdCreated}/providers/Aruba.Container/kaas")
async def create_container(request: Request, projectIdCreated: str):
    body = await request.json()
    logging.info("Creating container")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Container/kaas"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, json=body)
    return response.json()

@router.put("/aruba/projects/{projectIdCreated}/providers/Aruba.Container/kaas/{containerId}")
async def update_container(request: Request, projectIdCreated: str, containerId: str):
    body = await request.json()
    logging.info("Updating container")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Container/kaas/{containerId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("PUT", url, headers=headers, json=body)
    return response.json()

#
# 04-Compute
#
@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Compute/cloudServers")
async def get_cloud_servers(request: Request, projectIdCreated: str):
    logging.info("Getting cloud servers")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Compute/cloudServers"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()

@router.post("/aruba/projects/{projectIdCreated}/providers/Aruba.Compute/cloudServers")
async def create_cloud_server(request: Request, projectIdCreated: str):
    body = await request.json()
    logging.info("Creating cloud server")
    logging.info(body)
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Compute/cloudServers"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    params = request.query_params
    response = requests.request("GET", url, headers=headers, params=params)
    return response.json()

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Compute/cloudServers/{cloudServerId}")
async def get_cloud_server(request: Request, projectIdCreated: str, cloudServerId: str):
    logging.info("Getting cloud server")
    url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Compute/cloudServers/{cloudServerId}"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("GET", url, headers=headers)
    return response.json()

#
# 05-Storage
#

@router.get("/aruba/projects/{projectIdCreated}/providers/Aruba.Storage/blockStorages")
async def get_block_storages(request: Request, projectIdCreated: str):
     logging.info("Getting block storages")
     url = f"{aruba_base_url}/projects/{projectIdCreated}/providers/Aruba.Storage/blockStorages"
     headers = {
         'Authorization': dict(request.scope['headers'])['Authorization'],
         'Content-Type': 'application/json'
        }
     params = request.query_params
     response = requests.request("GET", url, headers=headers, params=params)
         
    
    
#
# 06-Frontend
#
@router.post("/aruba/airu/create/kaas")
async def create_kaas(request: Request):

    logging.info("Creating Project")
    logging.info(request)
    body = await request.json()
    complete_project_body = {
        "metadata": {
          "name": body["name"],
          "tags": [
            "string"
          ]
        },
        "properties": {
          "description": body["description"],
          "default": False
        }
    }
    logging.info("Body")
    logging.info(type(body))
    
    url = f"{aruba_base_url}/projects"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, json=complete_project_body)
    project_result = response.json()
    logging.info("Project created")
    logging.info(project_result)
    
    # 2 Creare un suo VPC
    complete_vpc_body = {
       "metadata":{
          "name": generate_random_name(), #generate random name of id for the vpc
          "tags":[
             "tag-1",
             "tag-2"
          ],
          "location": {
            "value": "ITBG-Bergamo"
           }
       }
    }
        
    url = f"{aruba_base_url}/projects/{project_result['metadata']['id']}/providers/Aruba.Network/vpcs"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, json=complete_vpc_body)
    vpc_result = response.json()
    
    logging.info("VPC created")
    logging.info(vpc_result)
    
    
    # 3 Creare un suo Subnet
    complete_subnet_body = {
        "metadata":{
           "name":generate_random_name(),
           "tags":[
              "tag-1",
              "tag-2"
           ]
        },
        "properties":{
           "type":"Advanced",
           "default":True,
           "network":{
              "address":"192.168.1.0/24"
           },
           "dhcp":{
              "enabled":True         
           }
        }
    }
        
    url = f"{aruba_base_url}/projects/{project_result['metadata']['id']}/providers/Aruba.Network/vpcs/{vpc_result['metadata']['id']}/subnets"
    headers = {
        'Authorization': dict(request.scope['headers'])['Authorization'],
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, json=complete_subnet_body)
    complete_subnet_body = response.json()
    
    logging.info("Subnet created")
    logging.info(complete_subnet_body)
    
    return {"project": project_result, "vpc": vpc_result, "subnet": complete_subnet_body}
     

def generate_random_name(length=7):
    letters_and_digits = string.ascii_lowercase + string.digits
    return ''.join(random.choice(letters_and_digits) for i in range(length))