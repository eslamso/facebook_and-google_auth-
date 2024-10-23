import mongoose from "mongoose";

// Connect to MongoDB
export const connectDb = () => {
  mongoose
    .connect(process.env.DBURL!)
    .then((c) =>
      console.log(
        `data base connect does Successfully:${c.connection.host}`.green
      )
    )
    .catch((e) => {
      console.error(`failed to connect to data base: ${e}`.red);
      process.exit(1);
    });
};
