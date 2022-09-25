const express = require("express");
const router = express.Router();
//add controllers
const menuController = require('../controllers/menu')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", menuController.getIndex);
router.get("/:id", menuController.editMenu);
router.get("/delete/:id", menuController.deleteMenu);
router.post('/save', menuController.saveMenu);
router.post('/new', menuController.newMenu)


module.exports = router;
