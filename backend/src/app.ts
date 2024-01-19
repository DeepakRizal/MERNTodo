import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/index";
import AppError from "./utils/appError";
import { Server } from "http";
import globalErrorHandler from "./controllers/globalErrorController";
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

const app: Express = express();

app.use(express.json());

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use("/api/v1/todos", todoRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

let server: Server;

const uri: string = `${process.env.MONGO_DB_URI}`;
mongoose.connect(uri).then(() => {
  server = app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
