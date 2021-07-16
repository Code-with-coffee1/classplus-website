const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth.controllers');
const { read} = require('../controllers/user.controllers');

router.get('/user/profile', requireSignin, authMiddleware, read);

module.exports = router;
