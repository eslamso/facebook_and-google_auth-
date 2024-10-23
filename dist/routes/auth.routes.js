"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const passport_1 = __importDefault(require("passport"));
const appError_1 = __importDefault(require("../utils/appError"));
const router = (0, express_1.Router)();
router.get("/login", (req, res) => {
    res.render("login", { user: req.user });
});
router.get("/logout", (req, res) => {
    req.logOut(() => {
        console.log("logged out");
    });
    res.redirect("/");
});
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/redirect", passport_1.default.authenticate("google"), (req, res) => {
    req.session.loggedIn = true;
    res.redirect("/");
});
router.get("/facebook", passport_1.default.authenticate("facebook", {
    scope: ["email"],
}));
router.get("/facebook/redirect", passport_1.default.authenticate("facebook"), (req, res) => {
    req.session.loggedIn = true;
    res.redirect("/");
});
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.session.loggedIn) {
        return next(new appError_1.default("you must be logged in to access this route", 403));
    }
    next();
}));
exports.default = router;
