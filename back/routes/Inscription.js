const express = require("express")
const router = express.Router();

const inscription = require("../controllers/inscription");

router.post("/", inscription);


module.exports = router;
