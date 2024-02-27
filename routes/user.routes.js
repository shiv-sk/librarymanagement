const express = require("express");
const Router = express.Router();

const Usercontroller = require("../controller/user.controller");
const {verifyJWT , restrictUser} = require("../middleware/auth.middleware");

//applying middleware

Router.route("/userregister").post(Usercontroller.registerUser);
Router.route("/login").post(Usercontroller.login);
Router.route("/getalluser").get(Usercontroller.getAllUser);
Router.route("/user/:id").get(Usercontroller.getUser)

Router.route("/user/:id").patch(Usercontroller.updateUser).delete(verifyJWT , restrictUser("admin"), Usercontroller.deleteUser);

module.exports = Router