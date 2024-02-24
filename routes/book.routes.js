const express = require("express");
const Router = express.Router();
const  BooksController  = require("../controller/book.controller");
Router.route("/bookregister").post(BooksController.registerBook)
Router.route("/getbooks").get(BooksController.getAllBooks);
Router.route("/book/:id").get(BooksController.getBook).patch(BooksController.updateBook).delete(BooksController.deleteBook)
module.exports = Router