import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import router from "./routes/bookRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("this project is about bookstore project using mern tack");
});

app.use("/books", router);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("database conncected suucessfully");
    setTimeout(() => {
      app.listen(PORT, () => console.log("server is running"));
    }, 2000);
  })
  .catch((err) => {
    console.log(err);
  });
