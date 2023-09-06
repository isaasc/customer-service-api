const router = require('express').Router();
const ticketRouter = require('./ticketRoute');
const attendantRouter = require('./attendantRoute');
const attendanceRecordRouter = require('./attendanceRecordRoute');

router.use('/ticket', ticketRouter);
router.use('/attendant', attendantRouter);
router.use('/attendanceRecord', attendanceRecordRouter);
module.exports = router;
