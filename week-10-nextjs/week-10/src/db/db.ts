import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "courses",
  })
  .then(() => console.log("Connected To MongoDB Successfully"));
