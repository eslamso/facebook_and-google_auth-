"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const userRouter = (0, express_1.Router)();
userRouter.get("/profile", auth_routes_1.protect, (req, res) => {
    res.render("profile", { user: req.user });
});
userRouter.get("/eslam", (req, res) => {
    res.send(req.user);
});
exports.default = userRouter;
