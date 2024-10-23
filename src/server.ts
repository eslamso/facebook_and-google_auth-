import dotenv from "dotenv";
dotenv.config();
import "colors";
import { connectDb } from "./config/db.config";
connectDb();
import app from "./app";
const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`.blue);
});
