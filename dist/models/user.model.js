"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 32 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActivated: { type: Boolean, default: false },
    googleId: { type: String },
    profileImg: String,
    facebookId: String,
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
