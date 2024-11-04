# Copyright (c) 2024, Hakim and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ContractShop(Document):
	def after_insert(self):
		
		if self.shop:
			shop_doc = frappe.get_doc("Shop", self.shop)
			shop_doc.status = "Leased"
			shop_doc.tenant_details = self.tenant
			shop_doc.contract_expiry = self.contract_end

			shop_doc.save(ignore_permissions=True)  

			frappe.msgprint(_("Shop {0} has been marked as 'Leased'.").format(shop_doc.shop_name), alert=True)
