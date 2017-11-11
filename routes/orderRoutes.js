const express = require('express');
const router = express.Router();
const notice = require('../controller/ordersController.js');

router.get("/", notice.showMainMenu); //Startseite
router.get("/notice", notice.createNotice); //create Notice Post notice
router.post("/notice", notice.addNotice); // addNotice

module.exports = router;