import { NextFunction, Request, Router, Response } from "express";
import catchAsync from "express-async-handler";
import passport from "passport";
import AppError from "../utils/appError";
const router = Router();
declare global {
  namespace Express {
    interface Request {
      session: {
        passport?: {
          user: string;
        };
        loggedIn?: boolean;
      };
    }
  }
}
// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});
// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logOut(() => {
    console.log("logged out");
  });
  res.redirect("/");
});
// auth with google
// render consent page
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
//call back with google
//exchange code with profile info
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  req.session.loggedIn = true;
  res.redirect("/");
});
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    req.session.loggedIn = true;
    res.redirect("/");
  }
);

//protect route service
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.session.loggedIn) {
      return next(
        new AppError("you must be logged in to access this route", 403)
      );
    }
    // const user = await User.findById(req.session.passport?.user);
    // if (!user || !req.session.loggedIn) {
    //   return next(
    //     new AppError("you must be logged in to access this route", 403)
    //   );
    // }
    // req.user = user;
    next();
  }
);

export default router;
