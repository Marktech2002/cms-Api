import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import { notFoundMiddleware, errorHandler } from "./middleware/errroMiddleware";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import categoryRoute from "./routes/categoryRoute";
dotenv.config();
const app: Express = express();

// test db
connectDb();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/category", categoryRoute);
app.use(errorHandler);
app.use(notFoundMiddleware);

export default app;
