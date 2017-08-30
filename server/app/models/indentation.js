var mongoose = require('mongoose');
 
var IndentationSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    center_code: {
    	type: String,
        required: true,
    },
    total_amount: {
    	type: Number,
    	required: true,
    },
    payment_mode: {
    	type: String,
    	required: true
    },
    payment_date: {
    	type: Date,
    	required: true
    },
    bank_name: {
        type: String
    },
    transaction_no: {
        type: String
    },
    cheque_no: {
        type: String
    },
    students_amount: {
        type: Object
    }

}, {
    timestamps: true
});
 
module.exports = mongoose.model('Indentation', IndentationSchema);