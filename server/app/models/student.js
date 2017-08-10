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
        index: { unique: true }
    },
    phone_number:  {
    	type: Number,
    	required: true
    },
    status: {
    	type: String,
    	required: true
    },
    enquiry_details: {
    	type: Array,
    },
    confirmation_details: {
    	type: Array,
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
    center: {},
    counsellor: {},
    today_age: {},
    month_date: {},
    month_age: {},
    class_group: {},
    photo: {}
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Student', StudentSchema);