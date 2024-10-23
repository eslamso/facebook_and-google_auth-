"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("colors");
const db_config_1 = require("./config/db.config");
(0, db_config_1.connectDb)();
const app_1 = __importDefault(require("./app"));
const port = Number(process.env.PORT) || 5000;
app_1.default.listen(port, () => {
    console.log(`app listening on port ${port}`.blue);
});
