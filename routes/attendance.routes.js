const express = require('express');
const router = express.Router();
const {postAttendance, markAttendance, getAllRecordsOfUser,getByDate} = require('../controllers/attendance.controller');



router.post("/postAttendance", postAttendance)
router.post("/markAttendance", markAttendance)
router.get("/getAllRecords/:id", getAllRecordsOfUser)
router.get("/getByDate/:id", getByDate)





module.exports = router;
