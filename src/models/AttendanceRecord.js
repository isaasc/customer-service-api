const { Schema, default: mongoose } = require('mongoose');

const schemaAttendanceRecord = new Schema({
  ticket: {
    type: String,
    required: [true, 'ticket is required'],
  },
  description: {
    type: String,
    required: [false],
  },
});

module.exports = mongoose.model('AttendanceRecord', schemaAttendanceRecord);
