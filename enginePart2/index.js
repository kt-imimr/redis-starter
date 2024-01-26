const express = require("express")
const dotenv = require('dotenv')
const {redisSubscriber} = require("./redisService")

const PORT = 3001
const app = express()



app.disable("x-powered-by");
dotenv.config();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(redisSubscriber)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})