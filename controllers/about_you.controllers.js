// const User = require("../models/user.models");




// /*Update name function */
// // exports.updateName = (req, res) => {
// //     const {name}= req.body;
// //     const {id}=req.params;
// //     User.find().then(response => {
// //          res.status(200).json({ message: "Name Updated Successfully!",Data:response });
// //         if (response.length > 0) {
// //             const updatedName = new User({ name:name});
// //             updatedName.save()
// //             .then(response => {
// //                     return res.status(200).json({ message: "Name Updated Successfully!",response });
// //             })
// //             .catch(err => {
// //                 return    res.status(500).json({ error: err })
// //             })
           
// //         }
// //         else {
// //             return res.status(200).json({ message: "Name cannot be empty!"})
// //         }
// //     })
// //     .catch(err => {
// //         res.status(500).json({ error: err })
// //     })
// // };
  
// // exports.updateName=(req,res)=>{
// //    
// //     User.find().then(response=>{
// //         res.status(200).json({message:"Sucessfull featched !",response});
// //         console.log(response)
// //       }
// //     ).catch(
// //       err => {
// //         res.status(500).json({message:"ERRRRRor",error:err});
// //       }
// //     );
// //   }

// exports.updateName = (req, res) => {
//     User.findById(req.params.id, (err, response) => {
//         console.log(response)
//         if(response && !err) {
//             return res.status(200).json({message:"Sucessfull featched Locations!",response});
//         }
//         else{
//             return res.status(404).json({msg: "User not found"});
//         }
//     });
//   };

const Userdb = require("../models/user.models");
const formidable = require("formidable");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");


// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}