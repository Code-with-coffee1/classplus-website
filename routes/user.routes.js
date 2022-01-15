const express = require('express');
const router = express.Router();
// const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth.controllers');
const {requireAuth, requireAuthAdmin} = require('../middleware/authMiddleware')
const { read} = require('../controllers/user.controllers');

router.get('/user/profile/', read);
//update code
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
})

module.exports = router;
