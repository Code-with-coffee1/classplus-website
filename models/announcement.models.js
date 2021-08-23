const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const new_branch = require('./new_branch.models').schema;

const announcementSchema = new mongoose.Schema(
    {
        branchId: [new_branch],
        admin_announcement : {
            type: Boolean,
            required: true
        },
        student_announcement: {
            type: Boolean,
            required: true
        },
        announcement: {
            type: String,
            required: true
        },

        isClassAnnouncement: {
            type: Boolean,
        },
        scheduledTime:{
            type: Date
        },
        link:{
            type: String
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('announcement', announcementSchema);
