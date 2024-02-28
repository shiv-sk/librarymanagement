const express = require("express");
const transactioncontoller = require("../controller/transaction.controller");
const {verifyJWT , restrictUser} = require("../middleware/auth.middleware");
const Router = express.Router();
Router.route("/registertransaction").post(verifyJWT , restrictUser("admin"), transactioncontoller.registertransaction);
Router.route("/getalltransaction").get(verifyJWT , restrictUser("admin"), transactioncontoller.getAllTransaction);
Router.route("/transaction/:id").get(verifyJWT , restrictUser("admin"), transactioncontoller.getTransaction)
Router.route("/transaction/:id").patch(verifyJWT , restrictUser("admin"), transactioncontoller.updateTransaction)
Router.route("/transaction/:id").delete(verifyJWT , restrictUser("admin"), transactioncontoller.deleteTransaction)

module.exports = Router