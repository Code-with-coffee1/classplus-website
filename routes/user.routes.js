const express = require('express');
const router = express.Router();
// const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth.controllers');
const {requireAuth, requireAuthAdmin} = require('../middleware/authMiddleware')
const { read, updateName} = require('../controllers/user.controllers');

router.get('/user/profile/', read);
/*Update name route */
router.post('/about_you/:id',updateName);


module.exports = router;
