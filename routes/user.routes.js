const express = require("express");
const Router = express.Router();

const Usercontroller = require("../controller/user.controller");
const {verifyJWT , restrictUser} = require("../middleware/auth.middleware");

//applying middleware

Router.route("/userregister").post(Usercontroller.registerUser);
Router.route("/login").post(Usercontroller.login);
Router.route("/user/:id").patch(Usercontroller.updateUser)

Router.route("/getalluser").get(verifyJWT , restrictUser("admin"), Usercontroller.getAllUser);
Router.route("/user/:id").get(verifyJWT , restrictUser("admin"), Usercontroller.getUser)
Router.route("/user/:id").delete(verifyJWT , restrictUser("admin"), Usercontroller.deleteUser);

module.exports = Router