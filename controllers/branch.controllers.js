const User = require("../models/user.models");
const Branch = require("../models/branch.models");
const new_branch = require("../models/new_branch.models");
const formidable = require("formidable");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEmail = (req, res) => {
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('error----------->',error);
        } else {
            console.log('Email sent: ' + info.response);
            return res.send('Email sent: ')
        }
    });
}


exports.create = (req, res) => {
  const { title, code, start_date, _class,students } = req.body;

  const branch = new new_branch({ title, code, start_date, _class,students });
  branch.save((err, user) => {
      if (err) {
          return res.status(401).json({
              error: errorHandler(err)
          });
      }
      return res.json({
          status:true,
          message: 'Branch created successfully.!!',
          userData:user
      });
  }); 
}

exports.list = (req, res) => {
  new_branch.find().sort({createdAt: 'desc'}).find(function(err, user) {
      if (err) {
          return res.status(401).json({
              error: errorHandler(err)
          });
      }
      return res.json({
          status:true,
          message: 'All branches fetched successfully.!',
          userData:user
      });
  }); 
}

exports.branchStudentsByBranchId = (req, res) => {
    new_branch.find({_id:req.params.id},function(err, branchData) {
        if (err) {
            return res.status(401).json({
                error: errorHandler(err)
            });
        }else{
            User.find({_id: { $in: branchData[0].students } },(err, studentslist) => {
                if (err) {
                    return res.status(401).json({
                        error: errorHandler(err)
                    });
                }
                return res.json({
                    message: 'all studentslists',
                    studentslist:studentslist,
                    branchData:branchData
                });
            });
        }
    }); 
}

exports.addStudentsToBranch = (req, res) => {
    new_branch.find({_id:req.params.id},function(err, branchData) {
        if (err) {
            return res.status(401).json({
                error: errorHandler(err)
            });
        }else{
            new_branch.updateOne({ "_id": req.params.id },{$push: {students: {$each: req.body.students}}},(err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: errorHandler(err)
                    });
                }
                return res.json({
                    message: 'updated successfully',
                    result:result
                });
            });
        }
    }); 
}

exports.removeStudentsFromBranch  = (req, res) => {
    new_branch.find({_id:req.params.id},function(err, branchData) {
        if (err) {
            return res.status(401).json({
                error: errorHandler(err)
            });
        }else{
            new_branch.updateOne({ "_id": req.params.id },{$pull: { students: { $in: req.body.students}}},(err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: errorHandler(err)
                    });
                }
                return res.json({
                    message: 'updated successfully',
                    result:result
                });
            });
        }
    });
}

exports.getAllBranchesForAStudent  = (req, res) => {
    new_branch.find({ students: { $all: [req.params.studentId] }},function(err, branchData) {
        if (err) {
            return res.status(401).json({
                error: errorHandler(err)
            });
        }else{
            return res.json({
                message: 'fetched successfully',
                result:branchData
            });
        }
    });
}
