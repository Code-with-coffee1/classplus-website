const express = require('express');
const router = express.Router();
const {
    create,
    list,
    branchStudentsByBranchId,
    addStudentsToBranch,
    
    removeStudentsFromBranch,
    getAllBranchesForAStudent,
    sendEmail,
    read,
    remove,
    update,
} = require('../controllers/branch.controllers');

const { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBranch } = require('../controllers/auth.controllers');

// router.post('/branch/create', requireSignin, adminMiddleware, create);
router.post('/branch/create', create);
router.post('/sendEmail', sendEmail);
router.get('/branches', list);
router.get('/branchStudentsByBranchId/:id', branchStudentsByBranchId);
router.delete('/removeStudentsFromBranch/:id', removeStudentsFromBranch);
router.put('/addStudentsToBranch/:id', addStudentsToBranch);
router.get('/getAllBranchesForAStudent/:studentId', getAllBranchesForAStudent);




module.exports = router;
