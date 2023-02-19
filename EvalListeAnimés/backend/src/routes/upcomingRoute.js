const express = require('express');
const router = express.Router();
const upcomingController= require("../controllers/upcomingController");

router.route("/upcoming")
    .get(upcomingController.getAll)
    .post(upcomingController.createData);
router.route("/upcoming/:id") 
    .get(upcomingController.getById)
    .put(upcomingController.updateData)
    .delete(upcomingController.deleteData);

module.exports = router;
