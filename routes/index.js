const express = require("express");
const router = express.Router();
//add controllers
const indexController = require('../controllers/index')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", indexController.getIndex);
router.post('/query', indexController.getSearch);

module.exports = router;
