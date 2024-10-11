import random
import string
import frappe
from frappe.model.document import Document

class AirplaneTicket(Document):

    def before_insert(self):
        # Automatically assign a random seat in the format <random-integer><random-alphabet>
        self.assign_random_seat()

    def assign_random_seat(self):
        # Generate a random integer between 1 and 99
        seat_number = random.randint(1, 99)
        # Randomly select a capital letter from A to E
        seat_letter = random.choice(string.ascii_uppercase[:5])  # 'A' to 'E'
        # Set the Seat field to the generated seat value
        self.seat = f"{seat_number}{seat_letter}"

