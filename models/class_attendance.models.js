const mongoose = require('mongoose');
// const Admin = require("./admin.models").schema;
const User = require("./user.models").schema;

const attendClassSchema = new mongoose.Schema({
    start: {type: Date},
    end: {type: Date},
    markedBy: User
})
// attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
module.exports = mongoose.model("AttendClass", attendClassSchema);
