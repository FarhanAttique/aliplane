// Copyright (c) 2024, Hakim and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
    refresh(frm) {
        // Calculate total amount whenever the form is refreshed
        calculate_total_amount(frm);
    },
    
    flight_price: function(frm) {
        // Recalculate total amount whenever flight price changes
        calculate_total_amount(frm);
    },

    add_ons_add: function(frm) {
        // Recalculate total amount whenever a new add-on is added
        calculate_total_amount(frm);
    },

    add_ons_remove: function(frm) {
        // Recalculate total amount whenever an add-on is removed
        calculate_total_amount(frm);
    }
});

function calculate_total_amount(frm) {
    let total_addons = 0;

    // Sum all add-on amounts
    frm.doc.add_ons.forEach(function(row) {
        total_addons += row.amount || 0;  // Ensure to handle undefined values
    });

    // Calculate total amount
    frm.set_value('total_amount', frm.doc.flight_price + total_addons);
}
