const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const schemaTicket = new Schema({
  idAttendant: {
    type: ObjectId,
    required: [true, 'idAttendant is required'],
  },
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  telephone: {
    type: String,
  },
  idClient: {
    type: ObjectId,
    required: [true, 'idClient is required'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Ticket = mongoose.model('Ticket', schemaTicket);

module.exports = {
  Ticket,
  schemaTicket,
};
