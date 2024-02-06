
const express = require('express')

const app = express()
const port = process.env.PORT;

const inscription = require('./routes/Inscription')
const login = require("./routes/Login")
const getprorile = require("./routes/profile")

const cors = require("cors")
app.use(cors())
app.use(express.json()) 

const   username = process.env.USERNAME,
        password =process.env.PASSWORD,
        database = process.env.DATABASE;

const mongoose = require('mongoose')
mongoose
    .connect(`mongodb+srv://${username}:${password}@cluster0.rd1iouy.mongodb.net/${database}?retryWrites=true&w=majority`)
    .then(() => console.log("connected to mongodb.."))
    .catch((error) => console.log("connection failed to mongodb", error))

/*---------------------------------Routes--------------------------------*/

app.use("/inscription" , inscription)
app.use("/login" , login)
app.use("/Profile" , getprorile)

app.listen(port, ()=>{ console.log("server works!")})