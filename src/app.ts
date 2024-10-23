import express from "express";
import "./config/googlePassport.config";
import "./config/facePassport.config";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import expressSession from "express-session";
import mongoConnectSessions from "connect-mongodb-session";
const mongoStore = mongoConnectSessions(expressSession);
import passport from "passport";
import { globalErrorHandler } from "./middlewares/error.middleWare";
const app = express();
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
      uri: process.env.DBURL!,
      collection: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res, next) => {
  res.render("home", { user: req.user });
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use(globalErrorHandler);
export default app;
