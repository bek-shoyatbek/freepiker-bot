import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UsersRouter } from "./modules/users/users.routes";
import { MessageRouter } from "./modules/messages/message.routes";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.json({
    message: "Hello world",
    data: [],
  });
});

app.use("/users", UsersRouter);

app.use("/messages", MessageRouter);
