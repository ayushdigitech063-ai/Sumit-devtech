import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import routes from "./routes";
import { errorHandler, notFound } from "./middelwares/error-handler";

const app = express();
app.disable("x-powered-by");
if (env.NODE_ENV === "production") app.set("trust proxy", 1); // needed behind Render/Railway etc.

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;