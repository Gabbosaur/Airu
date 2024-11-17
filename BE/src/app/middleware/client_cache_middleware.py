import logging
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
import jwt
import datetime
import httpx
from starlette.datastructures import MutableHeaders
import requests



class ArubaMiddleware(BaseHTTPMiddleware):
    aruba_login_url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"
    aruba_client_id = "cmp-8542d30e-1cec-4f41-928a-52f4263c555a"
    aruba_client_secret = "qpVOYrJ6clZEJSngiQNiDAv8KajarBTu"
    aruba_token = ""

    aruba_base_url = "https://api.arubacloud.com"

    async def get_token(self):
        # TODO fix code
        # url = self.aruba_login_url
        # headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        # data = {
        #     'grant_type': 'client_credentials',
        #     'client_id': self.aruba_client_id,
        #     'client_secret': self.aruba_client_secret
        # }
        # logging.info(f"Getting token " + data["grant_type"] + " " + data["client_id"] + " " + data["client_secret"])

        # async with httpx.AsyncClient() as client:
        #     response = await client.post(url, headers=headers, data=data)

        # logging.info(f"response token: {response.json()}")


        url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"

        payload = 'grant_type=client_credentials&client_id=cmp-8542d30e-1cec-4f41-928a-52f4263c555a&client_secret=qpVOYrJ6clZEJSngiQNiDAv8KajarBTu'
        headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'COMMON_BACKEND=gob-comb6'
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        print(response.text)


        return response.json()

    def __init__(self, app: FastAPI, max_age: int = 60) -> None:
        super().__init__(app)
        self.max_age = max_age

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        
        current_aruba_token = self.aruba_token
        
        if request.url.path.startswith("/api/v1/aruba"):
            # update request headers
            #current aruba_token we neew to check if it is expired or is null
            if current_aruba_token == "" :
                logging.info(f"Token is empty ")
                current_aruba_token = await self.get_token()
                self.aruba_token = current_aruba_token['access_token']
            elif datetime.datetime.fromtimestamp(jwt.decode(current_aruba_token, options={"verify_signature": False})["exp"]) < datetime.datetime.now():
                logging.info(f"Token is expired ")
                current_aruba_token = await self.get_token()
                self.aruba_token = current_aruba_token['access_token']
            else:
                logging.info(f"Current token is valid ")
            
            headers = dict(request.scope['headers'])
            headers['Authorization'] = f'Bearer {self.aruba_token}'
            request.scope['headers'] = [(k, v) for k, v in headers.items()]
            
        return await call_next(request)

class ClientCacheMiddleware(BaseHTTPMiddleware):
    """Middleware to set the `Cache-Control` header for client-side caching on all responses.

    Parameters
    ----------
    app: FastAPI
        The FastAPI application instance.
    max_age: int, optional
        Duration (in seconds) for which the response should be cached. Defaults to 60 seconds.

    Attributes
    ----------
    max_age: int
        Duration (in seconds) for which the response should be cached.

    Methods
    -------
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        Process the request and set the `Cache-Control` header in the response.

    Note
    ----
        - The `Cache-Control` header instructs clients (e.g., browsers)
        to cache the response for the specified duration.
    """

    def __init__(self, app: FastAPI, max_age: int = 60) -> None:
        super().__init__(app)
        self.max_age = max_age

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        """Process the request and set the `Cache-Control` header in the response.

        Parameters
        ----------
        request: Request
            The incoming request.
        call_next: RequestResponseEndpoint
            The next middleware or route handler in the processing chain.

        Returns
        -------
        Response
            The response object with the `Cache-Control` header set.

        Note
        ----
            - This method is automatically called by Starlette for processing the request-response cycle.
        """
        response: Response = await call_next(request)
        response.headers["Cache-Control"] = f"public, max-age={self.max_age}"
        return response
