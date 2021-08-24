const express = require('express');
const router = express.Router();
const controladorHome = require('../controller/homeController');

router.get ('/', controladorHome.show);
router.get ('/list1V1', controladorHome.list1V1);
router.get ('/listTG', controladorHome.listTG);
router.get ('/listUR', controladorHome.listUR);

module.exports = router;