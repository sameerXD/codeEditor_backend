import express from "express";
import userRouter from "./routes/user";
import connectDB from "./database/db";
import cors from "cors";
import { NotFoundError } from "@vizlogic/commonsameer";
import "express-async-errors";
import { errorHandlerLogged } from "./middleware/error-handler";
import { getIo, initSocket } from "./utils/Socket";
import http from "http";

require("dotenv").config();

const app = express();

const originArr: string[] = [
  "http://localhost:3000",
];





app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: originArr }));

const server = http.createServer(app);
initSocket(server);

// connect to mongodb
connectDB();
// parse incoming json and attach it to req.body
app.use(express.json());

// if dotenv file present take the port else 5000
const PORT = process.env.PORT || 4000;

app.use(userRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandlerLogged);
const  port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});