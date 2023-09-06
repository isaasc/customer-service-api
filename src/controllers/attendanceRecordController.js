const attendanceRecordRepository = require('../repositories/attendanceRecordRepository');
const ValidationContract = require('../util/validators');

exports.createAttendanceRecord = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.ticket, 'Ticket is required');

  try {
    if (validators.isValid()) {
      await attendanceRecordRepository.createAttendanceRecord(req.body);
      res.status(201).send('AttendanceRecord created!');
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAllAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await AttendanceRecordRepository.findAllAttendanceRecords();
    if (attendanceRecords == null || attendanceRecords.length == 0) {
      res.status(204).send('No AttendanceRecords found');
    } else {
      res.status(200).send(attendanceRecords);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAttendanceRecordById = async (req, res) => {
  const attendanceRecordId = req.params.id;
  if (attendanceRecords == null) {
    res.status(400).send('AttendanceRecordId is required');
  }
  const attendanceRecord = AttendanceRecordRepository.findAttendanceRecordById(attendanceRecordId);

  if (!attendanceRecord) {
    res.status(404).send();
  }

  res.status(200).send(attendanceRecord);
};

exports.updateAttendanceRecordById = async (req, res) => {
  const attendanceRecordId = req.params.id;
  await AttendanceRecordRepository.updateAttendanceRecordById(attendanceRecordId, req.body);
  res.status(200).send('AttendanceRecord updated', req.body);
};

exports.deleteAttendanceRecordById = async (req, res) => {
  const attendanceRecordId = req.params.id;
  await AttendanceRecordRepository.deleteAttendanceRecordById(attendanceRecordId);
  res.status(204).send('AttendanceRecord deleted', req.body);
};
