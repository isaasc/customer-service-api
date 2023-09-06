const router = require('express').Router();
const attendantController = require('../controllers/attendantController');

router.get('/', attendantController.findAllAttendants);
router.get('/:id', attendantController.findAttendantById);
router.post('/', attendantController.createAttendant);
router.put('/:id', attendantController.updateAttendantById);
router.delete('/:id', attendantController.deleteAttendantById);

module.exports = router;
