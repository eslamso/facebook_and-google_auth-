import mongoose from "mongoose";
export interface IUser {
  name: string;
  email: string;
  password?: string;
  role?: string;
  isActivated?: boolean;
  googleId?: string;
  profileImg?: string;
  facebookId?: string;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 32 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActivated: { type: Boolean, default: false },
    googleId: { type: String },
    profileImg: String,
    facebookId: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
