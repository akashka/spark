var mongoose = require('mongoose');
 
var StudentSchema = new mongoose.Schema({
 
    student_id: {
        type: String,
        required: true,
        index: { unique: true }
    },
    name: {
        type: String,
        required: true
    },
    dob: {
    	type: Date,
        required: true	
    },
    gender: {
    	type: String,
    	required: true
    },
    email_id: {
    	type: String,
        required: true,
        index: { unique: false }
    },
    phone_number:  {
    	type: Number,
    	required: true
    },
    status: {
    	type: String,
    	required: true
    },
    parent_name: {
        type: String,
        required: true
    },
    alternate_contact: {
        type: Number,
    },
    locality: {
        type: String,
        required: true  
    },
    center: {
        type: String,
        required: true
    },
    counsellor: {
        type: String,
        required: true
    },
    class_group: {
        type: String,
        required: true
    },
    study_year: {
        type: String,
        required: true
    },
    photo: {},
    enquiry_date: {},
    class_type: {
        type: String,
    },
    uniform_size: {
        type: String,
    },
    shoe_size: {
        type: String,
    },
    is_Confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    is_Indented: {
        type: Boolean,
        default: false,
        required: true
    },
    is_Delivered: {
        type: Boolean,
        default: false,
        required: true
    },
    is_Active: {
        type: Boolean,
        default: true,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
        required: true
    },
    admin_edit: {
        type: Boolean,
        default: false
    },
    is_IndentConfirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    idCardRequested: {
        type: Boolean,
        required: true,
        default: false
    },
    idCardPrinted: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmation_date: {},
    indentation_date: {},
    delivery_date: {}

}, {
    timestamps: true
});
 
module.exports = mongoose.model('Student', StudentSchema);