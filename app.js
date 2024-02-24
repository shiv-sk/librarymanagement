const express = require("express");
const app = express()
const Dbconnection = require("./db/connectio.db");
const UserRouter = require("./routes/user.routes");
const BookRouter = require("./routes/book.routes");
const TransactionRouter = require("./routes/transaction.routes");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"})

app.use(express.json());

Dbconnection().then(()=>{
    app.listen(process.env.PORT || 3000);
    console.log(`server is running on port: ${process.env.PORT}`);
    app.on("ERROR" , (err)=>{
        console.log("ERROR : " , err);
        throw err
    })
}).catch((error)=>{
    console.log("please fix this error," ,error)
})

app.use("/api/v1/UserRouter" , UserRouter);
app.use("/api/v1/BookRouter" , BookRouter);
app.use("/api/v1/TransactionRouter" , TransactionRouter)
module.exports = app;