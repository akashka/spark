var mongoose = require('mongoose');
 
var IndentationSchema = new mongoose.Schema({
    num: {
        type: String,
        required: true
    },
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
    deliveryTime: {
        type: Array
    },
    status: {
        type: String,
        required: true
    },
    students_amount: {
        type: Object
    },
    is_IndentConfirmed: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
});
 
module.exports = mongoose.model('Indentation', IndentationSchema);