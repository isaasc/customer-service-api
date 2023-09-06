const { Schema, default: mongoose } = require('mongoose');
const { schemaTicket } = require('./ticket');

const schemaAttendanceRecord = new Schema({
  ticket: {
    type: schemaTicket,
    required: [true, 'ticket is required'],
  },
  description: {
    type: String,
    required: [false],
  },
});

module.exports = mongoose.model('AttendanceRecord', schemaAttendanceRecord);
