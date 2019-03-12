var express = require('express');
var router = express.Router();
var profile_controller = require('../controllers/profile');

router.get('/ping', profile_controller.ping);
router.get('/list', profile_controller.profile_list);
router.get('/get', profile_controller.profile_get);

module.exports = router;
