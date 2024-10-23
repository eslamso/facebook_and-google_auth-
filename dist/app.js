"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/googlePassport.config");
require("./config/facePassport.config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const mongoStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const passport_1 = __importDefault(require("passport"));
const error_middleWare_1 = require("./middlewares/error.middleWare");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        uri: process.env.DBURL,
        collection: "sessions",
    }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    res.render("home", { user: req.user });
});
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use(error_middleWare_1.globalErrorHandler);
exports.default = app;
