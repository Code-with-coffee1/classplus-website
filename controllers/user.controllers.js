const User = require("../models/user.models");
const Branch = require("../models/branch.models");
const formidable = require("formidable");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.read = (req, res) => {
  User.findById(req.query.id, (err, user) => {
      console.log(user)
      if(user && !err) {
          return res.status(200).json(req.profile);
      }
      else{
          return res.status(404).json({msg: "User not found"});
      }
  });
};


// exports.updateName = (req, res) => {
//     const {name}= req.body;
//     User.findById(req.query.id)
//     .then(response => {
//         if (response.length == 0) {
//             res.status(200).json({ message: "Enter the Name"})

//         } else {
//             const updatedName = new User({ name:name});
//             updatedName.save().then(response => {
//                     res.status(200).json({ message: "Name Updated successfully!" })
//                 })
//                 .catch(err => {
//                     res.status(500).json({ error: err })
//                 })
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ error: err })
//     })
//   };
  

  exports.editNameOfStudent = (req, res) => {
    User.updateOne({ _id: req.params.id }, { $push: { name: { $each: req.body.name } } }, (err, user) => {
      if (response.length == 0) {
        return res.status(200).json({ message: "Enter the Name"});
      }
      return res.json({
        message: "Name edited successfully.!",
        userData: user,
      });
    });
  };