const express = require("express");
const router = express.Router();
//add controllers
const restController = require('../controllers/restaurant')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", restController.getRestIndex);

router.get("/delete/:id", restController.deleteMenu);
//router.post('/save', restController.saveRestaurant);

router.get("/:id", restController.getRest);
//router.get("/:id", ensureAuth, postsController.getPost);

router.post('/new', restController.newRest);
router.post('/save', restController.saveRest);



// router.get("/:id", ensureAuth, postsController.getPost);
// router.post("/createPost", upload.single("file"), postsController.createPost);

module.exports = router;
