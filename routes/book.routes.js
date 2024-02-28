const express = require("express");
const Router = express.Router();
const  BooksController  = require("../controller/book.controller");
const {verifyJWT , restrictUser} = require("../middleware/auth.middleware");
Router.route("/bookregister").post(verifyJWT , restrictUser("admin"), BooksController.registerBook)
Router.route("/getbooks").get(verifyJWT , restrictUser("admin"), BooksController.getAllBooks);
Router.route("/book/:id").get(verifyJWT , restrictUser("admin"), BooksController.getBook)
Router.route("/book/:id").patch(verifyJWT , restrictUser("admin"), BooksController.updateBook)
Router.route("/book/:id").delete(verifyJWT , restrictUser("admin"), BooksController.deleteBook)
module.exports = Router