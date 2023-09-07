const { Schema, default: mongoose } = require('mongoose');

const schemaAttendant = new Schema({
  idPerson: {
    type: String,
    required: [true, 'idPerson is required'],
  },
  idDepartment: {
    type: String,
  },
});

module.exports = mongoose.model('Attendant', schemaAttendant);
