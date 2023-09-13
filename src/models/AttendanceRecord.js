const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;
const { schemaTicket } = require('./Ticket');

const schemaAttendanceRecord = new Schema({
  idTicket: {
    type: ObjectId,
    required: [true, 'idTicket is required'],
  },
  ticket: {
    type: schemaTicket,
    required: [true, 'ticket is required'],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('AttendanceRecord', schemaAttendanceRecord);
