const { default: mongoose } = require('mongoose');

const Ticket = mongoose.model('Ticket');

exports.createTicket = async (ticket) => {
  const createdTicket = Ticket(ticket);
  await createdTicket.save();
};

exports.findAllTickets = async () => {
  const tickets = await Ticket.find();
  return tickets;
};

exports.findTicketById = async (ticketId) => {
  const ticket = await Ticket.findByOne({ _id: ticketId });
  return ticket;
};

exports.deleteTicketById = async (ticketId) => {
  await Ticket.findByIdAndUpdate(ticketId, {
    $set: {
      active: false,
    },
  });
};

exports.updateTicketById = async (ticketId, ticket) => {
  await Ticket.findByIdAndUpdate(ticketId, {
    $set: {
      idAttendant: ticket.idAttendant,
      title: ticket.title,
      telephone: ticket.telephone,
    },
  });
};
