from sympy import sympify
from cat.mad_hatter.decorators import tool, hook # type: ignore
from datetime import datetime
import requests, json, csv
from io import StringIO
from pydantic import BaseModel
from cat.experimental.form import CatForm, CatFormState, form
from cat.log import log

def minify_json(json_data):
    """
    Minifies the JSON data by removing specific fields.

    Args:
        json_data (list or dict): The JSON data as a Python object.

    Returns:
        list: The minified JSON as a list of Python dictionaries.
    """
    # Ensure the input is a list (for multiple catalog entries)
    if not isinstance(json_data, list):
        raise ValueError("Invalid JSON data format: Expected a list of objects")

    # Fields to remove from the root level
    fields_to_remove = {"_id", "currencyCode", "unitOfMeasure"}

    # Iterate through each JSON object in the list
    for obj in json_data:
        if not isinstance(obj, dict):
            raise ValueError("Invalid JSON data format: Expected dictionary items in the list")
        # Remove root-level fields
        for field in fields_to_remove:
            obj.pop(field, None)
        
        # Remove specific fields within the 'flavor' object if it exists
        if 'flavor' in obj and isinstance(obj['flavor'], dict):
            obj['flavor'].pop('code', None)
            obj['flavor'].pop('id', None)
    
    return json_data



def json_to_csv_variable(json_data):
    """
    Converts a JSON object to a CSV format and returns it as a string.

    Args:
        json_data (list): The minified JSON as a list of dictionaries.

    Returns:
        str: The CSV representation of the JSON data.
    """
    # # Ensure input is a list
    # if not isinstance(json_data, list):
    #     raise ValueError("JSON data must be a list of dictionaries.")

    # Flatten the structure where needed
    flattened_data = []
    for item in json_data:
        flat_item = item.copy()

        # If there is a 'flavor' key, flatten its contents
        if 'flavor' in flat_item and isinstance(flat_item['flavor'], dict):
            for key, value in flat_item['flavor'].items():
                flat_item[f"flavor_{key}"] = value
            del flat_item['flavor']

        # If there are nested lists like 'reservations' or 'tiers', handle them as JSON strings
        if 'reservations' in flat_item and isinstance(flat_item['reservations'], list):
            flat_item['reservations'] = json.dumps(flat_item['reservations'])
        if 'tiers' in flat_item and isinstance(flat_item['tiers'], list):
            flat_item['tiers'] = json.dumps(flat_item['tiers'])

        flattened_data.append(flat_item)

    # Get all unique keys from the data to serve as CSV headers
    keys = set()
    for item in flattened_data:
        keys.update(item.keys())
    keys = sorted(keys)  # Sorting keys for consistent structure

    # Write to an in-memory string buffer
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=keys)
    writer.writeheader()
    writer.writerows(flattened_data)

    # Retrieve the CSV content as a string
    csv_content = output.getvalue()
    output.close()

    return csv_content


@tool(
    examples=["get the time", "what is the time"],
    return_direct = True
)
def get_the_time(tool_input, cat):
    """Returns the current time"""
    cat.send_ws_message("Looking at the time..", msg_type='notification')
    return f"teh fokken time is {str(datetime.now())}"

@tool(
    examples=["calculate this", "what is the result of this calculation", "how much am I going to spend if..."],
    return_direct = False
)
def calculate(items, cat) -> float:
    """
    Used when there is a mathematical operation to be done
    """
    try:
        cat.send_ws_message("Calculating..", msg_type='notification')
        total = eval(items)
        return str(total)
    except Exception as e:
        return f"Error in calculation: {str(e)}"

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
        response = requests.get("http://cielospeso_web_1:8000/api/v1/aruba/catalog_products")

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
        response = requests.get("http://cielospeso_web_1:8000/api/v1/aruba/projects")

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

# @hook
# def before_cat_sends_message(message, cat):
    
#     prompt = f'Enhance the following message with 1 emoji at the end: {message["content"]}'
#     message["content"] = cat.llm(prompt)

#     return message



# class PizzaOrder(BaseModel): #
#     pizza_type: str
#     phone: str
#     address: str


# @form
# class PizzaForm(CatForm): #
#     description = "Pizza Order" #
#     model_class = PizzaOrder #
#     start_examples = [ #
#         "ordinare una pizza",
#         "voglio fare un ordine per la pizza",
#         "i want to order a pizza",
#         "i need a pizza order",
#     ]
#     stop_examples = [ #
#         "non ho più voglia di ordinare",
#         "arrivederci",
#         "no more order",
#     ]
#     ask_confirm = True #

#     # # In the form you define
#     # def message(self): #
#     #     if self._state == CatFormState.CLOSED: #
#     #         return {
#     #             "output": f"Form {type(self).__name__} closed"
#     #         }
#     #     missing_fields: List[str] = self._missing_fields #
#     #     errors: List[str] = self._errors #
#     #     out: str = f"""
#     #     The missing information is: {missing_fields}.
#     #     These are the invalid ones: {errors}
#     #     """
#     #     if self._state == CatFormState.WAIT_CONFIRM:
#     #         out += "\n --> Confirm? Yes or no?"

#     #     return {
#     #         "output": out
#     #     }

#     def submit(self, form_data):

#         # Fake API call to order the pizza
#         response = requests.post(
#             "https://fakecallpizza/order",
#             json={
#                 "pizza_type": form_data["pizza_type"],
#                 "phone": form_data["phone"],
#                 "address": form_data["address"]
#             }
#         )
#         response.raise_for_status()

#         time = response.json()["estimated_time"]

#         # Return a message to the conversation with the order details and estimated time
#         return {
#             "output": f"Pizza order on its way: {form_data}. Estimated time: {time}"
#         }