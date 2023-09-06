const ticketRepository = require('../repositories/ticketRepository');
const ValidationContract = require('../util/validators');

exports.createTicket = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.idAttendant, 'idAttendant is required');
  validators.isRequired(req.body.title, 'title is required');
  validators.isRequired(req.body.idClient, 'idClient is required');

  try {
    if (validators.isValid()) {
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
      res.status(204).send('No tickets found');
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
  const ticketId = req.params.id;
  if (ticketId == null) {
    res.status(400).send('ticketId is required');
  }
  const ticket = ticketRepository.findTicketById(ticketId);

  if (!ticket) {
    res.status(404).send();
  }

  res.status(200).send(ticket);
};

exports.updateTicketById = async (req, res) => {
  const ticketId = req.params.id;
  await ticketRepository.updateTicketById(ticketId, req.body);
  res.status(200).send('Ticket updated', req.body);
};

exports.deleteTicketById = async (req, res) => {
  const ticketId = req.params.id;
  await ticketRepository.deleteTicketById(ticketId);
  res.status(204).send('Ticket deleted', req.body);
};
