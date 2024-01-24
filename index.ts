import express, { Application } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

app.use(express.json());
app.use(cors());

mainApp(app);
const server = app.listen(1290, () => {
  console.clear();
  console.log("server is up and running");
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);
});
process.on("unhandleRejection", (reason: Error) => {
  console.log("unhandleRejection", reason);

  server.close(() => {
    process.exit(1);
  });
});
