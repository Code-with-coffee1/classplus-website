const User = require('../models/user.models');
const Branch = require('../models/branch.models');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.read = (req, res) => {
    return res.json(req.profile);
};
