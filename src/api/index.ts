import express, {RequestHandler} from "express";
import morgan from "morgan";
import cors from "cors";
import {UsersRouter} from "./modules/users/users.routes";
import {MessageRouter} from "./modules/messages/message.routes";
import {authMiddleware} from "./commons/middlewares/auth.middleware";
import {join} from "node:path";
import {AuthRouter} from "./modules/auth/auth.route";
import {UserPlanRouter} from "./modules/user-plans/user-plan.routes";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(process.cwd(), "frontend")));


app.use("/auth", AuthRouter);

app.use("*", authMiddleware as unknown as RequestHandler);

app.use("/users", UsersRouter);

app.use("/messages", MessageRouter);

app.use("/user-plans", UserPlanRouter);
