const express = require("express");
const { info, logToFile, warn } = require("ps-logger");
const userRouter = require("./routes/users");
const app = express();

logToFile(true, "express");

// setting view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setting middleware application wide
// app.use(logger);

// setting middleware for users route
app.use("/users", userRouter);

// setting middleware on a specific route
app.get("/", logger, (req, res) => {
  info("home route");
  //   used for sending file for downloading
  //   res.download("server.js");
  //   res.status(200).json({ message: "welcome to express server" });
  res.render("index", { serverType: "Express" });
});

function logger(req, res, next) {
  warn(req.originalUrl);
  next();
}

app.listen(3001, () => {
  info("SERVER IS LISTENING AT PORT NUMBER 3001");
});
