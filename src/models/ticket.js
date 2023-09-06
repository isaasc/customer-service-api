const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTicket = new Schema(
  {
    idAttendant: {
      type: String,
      required: [true, 'idAttendant is required'],
    },
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    telephone: {
      type: String,
      required: false,
    },
    idClient: {
      type: String,
      required: [true, 'idClient is required'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  }
);

module.exports = mongoose.model('Ticket', schemaTicket);
