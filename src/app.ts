import express, { Express, Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import { connectDb } from "./config/db";
import { notFoundMiddleware, errorHandler } from "./middleware/errroMiddleware";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import authRoute from "./routes/authRoute";
import './util/auth';
import categoryRoute from "./routes/categoryRoute";
dotenv.config();
const app: Express = express();

// test db
connectDb();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, httpOnly: true },
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/category", categoryRoute);
app.use(errorHandler);
app.use(notFoundMiddleware); 

export default app;
