import logging
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
import jwt
import datetime
import httpx
from starlette.datastructures import MutableHeaders

aruba_login_url = "https://login.aruba.it/auth/realms/cmp-new-apikey/protocol/openid-connect/token"
aruba_client_id = "cmp-8542d30e-1cec-4f41-928a-52f4263c555a"
aruba_client_secret = "qpVOYrJ6clZEJSngiQNiDAv8KajarBTu"
aruba_token = ""

aruba_base_url = "https://api.arubacloud.com"

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

class ArubaMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, max_age: int = 60) -> None:
        super().__init__(app)
        self.max_age = max_age

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        
        response: Response = Response()
        
        
        if request.url.path.startswith("/api/v1/aruba"):
            # update request headers
            headers = dict(request.scope['headers'])
            
            
            logging.info(f"Intercepted a request to {request.url.path}")
            auth_header = request.headers.get("Authorization")
            logging.info("Bearer :" + auth_header.split(" ")[1])

            try:
                decoded_token = jwt.decode(auth_header.split(" ")[1], options={"verify_signature": False})  # Adjust the algorithm as needed
                expiration_date = datetime.datetime.fromtimestamp(decoded_token["exp"])
                if expiration_date < datetime.datetime.now():
                    token = await get_token()
                    headers['Authorization'] = token
                    request.scope['headers'] = [(k, v) for k, v in headers.items()]
                    logging.info("Token has expired. new one is:")
                    logging.info(token)

                logging.info("Token is valid until:", expiration_date)  
            except jwt.InvalidTokenError:
                logging.error("Invalid token.")
            response: Response = await call_next(request)
            # Modify the response by adding a custom header
            response.headers["X-Custom-Header"] = "This is a custom response header"

        # Process the request and get the response
        # Intercept the request to check for a Bearer token
        else:
            response: Response = await call_next(request)

        return response

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
