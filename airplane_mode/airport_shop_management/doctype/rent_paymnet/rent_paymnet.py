# Copyright (c) 2024, Hakim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class RentPayment(Document):
	def on_submit(self):
		# Automatically generate a unique receipt number before inserting
		self.status='Paid'
		self.payment_number = frappe.generate_hash(self.name, 10)