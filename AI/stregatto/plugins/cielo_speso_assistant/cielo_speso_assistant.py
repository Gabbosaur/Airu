from sympy import sympify
from cat.mad_hatter.decorators import tool, hook # type: ignore
from datetime import datetime

@tool(
    examples=["get the time", "what is the time"],
    return_direct = False
)
def get_the_time(tool_input, cat):
    """Returns the current time"""
    # send_ws_message("ciao", msg_type='notification')d
    return f"teh fokken time is {str(datetime.now())}"

@tool(
    examples=["calculate this", "what is the result of this calculation"],
    return_direct = False
)
def calculate(items, cat) -> float:
    """
    Used when there is a mathematical operation to be done
    """
    try:
        total = eval(items)
        return str(total)
    except Exception as e:
        return f"Error in calculation: {str(e)}"

# @hook
# def before_cat_sends_message(message, cat):
    
#     prompt = f'Enhance the following message with 1 emoji at the end: {message["content"]}'
#     message["content"] = cat.llm(prompt)

#     return message

import requests
from pydantic import BaseModel
from cat.experimental.form import CatForm, CatFormState, form

class PizzaOrder(BaseModel): #
    pizza_type: str
    phone: str
    address: str


@form
class PizzaForm(CatForm): #
    description = "Pizza Order" #
    model_class = PizzaOrder #
    start_examples = [ #
        "ordinare una pizza",
        "voglio fare un ordine per la pizza",
        "i want to order a pizza",
        "i need a pizza order",
    ]
    stop_examples = [ #
        "non ho più voglia di ordinare",
        "arrivederci",
        "no more order",
    ]
    ask_confirm = True #

    # # In the form you define
    # def message(self): #
    #     if self._state == CatFormState.CLOSED: #
    #         return {
    #             "output": f"Form {type(self).__name__} closed"
    #         }
    #     missing_fields: List[str] = self._missing_fields #
    #     errors: List[str] = self._errors #
    #     out: str = f"""
    #     The missing information is: {missing_fields}.
    #     These are the invalid ones: {errors}
    #     """
    #     if self._state == CatFormState.WAIT_CONFIRM:
    #         out += "\n --> Confirm? Yes or no?"

    #     return {
    #         "output": out
    #     }

    def submit(self, form_data): #

        # Fake API call to order the pizza
        response = requests.post(
            "https://fakecallpizza/order",
            json={
                "pizza_type": form_data["pizza_type"],
                "phone": form_data["phone"],
                "address": form_data["address"]
            }
        )
        response.raise_for_status()

        time = response.json()["estimated_time"]

        # Return a message to the conversation with the order details and estimated time
        return {
            "output": f"Pizza order on its way: {form_data}. Estimated time: {time}"
        }