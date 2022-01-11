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

/*Update name function */
exports.updateName = (req, res) => {
    const {name}= req.body;
    const {id}=req.params;
    User.findById(id)
    .then(response => {
        if (response.length > 0) {
            const updatedName = new User({ name:name});
            updatedName.save()
            .then(response => {
                    return res.status(200).json({ message: "Name Updated Successfully!",response });
            })
            .catch(err => {
                return    res.status(500).json({ error: err })
            })
           
        }
        else {
            return res.status(200).json({ message: "Name cannot be empty!"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
};
  