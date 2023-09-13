const { default: mongoose } = require('mongoose');

const Attendant = mongoose.model('Attendant');

exports.createAttendant = async (attendant) => {
  const createdAttendant = Attendant(attendant);
  await createdAttendant.save();
};

exports.findAllAttendants = async () => {
  const attendants = await Attendant.find();
  return attendants;
};

exports.findAttendantById = async (attendantId) => {
  const attendant = await Attendant.findOne({ _id: attendantId });
  return attendant;
};

exports.deleteAttendantById = async (attendantId) => {
  await Attendant.findByIdAndDelete(attendantId);
};

exports.updateAttendantById = async (attendantId, attendant) => {
  await Attendant.findByIdAndUpdate(attendantId, {
    $set: {
      idPerson: attendant.idPerson,
      idDepartment: attendant.idDepartment,
    },
  });
};
