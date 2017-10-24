const express = require('express');
const router = express.Router();
const notice = require('../controller/ordersController.js');

router.get("/", notice.showIndex); // Startseite
router.get("/main", notice.mainMenu);
router.get("/node", notice.node);
router.get("/notice", notice.createNotice); //create Notice Post notice
router.post("/notice", notice.addNotice); // addNotice
//router.get("/notice", notice.); // Übersicht zu den Notizen
//=:notice/importance=:importance/dateFinished=:dateFinished/

module.exports = router;