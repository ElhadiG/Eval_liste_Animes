const express = require('express');
const router = express.Router();
const toWatchController= require("../controllers/toWatchController");

router.route("/toWatch")
    .get(toWatchController.getAll)
    .post(toWatchController.createData);
router.route("/toWatch/:id") 
    .get(toWatchController.getById)
    .put(toWatchController.updateData)
    .delete(toWatchController.deleteData);


module.exports = router;
