const express = require("express");

const router = express.Router();
const emailControllers = require("../controllers/cutter-construction");

router.post("/email", emailControllers.cutterConstruction);

module.exports = router;
