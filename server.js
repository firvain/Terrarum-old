/**
 * Created by cristian.jora on 04.11.2016.
 */
import express from "express";
import serveStatic from "serve-static";
import { join } from "path";
const app = express();
app.use(serveStatic(join(__dirname, "dist")));
const port = process.env.PORT || 80;
app.listen(port);
