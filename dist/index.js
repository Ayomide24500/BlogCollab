"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = require("./utils/dbConfig");
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
(0, mainApp_1.mainApp)(app);
const server = app.listen(1290, () => {
    console.clear();
    console.log("server is up and running");
    (0, dbConfig_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error);
});
process.on("unhandleRejection", (reason) => {
    console.log("unhandleRejection", reason);
    server.close(() => {
        process.exit(1);
    });
});
