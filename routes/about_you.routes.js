const express = require("express");
const router = express.Router();
const { find, update } = require("../controllers/about_you.controllers");

// route.get('/', (req,res)=>{

//     res.render('index')

// })

// router.get('/about_you',(req,res)=>
// {
// res.render('about_you')
// });

//api
router.get("/users", find);
router.put("/users/:id", update);

module.exports = router;
