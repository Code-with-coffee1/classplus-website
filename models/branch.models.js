const mongoose = require('mongoose');
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
        postedBy:Object
    },
    { timestamps: true }
);

module.exports = mongoose.model('Branch', branchSchema);
