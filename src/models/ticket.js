const { Schema, default: mongoose } = require('mongoose');

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
  },
  { timestamps: true },
);

const Ticket = mongoose.model('Ticket', schemaTicket);
module.exports = {
  Ticket,
  schemaTicket,
};
