var express = require('express');
var router = express.Router();
var account_controller = require('../controllers/account');

router.get('/ping', account_controller.ping);
router.post('/register', account_controller.account_register);
router.post('/login', account_controller.account_login);
router.post('/update', account_controller.account_update);
router.post('/delete', account_controller.account_delete);

module.exports = router;
