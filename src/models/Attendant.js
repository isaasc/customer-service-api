const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const schemaAttendant = new Schema({
  idPerson: {
    type: ObjectId,
    required: [true, 'idPerson is required'],
  },
  idDepartment: {
    type: ObjectId,
    required: [true, 'idDepartment is required'],
  },
});

module.exports = mongoose.model('Attendant', schemaAttendant);
