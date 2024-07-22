const express = require("express");
const middle = require("../middleware/Middleware");
const userCtl = require("../controller/UserCtl");

const routes = express.Router();

routes.post("/register", userCtl.Registration);
routes.post("/login", userCtl.Login);
routes.get("/JWT", middle, userCtl.Proteceduser);
module.exports = routes;
