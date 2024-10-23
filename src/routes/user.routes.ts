import { Router } from "express";
import { protect } from "./auth.routes";
const userRouter = Router();
declare global {
  namespace Express {
    interface Request {
      x?: string;
    }
  }
}
userRouter.get("/profile", protect, (req, res) => {
  res.render("profile", { user: req.user });
});

userRouter.get("/eslam", (req, res) => {
  res.send(req.user);
});
export default userRouter;
