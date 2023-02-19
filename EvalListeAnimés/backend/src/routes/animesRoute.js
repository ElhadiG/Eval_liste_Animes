const express = require('express');
const router = express.Router();
const animesController= require("../controllers/animesController");

router.get("/animes" ,animesController.getAll)

module.exports = router;
