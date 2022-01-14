
const express = require('express');
const router = express.Router();
 const {find,update} = require('../controllers/about_you.controllers');



router.get('/users', find);
router.put('/users/:id',update);



module.exports=router;