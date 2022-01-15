<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { find, update } = require("../controllers/about_you.controllers");
=======

const express = require('express');
const router = express.Router();
 const {find,update} = require('../controllers/about_you.controller');


>>>>>>> 43cf175b3d71a10b96b76505dd91901b1b346027

// route.get('/', (req,res)=>{

//     res.render('index')

// })

// router.get('/about_you',(req,res)=>
// {
// res.render('about_you')
// });

//api
<<<<<<< HEAD
router.get("/users", find);
router.put("/users/:id", update);

module.exports = router;
=======
router.get('/users', find);
router.put('/users/:id',update);



module.exports=router;
>>>>>>> 43cf175b3d71a10b96b76505dd91901b1b346027
