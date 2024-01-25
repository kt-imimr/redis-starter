const express = require("express")

const router = express.Router()

const {sendMsg} = require("../controllers/msgController.js")

router.post("/", sendMsg)

module.exports = router