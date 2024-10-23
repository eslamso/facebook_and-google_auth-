import passport from "passport";
import FaceBookStrategy from "passport-facebook";
import User from "../models/user.model";
declare global {
  namespace Express {
    interface User {
      id?: any;
    }
  }
}

passport.use(
  new FaceBookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: process.env.FACEBOOK_REDIRECT_URL!,
      profileFields: [
        "id",
        "displayName",
        "emails",
        "picture.type(large)",
        "gender",
      ],
    },
    async (accessToken, RefreshToken, profile, done) => {
      console.log(profile);
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        //console.log("user found");
        done(null, user);
      } else {
        user = new User({
          name: profile.name,
          email: profile.emails ? profile.emails[0].value : undefined,
          facebookId: profile.id,
          profileImg: profile.photos![0].value,
        });
        await user.save({ validateBeforeSave: false });
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
