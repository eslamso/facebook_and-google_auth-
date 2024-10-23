import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.model";
declare global {
  namespace Express {
    interface User {
      id?: any;
    }
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL!,
    },
    // call back function
    async (accessToken, RefreshToken, profile, done) => {
      //console.log(profile);
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        //console.log("user found");
        done(null, user);
      } else {
        user = new User({
          name: profile.name,
          email: profile.emails![0].value,
          googleId: profile.id,
          profileImg: profile._json.picture,
        });
        await user.save({ validateBeforeSave: false });
        done(null, user);
      }
    }
  )
);
