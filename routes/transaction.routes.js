const express = require("express");
const transactioncontoller = require("../controller/transaction.controller");
const Router = express.Router();
Router.route("/registertransaction").post(transactioncontoller.registertransaction);
Router.route("/getalltransaction").get(transactioncontoller.getAllTransaction);
Router.route("/transaction/:id").get(transactioncontoller.getTransaction).patch(transactioncontoller.updateTransaction)
.delete(transactioncontoller.deleteTransaction)

module.exports = Router