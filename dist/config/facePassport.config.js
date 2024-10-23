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
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const user_model_1 = __importDefault(require("../models/user.model"));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URL,
    profileFields: [
        "id",
        "displayName",
        "emails",
        "picture.type(large)",
        "gender",
    ],
}, (accessToken, RefreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(profile);
    let user = yield user_model_1.default.findOne({ facebookId: profile.id });
    if (user) {
        done(null, user);
    }
    else {
        user = new user_model_1.default({
            name: profile.name,
            email: profile.emails ? profile.emails[0].value : undefined,
            facebookId: profile.id,
            profileImg: profile.photos[0].value,
        });
        yield user.save({ validateBeforeSave: false });
        done(null, user);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    done(null, user);
}));
