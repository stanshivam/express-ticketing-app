const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const seller_controller = require('../controllers/seller.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', seller_controller.test);

router.post('/create', seller_controller.seller_create);
router.get('/:id', seller_controller.seller_details);
router.put('/:id/update', seller_controller.seller_update);
router.delete('/:id/delete', seller_controller.seller_delete);

module.exports = router;