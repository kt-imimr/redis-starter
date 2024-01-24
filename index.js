const express = require("express")

const app = express()
app.disable("x-powered-by");

const PORT = 3000

const msgRouter = require("./routes/msgRouter.js") 

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// app.use('/sendMsg', msgRouter)
app.use("/sendMsg", msgRouter)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})