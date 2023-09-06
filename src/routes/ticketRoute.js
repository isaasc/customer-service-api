const router = require('express').Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.findAllTickets);
router.get('/:id', ticketController.findTicketById);
router.post('/', ticketController.createTicket);
router.put('/:id', ticketController.updateTicketById);
router.delete('/:id', ticketController.deleteTicketById);

module.exports = router;
