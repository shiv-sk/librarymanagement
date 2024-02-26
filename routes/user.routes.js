const express = require("express");
const Router = express.Router();

const Usercontroller = require("../controller/user.controller");


Router.route("/userregister").post(Usercontroller.registerUser);
Router.route("/login").post(Usercontroller.login);
Router.route("/getalluser").get(Usercontroller.getAllUser);
Router.route("/user/:id").get(Usercontroller.getUser).patch(Usercontroller.updateUser).delete(Usercontroller.deleteUser);

module.exports = Router