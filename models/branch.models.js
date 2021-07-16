const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const branchSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },
        // slug: {
        //     type: String,
        //     // unique: true,
        //     index: true
        // },
        code: {
            type: String,
            // unique: true,
            index: true
        },
        // desc: {
        //     type: String
        // },
        _class:{
            type: Number,
            required: true
        },
        start_date:{
            type: Date,
            required: true
        },
        // students: [{ 
        //     type: ObjectId,
        //     ref: 'User' }],
        postedBy: {
            type: ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Branch', branchSchema);
