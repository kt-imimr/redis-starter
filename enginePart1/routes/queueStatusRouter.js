const express = require("express")

const router = express.Router()

const {queueStatus} = require("../controllers/queueStatusController.js")

router.get("/", queueStatus)

module.exports = router