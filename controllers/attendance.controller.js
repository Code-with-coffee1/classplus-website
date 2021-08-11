const User = require("../models/user.models");
const Admin = require("../models/admin.models");
const AttendClass = require("../models/class_attendance.models");
const mongoose = require("mongoose");
exports.postAttendance = (req, res) => {
  const attendance = new AttendClass({
    start: req.body.start,
    end: req.body.end,
    postedBy: req.body.admin,
  });
  attendance.save(function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};
exports.getAllRecordsOfUser = function (req, res) {
  AttendClass.find({ "markedBy._id": mongoose.Types.ObjectId(req.params.id) }, function (err, records) {
    console.log(records);
    if (err) res.send(err);
    var formattedrecords = [];
    for (var i = 0; i < records.length; i++) {
      formattedrecords.push({
        // "title":records[i].title,
        //"allDay":records[i].allDay,
        start: records[i].start,
        end: records[i].end,
      });
    }
    return res.json(formattedrecords);
  });
};

exports.markAttendance = (req, res) => {
  console.log(req.body);
  if (req.body.start) {
    console.log("creating new entry");
    User.findById(req.body.user, (err, foundUser) => {
      AttendClass.create(
        {
          start: req.body.start,
          markedBy: foundUser,
        },
        function (err, data) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            const obj = { data, ended: false };
            console.log("INSIDE CONTROLLER");
            console.log(obj);
            return res.status(200).send(obj);
          }
        }
      );
    });
  } else {
    AttendClass.findById(req.body.id, function (err, attendance) {
      attendance.end = req.body.end;
      attendance.save((err, data) => {
        if (err) {
          return res.status(400).send(err);
        }
        const obj = { data, ended: true };
        console.log("INSIDE CONTROLLER");
        console.log(obj);
        return res.status(200).send(obj);
      });
    });
  }
};

exports.getByDate = function (req, res) {
  var startDate = new Date(req.body.startDate) ;
  var endDate = new Date(req.body.endDate);

  //find all the record whose start & end date is between than starting & ending dates
  AttendClass.find({ start: { $gte: startDate, $lt: endDate } }, function (err, records) {
    if (err) res.send(err);
    console.log(records);
    if(records.length>0){
        var formattedrecords = [];
        for (var i = 0; i < records.length; i++) {
            console.log(records[i].markedBy)
          if (records[i].markedBy === mongoose.Types.ObjectId(req.params.id)|| true) {
              const start =new Date(records[i].start)
              const end =new Date(records[i].end)

            formattedrecords.push({
             start: start.getDate(), end: end.getDate()
            });
          }
        }
    }
   
    res.json(formattedrecords);
  });
};
