/**
 * Created by cristian.jora on 04.11.2016.
 */
const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const path = require("path");
const app = express();

app.use(serveStatic(path.join(__dirname, "dist")));
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);
const port = process.env.PORT || 80;
app.listen(port);
