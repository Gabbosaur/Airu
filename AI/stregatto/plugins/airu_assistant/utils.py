from io import StringIO
import json, csv, requests

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


def get_project_id_by_name_from_response(url, project_name):
    """
    Finds the project ID matching a given project name from a JSON response.

    Args:
        url (str): The URL to fetch JSON data from.
        project_name (str): The name of the project to search for.

    Returns:
        str or None: The project ID if found, otherwise None.
    """
    try:
        # Fetch the JSON response from the URL
        response = requests.get(url)
        response.raise_for_status()  # Ensure the request was successful
        data = response.json()
        
        # Traverse the 'values' list to find the project
        for project in data.get("values", []):
            if project["metadata"].get("name") == project_name:
                return project["metadata"].get("id")
        
        # Return None if the project name is not found
        return None
    except requests.RequestException as e:
        print(f"Request error: {e}")
        return None
    except (KeyError, ValueError) as e:
        print(f"JSON processing error: {e}")
        return None