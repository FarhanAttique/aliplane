// Copyright (c) 2024, Hakim and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
    refresh(frm) {
        // Add the custom button for seat assignment
        frm.add_custom_button(__('Assign Seat'), function() {
            // Show a dialog to input the seat number
            let seat_dialog = new frappe.ui.Dialog({
                title: 'Enter Seat Number',
                fields: [
                    {
                        label: 'Seat Number',
                        fieldname: 'seat_number',
                        fieldtype: 'Data',
                        reqd: 1
                    }
                ],
                primary_action_label: 'Assign Seat',
                primary_action(values) {
                    // Set the seat number in the form
                    frm.set_value('seat', values.seat_number);
                    seat_dialog.hide();
                    frm.save();  // Optionally save the form automatically after setting the seat
                }
            });
            // Show the dialog
            seat_dialog.show();
        });

        // Calculate total amount whenever the form is refreshed
        calculate_total_amount(frm);
    },
    
    flight_price(frm) {
        // Recalculate total amount whenever flight price changes
        calculate_total_amount(frm);
    },

    add_ons_add(frm) {
        // Recalculate total amount whenever a new add-on is added
        calculate_total_amount(frm);
    },

    add_ons_remove(frm) {
        // Recalculate total amount whenever an add-on is removed
        calculate_total_amount(frm);
    }
});

// Helper function to calculate total amount
function calculate_total_amount(frm) {
    let total_addons = 0;

    // Sum all add-on amounts
    (frm.doc.add_ons || []).forEach(function(row) {
        total_addons += row.amount || 0;  // Ensure to handle undefined values
    });

    // Calculate and set total amount
    frm.set_value('total_amount', (frm.doc.flight_price || 0) + total_addons);
}
