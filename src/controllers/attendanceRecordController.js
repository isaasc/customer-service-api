const attendanceRecordRepository = require('../repositories/attendanceRecordRepository');
const ticketRepository = require('../repositories/ticketRepository');
const ValidationContract = require('../util/validators');

exports.createAttendanceRecord = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.idTicket, 'idTicket is required');
  validators.isObjectIdValid(
    req.body.idTicket,
    `idTicket: "${req.body.idTicket}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const responseTicket = await ticketRepository.findTicketById(
        req.body.idTicket,
      );
      if (responseTicket == null) {
        res.status(400).send(`idTicket: "${req.body.idTicket}" not found`);
        return;
      }
      req.body.ticket = responseTicket;

      await attendanceRecordRepository.createAttendanceRecord(req.body);
      res.status(201).send('AttendanceRecord created!');
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

exports.findAllAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords =
      await attendanceRecordRepository.findAllAttendanceRecords();
    if (attendanceRecords == null || attendanceRecords.length == 0) {
      res.status(204).send();
    } else {
      res.status(200).send(attendanceRecords);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAttendanceRecordById = async (req, res) => {
  let validators = new ValidationContract();
  const attendanceRecordId = req.params.id;
  validators.isRequired(attendanceRecordId, 'attendanceRecordId is required');
  validators.isObjectIdValid(
    attendanceRecordId,
    `attendanceRecordId: "${attendanceRecordId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const attendanceRecord =
        await attendanceRecordRepository.findAttendanceRecordById(
          attendanceRecordId,
        );
      if (!attendanceRecord) {
        res.status(204).send();
        return;
      }
      res.status(200).send(attendanceRecord);
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

exports.updateAttendanceRecordById = async (req, res) => {
  let validators = new ValidationContract();
  const attendanceRecordId = req.params.id;
  validators.isRequired(attendanceRecordId, 'attendanceRecordId is required');
  validators.isObjectIdValid(
    attendanceRecordId,
    `attendanceRecordId: "${attendanceRecordId}" is not a ObjectId valid.`,
  );
  if (req.body.idTicket) {
    validators.isObjectIdValid(
      req.body.idTicket,
      `idTicket: "${req.body.idTicket}" is not a ObjectId valid.`,
    );
  }

  try {
    if (validators.isValid()) {
      if (req.body.idTicket) {
        const responseTicket = await ticketRepository.findTicketById(
          req.body.idTicket,
        );
        if (responseTicket == null) {
          res.status(400).send(`idTicket: "${req.body.idTicket}" not found`);
          return;
        }

        req.body.ticket = responseTicket;
      }

      await attendanceRecordRepository.updateAttendanceRecordById(
        attendanceRecordId,
        req.body,
      );
      res.status(200).send('AttendanceRecord updated');
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

exports.deleteAttendanceRecordById = async (req, res) => {
  let validators = new ValidationContract();
  const attendanceRecordId = req.params.id;
  validators.isRequired(attendanceRecordId, 'attendanceRecordId is required');
  validators.isObjectIdValid(
    attendanceRecordId,
    `attendanceRecordId: "${attendanceRecordId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await attendanceRecordRepository.deleteAttendanceRecordById(
        attendanceRecordId,
      );
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
