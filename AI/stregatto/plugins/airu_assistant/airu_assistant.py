from cat.mad_hatter.decorators import tool, hook # type: ignore
import requests, json
from typing import List
from io import StringIO
from pydantic import BaseModel, Field, validator
from cat.experimental.form import CatForm, CatFormState, form
from cat.log import log
from datetime import datetime
from .utils import *

@tool(
    examples=["get the time", "what is the time"],
    return_direct = False
)
def get_the_time(tool_input, cat):
    """Returns the current time"""
    cat.send_ws_message("Looking at the time..", msg_type='notification')
    return f"teh fokken time is {str(datetime.now())}"


@tool(
    examples=["show me the catalog", "get the catalog"],
    return_direct = True
)
def get_catalog(items, cat):
    """
    Returns the Aruba catalog.
    """
    try:
        # Notify about the process
        cat.send_ws_message("Loading catalog..", msg_type='notification')

        # Fetch the catalog from the API
        response = requests.get("http://web_be_1:8000/api/v1/aruba/catalog_products")

        # Ensure the response is JSON
        if response.headers.get('Content-Type') != 'application/json':
            return "Error: Response content is not JSON."

        # Parse the JSON data
        catalog_data = response.json()

        # Validate the catalog data format
        if not isinstance(catalog_data, list):
            return "Error: Catalog data is not in the expected format (list of objects)."

        # Minify the JSON data
        minified_data = minify_json(catalog_data)
        minified_data = json_to_csv_variable(minified_data)

        # Use the minified data to generate a summary
        summary = cat.llm("Make a brief summary of the following Aruba catalog: " + json.dumps(minified_data, indent=2) + "All prices are in Euro and measured per hour.")
        return summary

    except requests.exceptions.RequestException as e:
        return f"Error fetching catalog: {str(e)}"
    except ValueError as e:
        return f"Error in catalog format: {str(e)}"
    except Exception as e:
        return f"Unexpected error: {str(e)}"


@tool(
    examples=["show me the active projects", "get the active projects", "list the active projects"],
    return_direct = True
)
def get_projects(items, cat):
    """
    Returns the active projects from Aruba servers.
    """
    try:
        # Notify about the process
        cat.send_ws_message("Looking for active projects..", msg_type='notification')

        # Fetch the projects from the API
        response = requests.get("http://web_be_1:8000/api/v1/aruba/projects")

        # Ensure the response is JSON
        if response.headers.get('Content-Type') != 'application/json':
            return "Error: Response content is not JSON."

        # Parse the JSON data
        proj_data = response.json()
        proj_data = json.dumps(proj_data, indent=None)
        log.info(proj_data)
        # Use the minified data to generate a summary
        summary = cat.llm("Make a brief summary of the following active projects: " + proj_data)
        return summary

    except requests.exceptions.RequestException as e:
        return f"Error fetching projects: {str(e)}"
    except ValueError as e:
        return f"Error in projects format: {str(e)}"
    except Exception as e:
        return f"Unexpected error: {str(e)}"


class ProjectStructure(BaseModel):
    name: str = Field(..., min_length=4, max_length=50, description="Name must be 4-50 characters, lowercase, and contain no spaces.")
    description: str

    @validator("name")
    def validate_name(cls, name):
        """
        Custom validation to ensure 'name' is 4-50 characters, all lowercase, and contains no spaces.
        """
        if not name.islower():
            raise ValueError("Name must be all lowercase.")
        if " " in name:
            raise ValueError("Name must not contain spaces.")
        return name


@form
class ProjectCreation(CatForm): #
    description = "Aruba Projects" #
    model_class = ProjectStructure #
    start_examples = [ #
        "i want to create a new project",
        "setup a new project",
        "establish a new project",
    ]
    stop_examples = [ #
        "abort the creation",
        "exit from the creation",
        "no more creation",
    ]
    ask_confirm = True #

    def submit(self, form_data):
        """
        Submits the project data to the API with exception handling.
        """
        try:
            # Perform the API call
            response = requests.post(
                "http://web_be_1:8000/api/v1/aruba/projects",
                json={
                    "metadata": {
                        "name": form_data["name"],
                        "tags": form_data.get("tags", ["airu-generated"]),  # Default to an empty list if not provided
                    },
                    "properties": {
                        "description": form_data.get("description", ""),  # Default to an empty string
                        "default": form_data.get("default", False)  # Use the actual boolean value
                    }
                }
            )
            # Raise an HTTPError if the response contains an HTTP error status code
            response.raise_for_status()
            prompt = f"""
            Summarize the following information, focus on the response status and add a relevant emoji to the response.
            If the response is successful then say that the project was successfully created. Otherwise, explain the error.
            User input: {form_data}
            Server response: {response.json()}
            """
            # Return success message
            return {
                "output": self.cat.llm(prompt)
            }

        except requests.exceptions.HTTPError as http_err:
            # Handle HTTP errors (e.g., 4xx or 5xx responses)
            return {
                "output": f"HTTP error occurred: {http_err}. Please check the request data and try again."
            }

        except requests.exceptions.ConnectionError as conn_err:
            # Handle connection errors (e.g., server is unreachable)
            return {
                "output": f"Connection error occurred: {conn_err}. Please ensure the API is accessible."
            }

        except requests.exceptions.Timeout as timeout_err:
            # Handle timeout errors
            return {
                "output": f"Timeout error occurred: {timeout_err}. The server took too long to respond."
            }

        except requests.exceptions.RequestException as req_err:
            # Catch all other request-related errors
            return {
                "output": f"An error occurred while sending the request: {req_err}. Please try again."
            }

        except KeyError as key_err:
            # Handle missing keys in `form_data`
            return {
                "output": f"Missing required form data field: {key_err}. Please check the input and try again."
            }

        except Exception as err:
            # Handle any other unexpected exceptions
            return {
                "output": f"An unexpected error occurred: {err}. Please try again later."
            }

