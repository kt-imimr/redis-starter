const express = require("express")
const dotenv = require('dotenv')

const PORT = 3001
const app = express()



app.disable("x-powered-by");
dotenv.config();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.user

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})