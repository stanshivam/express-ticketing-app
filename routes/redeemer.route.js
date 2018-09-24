const express = require('express');
const router = express.Router();

const redeemer_controller = require('../controllers/redeemer.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/create', redeemer_controller.redeemer_create);
router.get('/:id', redeemer_controller.redeemer_details);
router.put('/:id/update', redeemer_controller.redeemer_update);
router.delete('/:id/delete', redeemer_controller.redeemer_delete);

module.exports = router;