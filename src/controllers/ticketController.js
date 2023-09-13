const ticketRepository = require('../repositories/ticketRepository');
const ValidationContract = require('../util/validators');
const attendantRepository = require('../repositories/attendantRepository');

exports.createTicket = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.idAttendant, 'idAttendant is required');
  validators.isRequired(req.body.title, 'title is required');
  validators.isRequired(req.body.idClient, 'idClient is required');
  validators.isObjectIdValid(
    req.body.idAttendant,
    `idAttendant: "${req.body.idAttendant}" is not a ObjectId valid.`,
  );
  validators.isObjectIdValid(
    req.body.idClient,
    `idClient: "${req.body.idClient}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const responseAttendant = await attendantRepository.findAttendantById(
        req.body.idAttendant,
      );

      if (responseAttendant == null) {
        res
          .status(400)
          .send(`idAttendant: "${req.body.idAttendant}" not found`);
        return;
      }

      await ticketRepository.createTicket(req.body);
      res.status(201).send('Ticket created!');
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

exports.findAllTickets = async (req, res) => {
  try {
    const tickets = await ticketRepository.findAllTickets();
    if (tickets == null || tickets.length == 0) {
      res.status(204).send();
    } else {
      res.status(200).send(tickets);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findTicketById = async (req, res) => {
  let validators = new ValidationContract();
  const ticketId = req.params.id;
  validators.isRequired(ticketId, 'ticketId is required');
  validators.isObjectIdValid(
    ticketId,
    `ticketId: "${ticketId}" is not a ObjectId valid.`,
  );
  try {
    if (validators.isValid()) {
      const ticket = await ticketRepository.findTicketById(ticketId);
      if (!ticket) {
        res.status(204).send();
        return;
      }
      res.status(200).send(ticket);
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

exports.updateTicketById = async (req, res) => {
  let validators = new ValidationContract();
  const ticketId = req.params.id;
  validators.isRequired(ticketId, 'ticketId is required');
  validators.isObjectIdValid(
    ticketId,
    `ticketId: "${ticketId}" is not a ObjectId valid.`,
  );

  if (req.body.idAttendant) {
    validators.isObjectIdValid(
      req.body.idAttendant,
      `idAttendant: "${req.body.idAttendant}" is not a ObjectId valid.`,
    );
  }

  if (req.body.idClient) {
    validators.isObjectIdValid(
      req.body.idClient,
      `idClient: "${req.body.idClient}" is not a ObjectId valid.`,
    );
  }

  try {
    if (validators.isValid()) {
      const responseAttendant = await attendantRepository.findAttendantById(
        req.body.idAttendant,
      );

      if (responseAttendant == null) {
        res
          .status(400)
          .send(`idAttendant: "${req.body.idAttendant}" not found`);
        return;
      }

      await ticketRepository.updateTicketById(ticketId, req.body);
      res.status(200).send('Ticket updated');
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

exports.deleteTicketById = async (req, res) => {
  let validators = new ValidationContract();
  const ticketId = req.params.id;
  validators.isRequired(ticketId, 'ticketId is required');
  validators.isObjectIdValid(
    ticketId,
    `ticketId: "${ticketId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await ticketRepository.deleteTicketById(ticketId);
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
