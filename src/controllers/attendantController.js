const attendantRepository = require('../repositories/attendantRepository');
const ValidationContract = require('../util/validators');

exports.createAttendant = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.idPerson, 'idPerson is required');
  validators.isRequired(req.body.idDepartment, 'idDepartment is required');
  validators.isObjectIdValid(
    req.body.idPerson,
    `idPerson: "${req.body.idPerson}" is not a ObjectId valid.`,
  );
  validators.isObjectIdValid(
    req.body.idDepartment,
    `idDepartment: "${req.body.idDepartment}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const responsePerson = await getPersonById(req.body.idPerson);
      if (responsePerson.status !== 200) {
        if (responsePerson.status === 204) {
          res.status(400).send(`idPerson: "${req.body.idPerson}" not found`);
          return;
        } else {
          res.status(responsePerson.status).send(responsePerson.text);
          return;
        }
      }

      const responseDepartment = await getDepartmentById(req.body.idDepartment);
      if (responseDepartment.status !== 200) {
        if (responseDepartment.status === 204) {
          res
            .status(400)
            .send(`idDepartment: "${req.body.idDepartment}" not found`);
          return;
        } else {
          res.status(responseDepartment.status).send(responseDepartment.text);
          return;
        }
      }

      await attendantRepository.createAttendant(req.body);
      res.status(201).send('Attendant created!');
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAllAttendants = async (req, res) => {
  try {
    const attendants = await attendantRepository.findAllAttendants();
    if (attendants == null || attendants.length == 0) {
      res.status(204).send();
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
  let validators = new ValidationContract();
  const attendantId = req.params.id;
  validators.isRequired(attendantId, 'attendantId is required');
  validators.isObjectIdValid(
    attendantId,
    `attendantId: "${attendantId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const attendant = await attendantRepository.findAttendantById(
        attendantId,
      );
      if (!attendant) {
        res.status(204).send();
        return;
      }
      res.status(200).send(attendant);
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.updateAttendantById = async (req, res) => {
  let validators = new ValidationContract();
  const attendantId = req.params.id;
  validators.isRequired(attendantId, 'attendantId is required');
  validators.isObjectIdValid(
    attendantId,
    `attendantId: "${attendantId}" is not a ObjectId valid.`,
  );
  if (req.body.idPerson != null) {
    validators.isObjectIdValid(
      req.body.idPerson,
      `idPerson: "${req.body.idPerson}" is not a ObjectId valid.`,
    );
  }

  if (req.body.idDepartment != null) {
    validators.isObjectIdValid(
      req.body.idDepartment,
      `idDepartment: "${req.body.idDepartmen}" is not a ObjectId valid.`,
    );
  }

  try {
    if (validators.isValid()) {
      if (req.body.idPerson != null) {
        const responsePerson = await getPersonById(req.body.idPerson);
        if (responsePerson.status !== 200) {
          if (responsePerson.status === 204) {
            res.status(400).send(`idPerson: "${req.body.idPerson}" not found`);
            return;
          } else {
            res.status(responsePerson.status).send(responsePerson.text);
            return;
          }
        }
      }

      if (req.body.idDepartment != null) {
        const responseDepartment = await getDepartmentById(
          req.body.idDepartment,
        );
        if (responseDepartment.status !== 200) {
          if (responseDepartment.status === 204) {
            res
              .status(400)
              .send(`idDepartment: "${req.body.idDepartment}" not found`);
            return;
          } else {
            res.status(responseDepartment.status).send(responseDepartment.text);
            return;
          }
        }
      }

      await attendantRepository.updateAttendantById(attendantId, req.body);
      res.status(200).send('Attendant updated');
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.deleteAttendantById = async (req, res) => {
  let validators = new ValidationContract();
  const attendantId = req.params.id;
  validators.isRequired(attendantId, 'attendantId is required');
  validators.isObjectIdValid(
    attendantId,
    `attendantId: "${attendantId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await attendantRepository.deleteAttendantById(attendantId);
      res.status(204).send();
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

async function getPersonById(idPerson) {
  return await fetch(`http:localhost:3001/person/${idPerson}`);
}

async function getDepartmentById(idDepartment) {
  return await fetch(`http:localhost:3001/department/${idDepartment}`);
}
