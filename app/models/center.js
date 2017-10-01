var mongoose = require('mongoose');
 
var CenterSchema = new mongoose.Schema({

    center_name: {
        type: String,
        required: true
    },
    center_code: {
    	type: String,
        required: true,
        index: { unique: true }
    },
    center_email: {
    	type: String,
    	required: true,
        index: { unique: true }
    },
    center_phoneno:  {
    	type: String,
    	required: true
    },
    center_address: {
    	type: String,
    	required: true
    },
    active: {
        type: Boolean,
    },
    playgroup: {
        type: Object,
        required: true
    },
    nursery: {
        type: Object,
        required: true
    },
    lkg: {
        type: Object,
        required: true
    },
    ukg: {
        type: Object,
        required: true
    },
    cash: {
        type: Boolean,
    },

}, {
    timestamps: true
});
 
module.exports = mongoose.model('Center', CenterSchema);