const express = require("express")
const dotenv = require('dotenv')
const { createClient } = require("redis")

// route
const msgRouter = require("./routes/msgRouter.js") 
const queueStatusRouter = require("./routes/queueStatusRouter.js")


const publisher = createClient()
	.on('error', (err) => {
		console.log('Redis Client Error', err);
	})
	.connect()


const PORT = 3000
const app = express()
app.disable("x-powered-by");
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/sendMsg", msgRouter)
app.use("/queueStatus", queueStatusRouter)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
  publisher.disconnect()
});