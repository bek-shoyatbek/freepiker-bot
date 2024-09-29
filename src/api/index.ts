import express from "express";
import morgan from "morgan";
import cors from "cors";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/hello", async (req, res) => {
  res.json({
    message: "Hello world",
    data: [],
  });
});
