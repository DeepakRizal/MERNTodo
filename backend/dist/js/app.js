"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const appError_1 = __importDefault(require("./utils/appError"));
const globalErrorController_1 = __importDefault(require("./controllers/globalErrorController"));
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use("/api/v1/todos", index_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorController_1.default);
let server;
const uri = `${process.env.MONGO_DB_URI}`;
mongoose_1.default.connect(uri).then(() => {
    server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
process.on("unhandledRejection", (err) => {
    console.error(err.name, err.message);
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
