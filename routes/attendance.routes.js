const express = require('express');
const router = express.Router();
const {postAttendance, markAttendance, getAllRecordsOfUser,getByDate} = require('../controllers/attendance.controller');



router.post("/attendance/postAttendance", postAttendance)
router.post("/attendance/markAttendance", markAttendance)
router.get("/attendance/getAllRecords/:id", getAllRecordsOfUser)
router.get("/attendance/getByDate/:id", getByDate)





module.exports = router;
