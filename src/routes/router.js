const router = require('express').Router();
const ticketRouter = require('./ticketRoute');

router.use('/ticket', ticketRouter);

module.exports = router;
