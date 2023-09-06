const { default: mongoose } = require('mongoose');

const AttendanceRecord = mongoose.model('AttendanceRecord');

exports.createAttendanceRecord = async (attendanceRecord) => {
  const createdAttendanceRecord = AttendanceRecord(attendanceRecord);
  await createdAttendanceRecord.save();
};

exports.findAllAttendanceRecords = async () => {
  const attendanceRecords = await AttendanceRecord.find();
  return attendanceRecords;
};

exports.findAttendanceRecordById = async (attendanceRecordId) => {
  const attendanceRecord = await AttendanceRecord.findByOne({
    _id: attendanceRecordId,
  });
  return attendanceRecord;
};

exports.deleteAttendanceRecordById = async (attendanceRecordId) => {
  await AttendanceRecord.findByIdAndDelete(attendanceRecordId);
};

exports.updateAttendanceRecordById = async (
  attendanceRecordId,
  attendanceRecord,
) => {
  await AttendanceRecord.findByIdAndUpdate(attendanceRecordId, {
    $set: {
      description: attendanceRecord.description,
    },
  });
};
