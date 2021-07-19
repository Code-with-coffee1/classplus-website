const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const requireAuthAdmin = (req, res, next) => {
  const token = req.cookies.token;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/admin_login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // res.redirect('/admin_login');
    res.redirect('/admin_login');

    console.log("user not verified")
  }
};
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.render('login', {msg: "Session Expired"});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // res.redirect('/admin_login');
    res.render('login', {msg:"ok"});

    console.log("user not verified")
  }
};


// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser, requireAuthAdmin };