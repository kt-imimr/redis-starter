const express = require("express")

const router = express.Router()

const {sendMsg} = require("../msgController.js")

router.post("/", sendMsg)

module.exports = router