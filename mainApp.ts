import { Application, Request, Response } from "express";
import user from "./router/userRouter";
export const mainApp = (app: Application) => {
  try {
    app.use("/api", user);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "welcome to my subscribe channel",
        });
      } catch (error) {
        return res.status(404).json({
          message: "error",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
