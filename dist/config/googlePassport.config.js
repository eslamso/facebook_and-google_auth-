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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_model_1 = __importDefault(require("../models/user.model"));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    done(null, user);
}));
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
}, (accessToken, RefreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.default.findOne({ googleId: profile.id });
    if (user) {
        done(null, user);
    }
    else {
        user = new user_model_1.default({
            name: profile.name,
            email: profile.emails[0].value,
            googleId: profile.id,
            profileImg: profile._json.picture,
        });
        yield user.save({ validateBeforeSave: false });
        done(null, user);
    }
})));
