var mongoose = require('mongoose');
 
var ClassroomSchema = new mongoose.Schema({
 
    center: {
        type: String,
        required: true,
    },
    class_group: {
        type: String,
        required: true
    },
    video_src: {
    	type: String,
    	required: true
    },
    video_msg: {
    	type: String
    },
    is_Active: {
        type: Boolean,
        default: true,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});
 
module.exports = mongoose.model('Classroom', ClassroomSchema);