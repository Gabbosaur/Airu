import logging
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
import jwt
import datetime

class ArubaMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, max_age: int = 60) -> None:
        super().__init__(app)
        self.max_age = max_age

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        #if request.url.path.startswith("/api/v1/aruba"):
        #    logging.info(f"Intercepted a request to {request.url.path}")
        #    auth_header = request.headers.get("Authorization")
    #
        #    logging.info("Bearer :" + auth_header.split(" ")[1])
        #    
        #    try:
        #        decoded_token = jwt.decode(auth_header.split(" ")[1], options={"verify_signature": False})  # Adjust the algorithm as needed
        #        
        #        print("Token is valid:", decoded_token["exp"])
        #        datetime.datetime.utcfromtimestamp()
        #    except jwt.ExpiredSignatureError:
        #        print("Token has expired.")
        #    except jwt.InvalidTokenError:
        #        print("Invalid token.")
        #    response: Response = await call_next(request)
        #    # Modify the response by adding a custom header
        #    response.headers["X-Custom-Header"] = "This is a custom response header"
        #
        ## Process the request and get the response
        ## Intercept the request to check for a Bearer token
        #else:
        #    response: Response = await call_next(request)
            
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
