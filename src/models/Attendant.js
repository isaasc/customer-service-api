const { Schema, default: mongoose } = require('mongoose');

const schemaAttendant = new Schema({
  idPerson: {
    type: String,
    required: [true, 'idPerson is required'],
  },
  departmentCode: {
    type: String,
    required: [true, 'departmentCode is required'],
  },
});

module.exports = mongoose.model('Attendant', schemaAttendant);
