const attendantRepository = require('../repositories/attendantRepository');
const ValidationContract = require('../util/validators');
const fetch = require('node-fetch');

exports.createAttendant = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.idPerson, 'idPerson is required');

console.log(req.body.idDepartment)
const test = `http:localhost:3001/departamento/${req.body.idDepartment}`;
console.log(test);



  try {
    const departamento = await fetch(`http:localhost:3001/departamento/${req.body.idDepartment}`);
    console.log(departamento);
    if(departamento == null) {
      res.status(404).send('idDepartment not found');
    }


    if (validators.isValid()) {
      await attendantRepository.createAttendant(req.body);
      res.status(201).send('Attendant created!');
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAllAttendants = async (req, res) => {
  try {
    const attendants = await attendantRepository.findAllAttendants();
    if (attendants == null || attendants.length == 0) {
      res.status(204).send('No attendants found');
    } else {
      res.status(200).send(attendants);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAttendantById = async (req, res) => {
  const attendantId = req.params.id;
  if (attendantId == null) {
    res.status(400).send('attendantId is required');
  }
  const attendant = attendantRepository.findAttendantById(attendantId);

  if (!attendant) {
    res.status(404).send();
  }

  res.status(200).send(attendant);
};

exports.updateAttendantById = async (req, res) => {
  const attendantId = req.params.id;
  await attendantRepository.updateAttendantById(attendantId, req.body);
  res.status(200).send('Attendant updated', req.body);
};

exports.deleteAttendantById = async (req, res) => {
  const attendantId = req.params.id;
  await attendantRepository.deleteAttendantById(attendantId);
  res.status(204).send('Attendant deleted', req.body);
};
