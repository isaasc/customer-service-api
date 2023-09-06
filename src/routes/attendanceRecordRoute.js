const router = require('express').Router();
const attendanceRecordController = require('../controllers/attendanceRecordController');

router.get('/', attendanceRecordController.findAllAttendanceRecords);
router.get('/:id', attendanceRecordController.findAttendanceRecordById);
router.post('/', attendanceRecordController.createAttendanceRecord);
router.put('/:id', attendanceRecordController.updateAttendanceRecordById);
router.delete('/:id', attendanceRecordController.deleteAttendanceRecordById);

module.exports = router;
